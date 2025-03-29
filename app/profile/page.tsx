'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Heart, MapPin, Pencil, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Page {
    name: string;
    hometown: string;
    stack: string[];
    bio: string;
    github: string;
    experience: string;
    avatar: string;
}

interface Like {
    id: number;
    name: string;
    stack: string[];
    avatar: string;
}

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<Page>({
        name: 'Александр Иванов',
        hometown: 'Казань',
        stack: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL'],
        bio: 'Full-stack разработчик с 3-летним опытом. Люблю создавать красивые и функциональные веб-приложения. В свободное время изучаю новые технологии и участвую в open-source проектах.',
        github: 'github.com/alexandr-dev',
        experience: '3 года',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80',
    });

    const [likes, setLikes] = useState<Like[]>([
        {
            id: 1,
            name: 'Мария Петрова',
            stack: ['Vue.js', 'Python', 'Django'],
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80',
        },
        {
            id: 2,
            name: 'Елена Сидорова',
            stack: ['Angular', 'Java', 'Spring Boot'],
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&q=80',
        },
    ]);

    const handleProfileUpdate = (updatedProfile: Partial<Page>) => {
        setProfile({ ...profile, ...updatedProfile });
        setIsEditing(false);
    };

    const removeLike = (id: number) => {
        setLikes(likes.filter(like => like.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <Code2 className="h-8 w-8 text-[#6A4DFF]" />
                        <span className="ml-2 text-2xl font-bold gradient-text">Cognit.io</span>
                    </div>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="profile">Мой профиль</TabsTrigger>
                        <TabsTrigger value="likes">Лайки ({likes.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <Card className="profile-card p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={profile.avatar} alt={profile.name} />
                                        <AvatarFallback>{profile.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h1 className="text-2xl font-bold">{profile.name}</h1>
                                        <div className="flex items-center text-gray-600 mt-1">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            {profile.hometown}
                                        </div>
                                    </div>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="flex items-center">
                                            <Pencil className="h-4 w-4 mr-2" />
                                            Редактировать
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Редактировать профиль</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label>Имя</Label>
                                                <Input
                                                    value={profile.name}
                                                    onChange={(e) => handleProfileUpdate({ name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Город</Label>
                                                <Input
                                                    value={profile.hometown}
                                                    onChange={(e) => handleProfileUpdate({ hometown: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>О себе</Label>
                                                <Textarea
                                                    value={profile.bio}
                                                    onChange={(e) => handleProfileUpdate({ bio: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold mb-3">Стек технологий</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.stack.map((tech, index) => (
                                            <span key={index} className="tech-badge">
                        {tech}
                      </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold mb-3">О себе</h2>
                                    <p className="text-gray-600">{profile.bio}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h2 className="text-lg font-semibold mb-2">GitHub</h2>
                                        <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer"
                                           className="text-[#6A4DFF] hover:underline">
                                            {profile.github}
                                        </a>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold mb-2">Опыт работы</h2>
                                        <p className="text-gray-600">{profile.experience}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="likes">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {likes.map((like) => (
                                <Card key={like.id} className="profile-card p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center space-x-4">
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src={like.avatar} alt={like.name} />
                                                <AvatarFallback>{like.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-lg font-semibold">{like.name}</h3>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {like.stack.map((tech, index) => (
                                                        <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                              {tech}
                            </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
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
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}