import React, { useState } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import Chat from "./Chat";

const dummyChats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: "10:30 AM",
    unreadCount: 2,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Can we meet tomorrow?",
    timestamp: "Yesterday",
    unreadCount: 0,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Bob Johnson",
    lastMessage: "Thanks for your help!",
    timestamp: "Tuesday",
    unreadCount: 1,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  // Add more dummy chats as needed
];

const ChatListItem = ({ chat, isActive, onClick }) => (
  <div
    className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
      isActive ? "bg-gray-200" : ""
    }`}
    onClick={onClick}
  >
    <img
      src={chat.avatar}
      alt={chat.name}
      className="w-12 h-12 rounded-full mr-3"
    />
    <div className="flex-1">
      <div className="flex justify-between">
        <h3 className="font-semibold">{chat.name}</h3>
        <span className="text-xs text-gray-500">{chat.timestamp}</span>
      </div>
      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
    </div>
    {chat.unreadCount > 0 && (
      <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs">
        {chat.unreadCount}
      </span>
    )}
  </div>
);

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChatList, setShowChatList] = useState(true);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setShowChatList(false);
  };

  const handleBackToList = () => {
    setShowChatList(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat list */}
      <div
        className={`${
          showChatList ? "w-full md:w-1/3" : "hidden md:block md:w-1/3"
        } bg-white border-r`}
      >
        <div className="bg-[#075E54] text-white p-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold">WhatsApp</h1>
          <div className="flex space-x-3">
            <FaSearch size={20} />
            <FaEllipsisV size={20} />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-60px)]">
          {dummyChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={selectedChat && selectedChat.id === chat.id}
              onClick={() => handleChatSelect(chat)}
            />
          ))}
        </div>
      </div>

      {/* Chat */}
      <div
        className={`${
          !showChatList ? "w-full md:w-2/3" : "hidden md:block md:w-2/3"
        }`}
      >
        {selectedChat ? (
          <Chat
            currentUser="User1"
            selectedChat={selectedChat}
            onBackToList={handleBackToList}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-200">
            <p className="text-xl text-gray-500">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
