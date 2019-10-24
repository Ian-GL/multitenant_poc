defmodule MultitenantPoc.Tenants.CustomMigrations do
  alias MultitenantPoc.Repo

  def create_initial_tables(tenant_name) do
    [{module, _bin}] = define_tables_creation_module(tenant_name)
    migration_num = get_migration_num()

    Ecto.Migrator.run(Repo, [{migration_num, module}], :up, prefix: tenant_name, all: true)
    |> IO.inspect()
  end

  defp define_tables_creation_module(tenant) do
    module_name = String.capitalize(tenant)
    """
    defmodule MultitenantPoc.Tenants.#{module_name} do
      use Ecto.Migration

      def up() do
        create table(:products) do
          timestamps()
        end

        create table(:users) do
          add(:name, :string)
          add(:activation_code, :string)

          timestamps()
        end
      end

    end
    """
    # |> IO.inspect()
    |> Code.compile_string()
  end

  defp get_migration_num() do
    "Etc/UTC"
    |> DateTime.now()
    |> elem(1)
    |> DateTime.to_unix()
  end

end
