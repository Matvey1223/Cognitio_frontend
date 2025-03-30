'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardDescription, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Code2, Heart, MapPin, Pencil, X, Check} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import BottomBar from "@/components/ui/bottomBar";
import {getMe, UserData, updateProfile} from "@/services/student.service";
import {toast} from "sonner";

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
    const [profile, setProfile] = useState<UserData>();

    useEffect(() => {
        const fetchMeData = async () => {
            const response = await getMe();
            setProfile(response);
        };
        fetchMeData();
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Логика аутентификации будет реализована позже
    };

    // Функция для добавления нового поля
    const addStackField = () => {
        setProfile({
            ...profile, technologies: [...profile?.technologies, ''], // Добавляем новое пустое поле
        });
    };

    // Функция для обновления конкретного поля в массиве stack
    const handleStackChange = (index: number, value: string) => {
        const updatedStack = profile?.technologies.map((item, i) => i === index ? value : item).filter(value => value);
        if (updatedStack.length < 1) {
            setProfile({
                ...profile, technologies: ['Твой стек технологий пока пуст'],
            });
        } else {
            setProfile({
                ...profile, technologies: updatedStack,
            });
        }
    };

    const handleProfileUpdate = (updatedProfile: Partial<UserData>) => {
        setProfile({...profile, ...updatedProfile});
        setIsEditing(false);
    };

    const submitChanges = async () => {
        const response = await updateProfile(profile?.position, profile?.technologies, profile?.github,
            profile?.description);
        toast.success('Данные успешно обновлены')
    }


    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <Code2 className="h-8 w-8 text-[#6A4DFF]"/>
                    <Link href="/browse">
                        <span className="ml-2 text-2xl font-bold gradient-text">Cognit.io</span>
                    </Link>
                </div>
            </div>

            <Card className="profile-card p-8 mb-8">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={profile?.photo} alt={profile?.full_name}/>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold">{profile?.full_name}</h1>
                            <div className="flex items-center text-gray-600 mt-1">
                                <MapPin className="h-4 w-4 mr-2 hidden sm:inline"/>
                                Текущий город: Казань
                            </div>
                            <div className="flex items-center text-gray-600 mt-1">
                                <MapPin className="h-4 w-4 mr-2 hidden sm:inline"/>
                                Родной город: {profile?.city}
                            </div>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex flex-col gap-2 ml-2">
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base sm:px-4 sm:py-2 md:text-lg md:px-5 md:py-3"
                                >
                                    <Pencil className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-600"/>
                                    <span className="hidden sm:inline text-gray-600">Редактировать</span>
                                </Button>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]" style={{backgroundColor: '#6A4DFF'}}>
                            <DialogHeader>
                                <DialogTitle style={{color: '#ffffff'}}>Редактировать профиль</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label style={{color: '#ffffff'}}>Родной город</Label>
                                    <Input
                                        className='bg-white text-black'
                                        value={profile?.city}
                                        onChange={(e) => handleProfileUpdate({hometown: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label style={{color: '#ffffff'}}>Позиция</Label>
                                    <Input
                                        className='bg-white text-black'
                                        value={profile?.position}
                                        onChange={(e) => handleProfileUpdate({position: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label style={{color: '#ffffff'}}>Стек технологий</Label>
                                    {profile?.technologies?.map((stackItem, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Input
                                                className='bg-white text-black'
                                                id={`stack-${index}`}
                                                type="text"
                                                placeholder="React, NextJS, Python, ..."
                                                value={stackItem}
                                                onChange={(e) => handleStackChange(index, e.target.value)}
                                                required
                                            />
                                            {index === profile?.technologies.length - 1 && (
                                                <Button type="button" onClick={addStackField}
                                                        className="ml-2 text-white">
                                                    +
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <Label style={{color: '#ffffff'}}>GitHub</Label>
                                    <Input
                                        className='bg-white text-black'
                                        value={profile?.github}
                                        onChange={(e) => handleProfileUpdate({github: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label style={{color: '#ffffff'}}>О себе</Label>
                                    <Textarea
                                        className='bg-white text-black'
                                        value={profile?.description}
                                        onChange={(e) => handleProfileUpdate({description: e.target.value})}
                                    />
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-3">Позиция</h2>
                        <p className="text-gray-600">{profile?.position} Разработчик</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-3">Стек технологий</h2>
                        <div className="flex flex-wrap gap-2">
                            {profile?.technologies.map((tech, index) => (
                                <Badge
                                    key={tech}
                                    variant="secondary"
                                    className="bg-brand-lavender/10 text-brand-indigo"
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-3">О себе</h2>
                        <p className="text-gray-600">{profile?.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">GitHub</h2>
                            <a href={`https://${profile?.github}`} target="_blank" rel="noopener noreferrer"
                               className="text-[#6A4DFF] hover:underline">
                                {profile?.github}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={submitChanges}
                        className="flex items-center gap-2 px-2 py-3 text-lg sm:text-base sm:px-4 sm:py-2 md:text-lg md:px-5 md:py-3"
                    >
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-600"/>
                        <span className="hidden sm:inline text-gray-600">Сохранить изменения</span>
                    </Button>
                </div>
            </Card>
            <BottomBar/>
        </div>
    </div>);
}