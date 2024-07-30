import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { FaReply, FaCheck, FaCheckDouble } from "react-icons/fa";

const Message = ({ message, onReply, currentUser }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSentByMe = message.sender === currentUser;

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => !isSentByMe && onReply(message),
    onSwipedRight: () => isSentByMe && onReply(message),
    trackMouse: true,
  });

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getMessageStatus = () => {
    // This is a placeholder. In a real app, you'd determine the actual status
    if (isSentByMe) {
      return Math.random() > 0.5 ? "read" : "delivered";
    }
    return null;
  };

  const messageStatus = getMessageStatus();

  return (
    <div
      {...swipeHandlers}
      className={`mb-4 ${
        isSentByMe ? "flex justify-end" : "flex justify-start"
      }`}
    >
      <div
        className={`relative max-w-xs md:max-w-md ${
          isSentByMe ? "order-2" : "order-1"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`rounded-lg p-3 ${
            isSentByMe ? "bg-[#DCF8C6]" : "bg-white"
          } shadow-md`}
        >
          {message.replyTo && (
            <div className="mb-2 p-2 bg-[#F0F0F0] rounded text-sm text-left border-l-4 border-[#128C7E]">
              <p className="font-bold text-[#128C7E]">
                {message.replyTo.sender}
              </p>
              <p className="truncate text-gray-600">{message.replyTo.text}</p>
            </div>
          )}
          <p
            className={`text-sm ${
              isSentByMe ? "text-right" : "text-left"
            } break-words`}
          >
            {message.text}
          </p>
          <div className="flex justify-end items-center mt-1 space-x-1">
            <p className="text-xs text-gray-500">
              {formatTime(message.timestamp)}
            </p>
            {isSentByMe && (
              <span className="text-xs text-gray-500">
                {messageStatus === "read" ? (
                  <FaCheckDouble className="text-blue-500" />
                ) : messageStatus === "delivered" ? (
                  <FaCheckDouble />
                ) : (
                  <FaCheck />
                )}
              </span>
            )}
          </div>
        </div>
        {isHovered && (
          <button
            onClick={() => onReply(message)}
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              isSentByMe
                ? "left-0 -translate-x-full"
                : "right-0 translate-x-full"
            } bg-gray-200 text-gray-600 rounded-full p-2 shadow-md transition-all duration-200 hover:bg-gray-300`}
          >
            <FaReply />
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;
