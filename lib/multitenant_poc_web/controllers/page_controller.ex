defmodule MultitenantPocWeb.PageController do
  use MultitenantPocWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
