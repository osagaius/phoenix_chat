defmodule PhoenixChat.PostsChangefeed do
  use RethinkDB.Changefeed

  require Logger
  alias RethinkDB.Record

  import RethinkDB.Lambda
  import RethinkDB.Query

  def start_link(opts, gen_server_opts \\ []) do
    RethinkDB.Changefeed.start_link(__MODULE__, opts, gen_server_opts)
  end

  def init(db) do
    query = table("posts") |> changes()
    {:subscribe, query, db, {db, nil}}
  end

  def handle_update(data, {db, posts}) do
    Logger.info(inspect data)

    Enum.each(data, fn
      %{"new_val" => nil, "old_val" => update} ->
        Logger.info("handle entire table deleted")
      %{"new_val" => new , "old_val" => nil} ->
        Logger.info("handle create")
      %{"new_val" => new, "old_val" => old_val} ->
        Logger.info("handle update")
      _ -> :ok
    end)

    result = table("posts")
    |> order_by(desc("received_at"))
    |> limit(20)
    |> order_by(asc("received_at"))
    |> PhoenixChat.Database.run

    sorted_posts = result.data

    publish_update(sorted_posts)

    #TODO Move to separate changefeed
    total_posts = table("posts")
    |> count
    |> PhoenixChat.Database.run
    |> Map.get(:data)

    publish_total_posts_changed(total_posts)

    {:next, {db, posts}}
  end

  defp publish_update(val) do
    PhoenixChat.Endpoint.broadcast_from! self(), "rooms:lobby", "new_posts", %{value: val}
  end

  defp publish_total_posts_changed(val) do
    PhoenixChat.Endpoint.broadcast_from! self(), "rooms:lobby", "total_posts_changed", %{value: val}
  end

  def handle_call(:get, _from, {db, nil}) do
    {:reply, nil, {db, nil}}
  end

  def handle_call(:get, _from, {db, posts}) do
    {:reply, Dict.values(posts), {db, posts}}
  end
end
