defmodule MultitenantPocWeb.Router do
  use MultitenantPocWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    # plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", MultitenantPocWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/add-fields", OwnerController , :index
    get "/owner-dashboard", OwnerController , :index

    post "/sign-up-owner", OwnerController, :sign_up_owner
    post "/add-fields", OwnerController, :add_fields
  end

  # Other scopes may use custom stacks.
  # scope "/api", MultitenantPocWeb do
  #   pipe_through :api
  # end
end
