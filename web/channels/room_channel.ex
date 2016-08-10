defmodule PhoenixChat.RoomChannel do
  use PhoenixChat.Web, :channel
  alias PhoenixChat.Presence
  import RethinkDB.Query

  def join("rooms:lobby", _, socket) do
    send self(), :after_join
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    Presence.track(socket, socket.assigns.user, %{
      online_at: :os.system_time(:milli_seconds)
    })
    push socket, "presence_state", Presence.list(socket)

    result = table("posts")
    |> order_by(desc("received_at"))
    |> limit(20)
    |> order_by(asc("received_at"))
    |> PhoenixChat.Database.run

    sorted_posts = result.data
    push socket, "new_posts", %{value: sorted_posts}

    total_posts = table("posts")
    |> count
    |> PhoenixChat.Database.run
    |> Map.get(:data)
    push socket, "total_posts_changed", %{value: total_posts}

    {:noreply, socket}
  end

  def handle_in("new:msg", msg, socket) do
    result = table("posts")
    |> insert(%{
      user: socket.assigns.user,
      text: msg["body"],
      received_at: :os.system_time(:milli_seconds)
      })
    |> PhoenixChat.Database.run

    {:noreply, socket}
  end
end
