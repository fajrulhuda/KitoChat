"use client";

interface JoinCardProps {
  username: string;
  setUsername: (value: string) => void;
  handleJoin: () => void;
}

export default function JoinCard({
  username,
  setUsername,
  handleJoin,
}: JoinCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

      <div className="mb-8 text-center">

        <h1 className="text-4xl font-bold text-blue-600">
          💬 KitoChat
        </h1>

        <p className="mt-2 text-gray-500">
          Real-time Chat Application
        </p>

      </div>

      <input
        type="text"
        placeholder="Enter your username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-5 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
      />

      <button
        onClick={handleJoin}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Join Chat
      </button>

    </div>
  );
}