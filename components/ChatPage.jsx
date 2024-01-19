"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatOutput from "@/components/ChatOutput";

const ChatPage = ({ image, name }) => {
  const [messages, setMessages] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const storedMessages = localStorage.getItem("chatMessages");
        return storedMessages ? JSON.parse(storedMessages) : [];
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    return [];
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [messages]);

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        "https://chatbox-mojowlekaz-cm76.onrender.com/chat",
        {
          message,
        }
      );

      const data = response.data;
      console.log(data); // Log the server response for debugging
      setMessages([
        ...messages,
        { text: message, type: "user" },
        { text: data.message, type: "bot" },
      ]);
      // Clear the input field
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("chatMessages");
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center ">
      {name ? (
        <h1 className="text-white font-[13px]">
          Welcome{" "}
          <span
            style={{ color: "green" }}
            className="uppercase font-bold text-[20px]"
          >
            {name}
          </span>{" "}
          to the Statistics Chatbot!
        </h1>
      ) : (
        <h1 className="text-white font-[13px]">
          Welcome to the Statistics Chatbot!
        </h1>
      )}

      <div
        style={{ background: "#f8f9fb" }}
        className="w-[400px] h-[550px] rounded-[20px] justify-between flex flex-col p-5 "
      >
        <img
          src={image}
          alt={name}
          className="rounded-full w-[50px] h-[50px]"
        />
        <div style={{ overflowY: "auto" }}>
          <ChatOutput messages={messages} name={name} />
        </div>
        <br />
        <div className="flex gap-1">
          <input
            style={{
              border: "1px solid #28a5ff",
            }}
            className="w-[250px] h-[50px] focus:border-none focus:outline-none border-none bg-transparent rounded-[5px]"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your prompt"
          />
          <button
            className="w-full h-[50px]"
            style={{ background: "#28a5ff" }}
            type="submit"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
      <br />
      <button
        className="w-full h-[50px]"
        style={{ background: "#28a5ff" }}
        type="submit"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ChatPage;
