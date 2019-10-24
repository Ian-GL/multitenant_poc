defmodule MultitenantPoc.Schemas.Owner do
  use Ecto.Schema
  import Ecto.Changeset

  @allowed_params ~w(name)a

  schema "owners" do
    field(:name, :string)

    timestamps()
  end

  @doc false
  def changeset(pool, attrs) do
    pool
    |> cast(attrs, @allowed_params)
  end

end
