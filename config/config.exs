# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :multitenant_poc,
  ecto_repos: [MultitenantPoc.Repo]

# Configures the endpoint
config :multitenant_poc, MultitenantPocWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "5LZvesLEk7g9T+S/uot6QlaluduUt13K4Rjww8+hRBSJAfxMONBsk2mnxcf1P1AO",
  render_errors: [view: MultitenantPocWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: MultitenantPoc.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

config :triplex, repo: MultitenantPoc.Repo

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
