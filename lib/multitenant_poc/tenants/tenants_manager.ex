defmodule MultitenantPoc.Tenants.TenantsManager do
  alias MultitenantPoc.Repo
  alias MultitenantPoc.Schemas.Owner
  alias MultitenantPoc.Tenants.CustomMigrations

  @fields [
    {:seeds, :int},
    {:kind, :string},
    {:leaves, :int}
    # {:crop_date, :naive}
  ]

  def create_new_owner(name) when name in [nil, ""], do: {:error, "Please provide a name"}
  def create_new_owner(name) do
    with {:ok, tenant} <- create_tenant_schema(name),
         {:ok, owner} <- create_owner(name)
    do
      CustomMigrations.create_initial_tables(tenant)
      {:ok, owner}
    else
      _ -> {:error, "There was an error creating the tenant"}
    end
  end

  def create_tenant_schema(name) do
    Triplex.create(name)
  end

  def create_owner(name) do
    %Owner{}
    |> Owner.changeset(%{name: name})
    |> Repo.insert()
  end

  def create_single_table(tenant, table_name, fields \\ []) do
    IO.inspect(fields)

    CustomMigrations.change(tenant, table_name)
  end

  def test() do
    new_tenant_table("first_t", "third_table", @fields, 4)
  end

  def define_module(table_name, fields) do
    """
    defmodule MultitenantPoc.Tenants.M do
      use Ecto.Migration

      def up() do
        create table(:#{table_name}) do
          #{format_fields(fields)}
          timestamps()
        end
      end

    end
    """
    |> IO.inspect()
    |> Code.compile_string()
  end

  def format_fields(fields) do
    Enum.reduce(fields, "", &format_field_for_migration/2)
    # |> IO.inspect()
  end

  def format_field_for_migration({name, type}, acc) do
    acc <> "add(:#{name}, :#{type})\n"
  end

  def new_tenant_table(tenant_name, table_name, fields, migration_num) do
    [{module, _bin}] = define_module(table_name, fields)
    Ecto.Migrator.run(Repo, [{migration_num, module}], :up, prefix: tenant_name, all: true)
  end

end
