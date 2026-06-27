interface Props {
  total: number;
}

export default function ChatHeader({ total }: Props) {
  return (
    <div className="border-b bg-white px-8 py-5">
      <h1 className="text-2xl font-bold">
        Broadcast Room
      </h1>

      <p className="text-sm text-gray-500">
        {total} users online
      </p>
    </div>
  );
}