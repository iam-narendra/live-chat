import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, addReply } from "../store/chatSlice";
import { sendMessage, onReceiveMessage } from "../services/socketService";
import Message from "./Message";
import {
  FaPaperPlane,
  FaEllipsisV,
  FaArrowLeft,
  FaSmile,
  FaPaperclip,
  FaMicrophone,
} from "react-icons/fa";

const Chat = ({ currentUser, selectedChat, onBackToList }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const messageListRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    onReceiveMessage((message) => {
      if (message.replyTo) {
        dispatch(addReply({ messageId: message.replyTo.id, reply: message }));
      } else {
        dispatch(addMessage(message));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const message = {
        id: Date.now(),
        text: inputMessage,
        sender: currentUser,
        timestamp: new Date().toISOString(),
        replyTo: replyTo,
      };
      if (replyTo) {
        dispatch(addReply({ messageId: replyTo.id, reply: message }));
      } else {
        dispatch(addMessage(message));
      }
      sendMessage(message);
      setInputMessage("");
      setReplyTo(null);
    }
  };

  const handleReply = (message) => {
    setReplyTo(message);
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#E5DDD5]">
      {/* Header */}
      <div className="bg-[#075E54] text-white p-2 flex items-center space-x-4">
        <button className="focus:outline-none md:hidden" onClick={onBackToList}>
          <FaArrowLeft size={20} />
        </button>
        <div className="flex-shrink-0">
          <img
            src={selectedChat.avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-lg font-semibold">{selectedChat.name}</h1>
          <p className="text-xs">{isTyping ? "typing..." : "online"}</p>
        </div>
        <button className="focus:outline-none">
          <FaEllipsisV size={20} />
        </button>
      </div>

      {/* Message List */}
      <div
        ref={messageListRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onReply={handleReply}
            currentUser={currentUser}
          />
        ))}
      </div>

      {/* Reply Preview */}
      {replyTo && (
        <div className="bg-[#FFF3C7] p-2 mx-2 rounded-t-lg border-l-4 border-[#128C7E]">
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold text-[#075E54]">{replyTo.sender}</p>
            <button
              onClick={() => setReplyTo(null)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              &times;
            </button>
          </div>
          <p className="text-sm truncate text-gray-600">{replyTo.text}</p>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-[#F0F0F0] p-2 flex items-center space-x-2">
        <button className="text-[#128C7E] focus:outline-none">
          <FaSmile size={24} />
        </button>
        <button className="text-[#128C7E] focus:outline-none">
          <FaPaperclip size={24} />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          className="flex-1 p-2 bg-white rounded-full focus:outline-none"
          placeholder="Type a message"
        />
        {inputMessage ? (
          <button
            onClick={handleSendMessage}
            className="bg-[#128C7E] text-white rounded-full p-2 focus:outline-none hover:bg-[#075E54]"
          >
            <FaPaperPlane size={20} />
          </button>
        ) : (
          <button className="text-[#128C7E] focus:outline-none">
            <FaMicrophone size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Chat;
