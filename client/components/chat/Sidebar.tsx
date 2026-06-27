interface User {
  username: string;
  online: boolean;
}

interface Props {
  users: User[];
}

export default function Sidebar({ users }: Props) {

  const onlineCount = users.filter(
    (user) => user.online
  ).length;

  return (
    <aside className="w-72 bg-white border-r">

      <div className="bg-blue-600 p-5 text-white">

        <h1 className="text-2xl font-bold">
          💬 KitoChat
        </h1>

        <p className="text-blue-100">
          Online ({onlineCount})
        </p>

      </div>

      <div className="p-4 space-y-3">

        {users.map((user) => (

          <div
            key={user.username}
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-blue-50 transition"
          >

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-bold ${
                user.online
                  ? "bg-blue-600"
                  : "bg-gray-400"
              }`}
            >

              {user.username.charAt(0).toUpperCase()}

            </div>

            <div>

              <p className="font-semibold">

                {user.username}

              </p>

              <p
                className={`text-xs ${
                  user.online
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >

                {user.online
                  ? "Online"
                  : "Offline"}

              </p>

            </div>

          </div>

        ))}

      </div>

    </aside>
  );
}