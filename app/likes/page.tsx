'use client';

import {useState} from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardDescription, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Code2, Heart, MapPin, Pencil, X} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import BottomBar from "@/components/ui/bottomBar";

interface Page {
    name: string;
    hometown: string;
    stack: string[];
    bio: string;
    position: string;
    github: string;
    avatar: string;
}

interface Like {
    id: number;
    name: string;
    hometown: string;
    position: string;
    stack: string[];
    bio: string;
    github: string;
    avatar: string;
}

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<Page>({
        name: 'Александр Иванов',
        hometown: 'Альметьевск',
        position: 'Frontend',
        stack: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL'],
        bio: 'Full-stack разработчик с 3-летним опытом. Люблю создавать красивые и функциональные веб-приложения. В свободное время изучаю новые технологии и участвую в open-source проектах.',
        github: 'github.com/alexandr-dev',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80',
    });

    const [likes, setLikes] = useState<Like[]>([{
        id: 1,
        name: 'Мария Петрова',
        hometown: 'Альметьевск',
        position: 'Fullstack',
        bio: 'Увлечена созданием масштабируемых веб-приложений и наставничеством молодых разработчиков.',
        stack: ['Vue.js', 'Python', 'Django'],
        github: 'github.com/alexandr-dev',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80',
    }, {
        id: 2,
        name: 'Елена Сидорова',
        hometown: 'Елабуга',
        position: 'Frontend',
        bio: 'Специализируется на создании красивых и отзывчивых пользовательских интерфейсов с использованием современных веб-технологий.',
        stack: ['Angular', 'Java', 'Spring Boot'],
        github: 'github.com/alexandr-dev',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&q=80',
    },]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Логика аутентификации будет реализована позже
    };

    // Функция для добавления нового поля
    const addStackField = () => {
        setProfile({
            ...profile, stack: [...profile.stack, ''], // Добавляем новое пустое поле
        });
    };

    // Функция для обновления конкретного поля в массиве stack
    const handleStackChange = (index: number, value: string) => {
        const updatedStack = profile.stack.map((item, i) => i === index ? value : item).filter(value => value);
        if (updatedStack.length < 1) {
            setProfile({
                ...profile, stack: ['Твой стек технологий пока пуст'],
            });
        } else {
            setProfile({
                ...profile, stack: updatedStack,
            });
        }
    };

    const handleProfileUpdate = (updatedProfile: Partial<Page>) => {
        setProfile({...profile, ...updatedProfile});
        setIsEditing(false);
    };

    const removeLike = (id: number) => {
        setLikes(likes.filter(like => like.id !== id));
    };

    return (<div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <Code2 className="h-8 w-8 text-[#6A4DFF]"/>
                    <Link href="/browse">
                        <span className="ml-2 text-2xl font-bold gradient-text">Cognit.io</span>
                    </Link>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-center">Лайки ({likes.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {likes.map((like) => (
                        <Card key={like.id} className="profile-card p-6 mb-8">
                            <img
                                src={like.avatar}
                                alt={like.name}
                                className="w-[150px] h-[150px] object-cover rounded-full mb-4 md:mb-0 mx-auto md:mx-0"
                            />
                            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                                <div className="w-full flex flex-col justify-start">
                                    <div>
                                        <CardTitle className="text-2xl mt-3">{like.name}</CardTitle>
                                        <CardDescription className="text-lg text-gray-600">
                                            {like.position}
                                        </CardDescription>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {like.stack.map((tech) => (
                                            <Badge
                                                key={tech}
                                                variant="secondary"
                                                className="bg-brand-lavender/10 text-brand-indigo"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <a
                                            href={`https://${like.github}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#6A4DFF] hover:underline"
                                        >
                                            {like.github}
                                        </a>
                                    </div>
                                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <p className="text-gray-600 md:col-span-2">{like.bio}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2 mt-3">
                                <Button size="icon" variant="outline" className="text-red-500 hover:bg-red-50">
                                    <Heart className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="text-gray-500 hover:bg-gray-50"
                                    onClick={() => removeLike(like.id)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
        <BottomBar />
    </div>);
}