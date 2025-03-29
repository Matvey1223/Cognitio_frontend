"use client";

import { useState } from "react";
import { MessageSquare, Code2, Send, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import BottomBar from "@/components/ui/bottomBar";

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
  const [showChatList, setShowChatList] = useState(true);

  const chats: Chat[] = [
    {
      id: "1",
      name: "Анна Петрова",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
      lastMessage: "Хочу сотрудничать над React-проектом!",
      time: "12:30",
      stack: ["React", "TypeScript", "Node.js"],
      unread: 2
    },
    {
      id: "2",
      name: "Иван Сидоров",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
      lastMessage: "Ищу фронтенд-разработчика",
      time: "09:45",
      stack: ["Vue.js", "Python", "AWS"],
      unread: 0
    },
    {
      id: "3",
      name: "Мария Иванова",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
      lastMessage: "Посмотрите моё портфолио",
      time: "Вчера",
      stack: ["Angular", "Java", "Spring"],
      unread: 1
    }
  ];

  const returnToChats = () => {
    setActiveChat(null);
    setShowChatList(true);
  };

  return (
    <div className="relative h-screen bg-gray-50 overflow-hidden">
      {/* Список чатов (мобильная версия) */}
      {showChatList && (
        <div className="md:hidden h-full bg-white flex flex-col">
          <header className="border-b sticky top-0 z-10 bg-white">
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Code2 className="h-8 w-8 text-[#6A4DFF]" />
                  <Link href="/browse">
                    <span className="ml-2 text-2xl font-bold gradient-text">Cognit.io</span>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <div className="overflow-y-auto flex-1 px-4 pb-20">
            {chats.map((chat) => (
              <Card
                key={chat.id}
                className="mb-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setActiveChat(chat.id);
                  setShowChatList(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={chat.avatar}
                      alt={chat.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {chat.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#DF4DFF] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {chat.stack.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#B1A2FF] bg-opacity-10 text-[#6A4DFF]"
                        >
                          {tech}
                        </span>
                      ))}
                      {chat.stack.length > 2 && (
                        <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#B1A2FF] bg-opacity-10 text-[#6A4DFF]">
                          +{chat.stack.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <BottomBar />
        </div>
      )}

      {/* Просмотр чата (мобильная версия) */}
      {activeChat && !showChatList && (
        <div className="md:hidden h-full flex flex-col">
          {/* Шапка чата */}
          <header className="border-b sticky top-0 z-10 bg-white p-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={returnToChats}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Image
                src={chats.find(c => c.id === activeChat)?.avatar || ""}
                alt="Профиль"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-900 truncate">
                  {chats.find(c => c.id === activeChat)?.name}
                </h2>
                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                  {chats
                    .find(c => c.id === activeChat)
                    ?.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#B1A2FF] bg-opacity-10 text-[#6A4DFF] whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </header>

          {/* Сообщения */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50 pb-20">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Image
                  src={chats.find(c => c.id === activeChat)?.avatar || ""}
                  alt="Профиль"
                  width={28}
                  height={28}
                  className="rounded-full self-start"
                />
                <Card className="bg-white p-2 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm text-gray-900">Привет! Видела твой профиль и впечатлилась твоим стеком технологий. Хочешь поработать вместе над проектом?</p>
                  <span className="text-[10px] text-gray-500 mt-1 block">12:30</span>
                </Card>
              </div>

              <div className="flex gap-2 flex-row-reverse">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop"
                  alt="Ваш профиль"
                  width={28}
                  height={28}
                  className="rounded-full self-start"
                />
                <Card className="bg-[#4D68FF] text-white p-2 rounded-lg rounded-tr-none max-w-[80%]">
                  <p className="text-sm">Спасибо! С удовольствием послушаю, что у тебя на уме. О каком проекте ты думаешь?</p>
                  <span className="text-[10px] text-white/80 mt-1 block">12:35</span>
                </Card>
              </div>
            </div>
          </div>

          {/* Поле ввода сообщения */}
          <div className="sticky bottom-20 bg-white border-t p-2">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Напишите сообщение..."
                className="flex-1 text-sm h-10"
              />
              <Button className="bg-[#4D68FF] hover:bg-[#6A4DFF] h-10 w-10 p-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <BottomBar />
        </div>
      )}

      {/* Десктопная версия (скрыта на мобильных) */}
      <div className="hidden md:flex h-full w-full">
        {/* ... (исходный код для десктопа) ... */}
      </div>
    </div>
  );
}
