import React from "react";

const ChatOutput = ({ messages, name }) => {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{ background: msg.type === "user" ? "#068B52" : "" }}
          className={`rounded-lg p-2 ${
            msg.type === "user"
              ? " text-white self-end"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <p className="text-sm font-medium mb-1">
            {msg.type === "user" ? name : "Bot"}:
          </p>
          <p className="text-sm font-medium">{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatOutput;
