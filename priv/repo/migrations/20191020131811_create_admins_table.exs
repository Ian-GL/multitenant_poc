defmodule MultitenantPoc.Repo.Migrations.CreateAdminsTable do
  use Ecto.Migration

  def change do
    create table(:products) do
      timestamps()
    end
  end
end
