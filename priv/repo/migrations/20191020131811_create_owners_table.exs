defmodule MultitenantPoc.Repo.Migrations.CreateOwnersTable do
  use Ecto.Migration

  def change do
    create table(:owners) do
      add(:name, :string)
      timestamps()
    end

    create(unique_index(:owners, [:name], name: :owner_name_unique_index))
  end
end
