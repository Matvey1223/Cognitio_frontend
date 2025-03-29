"use client";

import { useState } from "react";
import { MessageSquare, Code2, Send, Search, Filter } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  stack: string[];
  unread: number;
}

export default function Home() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const chats: Chat[] = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
      lastMessage: "I'd love to collaborate on a React project!",
      time: "12:30",
      stack: ["React", "TypeScript", "Node.js"],
      unread: 2
    },
    {
      id: "2",
      name: "Alex Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
      lastMessage: "Looking for a frontend developer",
      time: "09:45",
      stack: ["Vue.js", "Python", "AWS"],
      unread: 0
    },
    {
      id: "3",
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
      lastMessage: "Check out my portfolio",
      time: "Yesterday",
      stack: ["Angular", "Java", "Spring"],
      unread: 1
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        <div className="p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#4D68FF] to-[#A54DFF] bg-clip-text text-transparent flex items-center gap-2">
            <Code2 className="h-8 w-8" />
            DevMatch
          </h1>
          
          {/* Search */}
          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search chats..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <Button
            variant="outline"
            className="mt-4 w-full text-[#6A4DFF] border-[#6A4DFF] hover:bg-[#6A4DFF] hover:text-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter by Stack
          </Button>
        </div>

        {/* Chat List */}
        <div className="mt-4">
          {chats.map((chat) => (
            <Card
              key={chat.id}
              className={`m-2 p-4 cursor-pointer hover:bg-gray-50 transition-colors border-transparent hover:border-[#6A4DFF] ${
                activeChat === chat.id ? "bg-gray-50 border-[#6A4DFF]" : ""
              }`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={chat.avatar}
                    alt={chat.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  {chat.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#DF4DFF] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                    <span className="text-sm text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  <div className="flex gap-2 mt-2">
                    {chat.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-[#B1A2FF] bg-opacity-10 text-[#6A4DFF]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <Card className="rounded-none border-x-0 border-t-0">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={chats.find(c => c.id === activeChat)?.avatar || ""}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {chats.find(c => c.id === activeChat)?.name}
                    </h2>
                    <div className="flex gap-2">
                      {chats
                        .find(c => c.id === activeChat)
                        ?.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-[#B1A2FF] bg-opacity-10 text-[#6A4DFF]"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <Image
                    src={chats.find(c => c.id === activeChat)?.avatar || ""}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <Card className="bg-white p-3 rounded-lg rounded-tl-none max-w-[70%]">
                    <p className="text-gray-900">Hey! I saw your profile and I'm really impressed with your tech stack. Would you be interested in collaborating on a project?</p>
                    <span className="text-xs text-gray-500 mt-1 block">12:30</span>
                  </Card>
                </div>

                <div className="flex gap-3 flex-row-reverse">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop"
                    alt="Your profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <Card className="bg-[#4D68FF] text-white p-3 rounded-lg rounded-tr-none max-w-[70%]">
                    <p>Thanks! I'd love to hear more about what you have in mind. What kind of project are you thinking about?</p>
                    <span className="text-xs text-white/80 mt-1 block">12:35</span>
                  </Card>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <Card className="rounded-none border-x-0 border-b-0">
              <div className="p-4 flex gap-3">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button className="bg-[#4D68FF] hover:bg-[#6A4DFF]">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </Card>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <Card className="p-8 text-center">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Select a chat to start messaging</h2>
              <p className="mt-2 text-gray-500">Connect with fellow developers and build something amazing together!</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}