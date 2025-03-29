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
  messages: {
    text: string;
    time: string;
    isMe: boolean;
  }[];
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
      unread: 2,
      messages: [
        {
          text: "Привет! Видела твой профиль и впечатлилась твоим стеком технологий. Хочешь поработать вместе над проектом?",
          time: "12:30",
          isMe: false
        },
        {
          text: "Спасибо! С удовольствием послушаю, что у тебя на уме. О каком проекте ты думаешь?",
          time: "12:35",
          isMe: true
        }
      ]
    },
    {
      id: "2",
      name: "Иван Сидоров",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
      lastMessage: "Ищу фронтенд-разработчика",
      time: "09:45",
      stack: ["Vue.js", "Python", "AWS"],
      unread: 0,
      messages: [
        {
          text: "Здравствуйте! Ищу фронтенд-разработчика для совместного проекта.",
          time: "09:45",
          isMe: false
        },
        {
          text: "Здравствуйте! Расскажите подробнее о проекте.",
          time: "10:00",
          isMe: true
        }
      ]
    },
    {
      id: "3",
      name: "Мария Иванова",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
      lastMessage: "Посмотрите моё портфолио",
      time: "Вчера",
      stack: ["Angular", "Java", "Spring"],
      unread: 1,
      messages: [
        {
          text: "Добрый день! Посмотрите моё портфолио, возможно вам будет интересно сотрудничество.",
          time: "Вчера",
          isMe: false
        },
        {
          text: "Спасибо, посмотрел. Ваши работы впечатляют! Давайте обсудим детали.",
          time: "Сегодня",
          isMe: true
        }
      ]
    }
  ];

  const returnToChats = () => {
    setActiveChat(null);
    setShowChatList(true);
  };

  return (
    <div className="relative h-screen bg-gray-50 overflow-hidden">
      {/* Мобильная версия */}
      <div className="md:hidden h-full flex flex-col">
        {showChatList ? (
          <>
            <header className="border-b sticky top-0 z-10 bg-white">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Code2 className="h-8 w-8 text-[#6A4DFF]" />
                    <Link href="/browse">
                      <span className="ml-2 text-2xl font-bold gradient-text">Cognit.io</span>
                    </Link>
                  </div>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
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
          </>
        ) : (
          <div className="flex-1 flex flex-col">
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

            <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
              <div className="flex flex-col gap-3">
                {chats.find(c => c.id === activeChat)?.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 ${message.isMe ? 'flex-row-reverse' : ''}`}
                  >
                    {!message.isMe ? (
                      <Image
                        src={chats.find(c => c.id === activeChat)?.avatar || ""}
                        alt="Профиль"
                        width={28}
                        height={28}
                        className="rounded-full self-start"
                      />
                    ) : (
                      <Image
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop"
                        alt="Ваш профиль"
                        width={28}
                        height={28}
                        className="rounded-full self-start"
                      />
                    )}
                    <Card className={`p-2 rounded-lg max-w-[80%] ${message.isMe
                        ? 'bg-[#4D68FF] text-white rounded-tr-none'
                        : 'bg-white rounded-tl-none'
                      }`}>
                      <p className="text-sm">{message.text}</p>
                      <span className={`text-[10px] mt-1 block ${message.isMe ? 'text-white/80' : 'text-gray-500'
                        }`}>
                        {message.time}
                      </span>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t p-2">
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
          </div>
        )}
        <BottomBar />
      </div>

      {/* Десктопная версия */}
      <div className="hidden md:flex h-full w-full">
        {/* Боковая панель с чатами (1/3 ширины) */}
        <div className="w-1/3 border-r bg-white flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Code2 className="h-8 w-8 text-[#6A4DFF]" />
                <Link href="/browse">
                  <span className="ml-2 text-2xl font-bold gradient-text">Cognit.io</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {chats.map((chat) => (
              <Card
                key={chat.id}
                className={`mb-2 p-3 cursor-pointer hover:bg-gray-50 transition-colors ${activeChat === chat.id ? "bg-gray-50 border-[#6A4DFF]" : ""
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
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {chat.stack.slice(0, 3).map((tech) => (
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

        {/* Область чата (2/3 ширины) */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Image
                    src={chats.find(c => c.id === activeChat)?.avatar || ""}
                    alt="Профиль"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-900">
                      {chats.find(c => c.id === activeChat)?.name}
                    </h2>
                    <div className="flex gap-2 mt-1">
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

              <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                <div className="max-w-3xl mx-auto space-y-4">
                  {chats.find(c => c.id === activeChat)?.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${message.isMe ? 'flex-row-reverse' : ''}`}
                    >
                      {!message.isMe ? (
                        <Image
                          src={chats.find(c => c.id === activeChat)?.avatar || ""}
                          alt="Профиль"
                          width={40}
                          height={40}
                          className="rounded-full self-start"
                        />
                      ) : (
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop"
                          alt="Ваш профиль"
                          width={40}
                          height={40}
                          className="rounded-full self-start"
                        />
                      )}
                      <Card className={`p-3 rounded-lg max-w-[80%] ${message.isMe
                          ? 'bg-[#4D68FF] text-white rounded-tr-none'
                          : 'bg-white rounded-tl-none'
                        }`}>
                        <p>{message.text}</p>
                        <span className={`text-xs mt-1 block ${message.isMe ? 'text-white/80' : 'text-gray-500'
                          }`}>
                          {message.time}
                        </span>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t">
                <div className="max-w-3xl mx-auto flex gap-3">
                  <Input
                    type="text"
                    placeholder="Напишите сообщение..."
                    className="flex-1"
                  />
                  <Button className="bg-[#4D68FF] hover:bg-[#6A4DFF]">
                    <Send className="h-4 w-4 mr-2" />
                    Отправить
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
              <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900">Выберите чат</h2>
              <p className="text-gray-500 mt-2">Начните общение с разработчиками</p>
            </div>
          )}
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
