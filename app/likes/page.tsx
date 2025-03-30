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
import {Code2, Heart, MapPin, Pencil, X} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import BottomBar from "@/components/ui/bottomBar";
import {getMe, getReceivedLikes, UserData, LikesData} from "@/services/student.service";
import { likeAction, LikeData, unlikeAction } from "@/services/actions.service";
import {axiosWithAuth} from "@/intreceptors";


export default function ProfilePage() {

    const [likes, setLikes] = useState<LikesData[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Логика аутентификации будет реализована позже
    };
    useEffect(() => {
        const fetchMeData = async () => {
            const response = await getReceivedLikes();
            setLikes(response);
        };
        fetchMeData();
    }, []);


    const submitLike = async (receiver_id: number) => {
        const response = await likeAction(receiver_id)
    }

    const removeLike = async (id: number) => {
        setLikes(likes.filter(like => like.like_id !== id));
        await unlikeAction(id)
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
                        <Card key={like.like_id} className="profile-card p-6 mb-8">
                            <img
                                src={like.sender.photo}
                                alt={like.sender.full_name}
                                className="w-[150px] h-[150px] text-black object-cover rounded-full mb-4 md:mb-0 mx-auto md:mx-0"
                            />
                            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                                <div className="w-full flex flex-col justify-start">
                                    <div>
                                        <CardTitle className="text-gray-600 text-2xl mt-3">{like.sender.full_name}</CardTitle>
                                        <CardDescription className="text-lg text-gray-600">
                                            {like.sender.position}
                                        </CardDescription>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {like.sender.technologies.map((tech) => (
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
                                            href={`https://${like.sender.github}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#6A4DFF] hover:underline"
                                        >
                                            {like.sender.github}
                                        </a>
                                    </div>
                                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <p className="text-gray-600 md:col-span-2">{like.sender.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2 mt-3">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="text-red-500 hover:bg-red-50"
                                    onClick={() => submitLike(like.sender_id)}>
                                    <Heart className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="text-gray-500 hover:bg-gray-50"
                                    onClick={() => removeLike(like.like_id)}
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
    </div>)
}