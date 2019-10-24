defmodule MultitenantPocWeb.OwnerController do
  use MultitenantPocWeb, :controller

  alias MultitenantPoc.Tenants.TenantsManager

  def index(conn, _params) do
    render conn, "index.html"
  end

  def sign_up_owner(conn, params) do
    case TenantsManager.create_new_owner(params["name"]) do
      {:ok, owner} ->
        conn
        |> put_resp_cookie("owner", owner.name)
        |> json(%{owner: owner})

      {:error, error} ->
        conn
        |> put_status(400)
        # |> put_resp_cookie("owner", nil)
        |> json(%{error: error})
    end
  end

  def add_fields(conn, params) do
    IO.inspect(params, label: "ADD FIELDS PARAMS")

    json(conn, %{success: true})
  end
end
