"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MessageSquare, Code2, Send, ChevronLeft, Home, Search, Bell, User } from 'lucide-react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import {axiosWithAuth} from "@/intreceptors";

interface Student {
    student_id: number;
    full_name: string;
    email: string;
    technologies: string[];
    avatar?: string;
}

interface Message {
    message_id: number;
    chat_id: number;
    sender_id: number | null;
    content: string;
    sent_at: string;
    is_read: boolean;
    sender?: Student;
}

interface Chat {
    chat_id: number;
    created_at: string;
    is_group_chat: boolean;
    chat_name: string | null;
    last_message_id: number | null;
    participants: Student[];
    last_message?: Message;
    messages?: Message[];
}

function App() {
    const [activeChat, setActiveChat] = useState<number | null>(null);
    const [showChatList, setShowChatList] = useState(true);
    const [messageInput, setMessageInput] = useState('');
    const [chats, setChats] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<Student | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    // WebSocket connection management
    useEffect(() => {
        if (activeChat) {
            const ws = new WebSocket(`ws://localhost:8000/api/v1/chat/${activeChat}/ws`);
            setSocket(ws);
            ws.onopen = () => {
                console.log('WebSocket Connected');
            };

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === 'new_message') {
                    setChats(prevChats =>
                        prevChats.map(chat =>
                            chat.chat_id === activeChat
                                ? {
                                    ...chat,
                                    messages: [...(chat.messages || []), message.content],
                                    last_message: message.data
                                }
                                : chat
                        )
                    );
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            setSocket(ws);

            return () => {
                ws.close();
                setSocket(null);
            };
        }
    }, [activeChat]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axiosWithAuth.get('http://localhost:8000/api/v1/chat/chats');
                setChats(response.data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChats();
    }, []);

    const handleSendMessage = async () => {
        if (!messageInput.trim() || !activeChat) return;

        socket?.send(JSON.stringify({type: "new_message", content: messageInput}))

    };

    // Memoize functions that don't need to be recreated on every render
    const getChatName = useCallback((chat: Chat): string => {
        if (chat.chat_name) return chat.chat_name;
        if (chat.is_group_chat) return "Групповой чат";

        const otherParticipant = chat.participants.find(
            p => p.student_id !== currentUser?.student_id
        );
        return otherParticipant?.full_name || "Чат";
    }, [currentUser?.student_id]);

    const getChatAvatar = useCallback((chat: Chat): string => {
        if (chat.is_group_chat) {
            return "https://png.klev.club/uploads/posts/2024-04/png-klev-club-tkew-p-avatar-png-27.png";
        }

        const otherParticipant = chat.participants.find(
            p => p.student_id !== currentUser?.student_id
        );
        return otherParticipant?.avatar || "https://png.klev.club/uploads/posts/2024-04/png-klev-club-tkew-p-avatar-png-27.png";
    }, [currentUser?.student_id]);

    const BottomNavigation = () => (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
            <div className="flex justify-around items-center h-16">
                <button className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-50">
                    <Home className="h-6 w-6 text-purple-600" />
                    <span className="text-xs mt-1 text-gray-600">Главная</span>
                </button>
                <button className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-50">
                    <Search className="h-6 w-6 text-gray-600" />
                    <span className="text-xs mt-1 text-gray-600">Поиск</span>
                </button>
                <button className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-50">
                    <MessageSquare className="h-6 w-6 text-gray-600" />
                    <span className="text-xs mt-1 text-gray-600">Чаты</span>
                </button>
                <button className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-50">
                    <Bell className="h-6 w-6 text-gray-600" />
                    <span className="text-xs mt-1 text-gray-600">Уведомления</span>
                </button>
                <button className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-50">
                    <User className="h-6 w-6 text-gray-600" />
                    <span className="text-xs mt-1 text-gray-600">Профиль</span>
                </button>
            </div>
        </div>
    );

    // Memoize ChatHeader component to prevent unnecessary re-renders
    const ChatHeader = React.memo(({ chat, onBack }: { chat?: Chat; onBack?: () => void }) => (
        <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center gap-3">
            {onBack && (
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
                    <ChevronLeft className="h-6 w-6" />
                </button>
            )}
            <div className="flex items-center gap-3 flex-1">
                {chat ? (
                    <>
                        <img src={getChatAvatar(chat)} alt={getChatName(chat)} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <h2 className="font-semibold text-gray-500">{getChatName(chat)}</h2>
                            <div className="flex gap-2 flex-wrap">
                                {chat.participants
                                    .filter(p => p.student_id !== currentUser?.student_id)
                                    .flatMap(p => p.technologies)
                                    .slice(0, 3)
                                    .map((tech, index) => (
                                        <span key={index} className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">
                      {tech}
                    </span>
                                    ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center">
                        <Code2 className="h-8 w-8 text-purple-600" />
                        <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Cognit.io
            </span>
                    </div>
                )}
            </div>
        </div>
    ));

    // Memoize ChatList component
    const ChatList = React.memo(({ chats, onSelectChat }: { chats: Chat[]; onSelectChat: (id: number) => void }) => (
        <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
            {chats.map((chat) => (
                <div
                    key={chat.chat_id}
                    onClick={() => onSelectChat(chat.chat_id)}
                    className="p-4 hover:bg-gray-50 cursor-pointer border-b flex items-start gap-3"
                >
                    <div className="relative">
                        <img src={getChatAvatar(chat)} alt={getChatName(chat)} className="w-12 h-12 rounded-full" />
                        {chat.last_message && !chat.last_message.is_read &&
                            chat.last_message.sender_id !== currentUser?.student_id && (
                                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                1
              </span>
                            )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-medium truncate text-gray-500">{getChatName(chat)}</h3>
                            {chat.last_message && (
                                <span className="text-xs text-gray-500 ml-2">
                  {formatDistanceToNow(new Date(chat.last_message.sent_at), {
                      addSuffix: true,
                      locale: ru
                  })}
                </span>
                            )}
                        </div>
                        {chat.last_message && (
                            <p className="text-sm text-gray-600 truncate">
                                {chat.last_message.sender_id === currentUser?.student_id ? 'Вы: ' : ''}
                                {chat.last_message.content}
                            </p>
                        )}
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {chat.participants
                                .filter(p => p.student_id !== currentUser?.student_id)
                                .flatMap(p => p.technologies)
                                .slice(0, 3)
                                .map((tech, index) => (
                                    <span key={index} className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">
                    {tech}
                  </span>
                                ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ));

    // Memoize ChatMessages component
    const ChatMessages = React.memo(({ chat }: { chat: Chat }) => {
        if (!chat.messages || chat.messages.length === 0) {
            return (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">Нет сообщений</p>
                </div>
            );
        }

        return (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-16 md:pb-0">
                {chat.messages.map((message) => {
                    const isMe = message.sender_id === currentUser?.student_id;
                    const sender = isMe
                        ? currentUser
                        : chat.participants.find(p => p.student_id === message.sender_id);

                    return (
                        <div key={message.message_id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                            <img
                                src={sender?.avatar || "https://png.klev.club/uploads/posts/2024-04/png-klev-club-tkew-p-avatar-png-27.png"}
                                alt={sender?.full_name || "User"}
                                className="w-8 h-8 rounded-full"
                            />
                            <div
                                className={`p-3 rounded-lg max-w-[70%] ${
                                    isMe
                                        ? 'bg-purple-600 text-white rounded-tr-none'
                                        : 'bg-gray-100 rounded-tl-none'
                                }`}
                            >
                                <p className="text-sm text-gray-500">{message.content}</p>
                                <span className={`text-xs mt-1 block ${isMe ? 'text-purple-200' : 'text-gray-500'}`}>
                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    });

    // Memoize MessageInput component
    const MessageInput = React.memo(() => (
        <div className="border-t bg-white p-4 pb-20 md:pb-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Напишите сообщение..."
                    className="flex-1 px-4 py-2 border bg-white text-gray-500 rounded-full focus:outline-none focus:border-purple-500"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50"
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </div>
    ));

    const EmptyState = () => (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 pb-16 md:pb-0">
            <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Выберите чат</h2>
            <p className="text-gray-500 mt-2">Начните общение с разработчиками</p>
        </div>
    );

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    const selectedChat = chats.find(chat => chat.chat_id === activeChat);

    return (
        <div className="h-screen flex bg-white">
            {/* Sidebar - Always visible on desktop, conditionally on mobile */}
            <div className={`
        ${showChatList ? 'flex' : 'hidden'}
        md:flex flex-col w-full md:w-[380px] border-r
      `}>
                <ChatHeader />
                <ChatList
                    chats={chats}
                    onSelectChat={(id: number) => {
                        setActiveChat(id);
                        setShowChatList(false);

                        // Load messages for selected chat
                        axiosWithAuth.get(`http://localhost:8000/api/v1/chat/${id}/messages`)
                            .then(response => {
                                setChats(prevChats =>
                                    prevChats.map(chat =>
                                        chat.chat_id === id
                                            ? { ...chat, messages: response.data }
                                            : chat
                                    )
                                );
                            })
                            .catch(error => {
                                console.error('Error loading messages:', error);
                            });
                    }}
                />
            </div>

            {/* Main chat area */}
            <div className={`
        ${!showChatList ? 'flex' : 'hidden'}
        md:flex flex-col flex-1
      `}>
                {selectedChat ? (
                    <>
                        <ChatHeader
                            chat={selectedChat}
                            onBack={() => {
                                setShowChatList(true);
                                setActiveChat(null);
                            }}
                        />
                        <ChatMessages chat={selectedChat} />
                        <MessageInput />
                    </>
                ) : (
                    <EmptyState />
                )}
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation />
        </div>
    );
}

export default App;