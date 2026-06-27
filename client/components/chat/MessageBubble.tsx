import { Message } from "@/types/message";

interface Props {
  message: Message;
  isOwn: boolean;
}

export default function MessageBubble({

  message,

  isOwn,

}: Props) {

  return (

    <div
      className={`mb-4 flex ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >

      <div
        className={`max-w-md rounded-2xl px-5 py-3 shadow

        ${
          isOwn
            ? "bg-blue-600 text-white"
            : "bg-white"
        }`}
      >

        {!isOwn && (

          <div className="mb-1 font-bold text-blue-600">

            {message.username}

          </div>

        )}

        <div className="break-words">

          {message.text}

        </div>

        <div
          className={`mt-2 text-right text-xs

          ${
            isOwn
              ? "text-blue-100"
              : "text-gray-400"
          }`}
        >

          {message.time}

        </div>

      </div>

    </div>

  );

}