"use client";
import React, { useState } from "react";

const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="text-black"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
