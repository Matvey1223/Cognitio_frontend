'use client';

import {useState, useCallback, useEffect} from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Heart, X, Code2, UserIcon
} from 'lucide-react';
import {
    Carousel, CarouselContent, CarouselItem, CarouselApi,
} from '@/components/ui/carousel';
import BottomBar from '@/components/ui/bottomBar';
import {likeAction} from "@/services/actions.service";
import {createChat} from "@/services/chat.service";
import {axiosWithAuth} from "@/intreceptors";


export interface UserData {
    student_id: number
    age: number
    city_id: number
    position: string | undefined
    email: string
    photo: string | undefined
    full_name: string
    description: string | undefined
    github: string | undefined
    technologies: any[]
    is_first_time: boolean
}

export default function BrowsePage() {
    const [likedProfiles, setLikedProfiles] = useState<number[]>([]);
    const [api, setApi] = useState<CarouselApi>();
    const [students, setStudents] = useState<UserData[]>([])// Состояние для API карусели

    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await axiosWithAuth.get<UserData[]>("http://localhost:8000/api/v1/students/all")
            setStudents(response.data)
        }
        fetchAllUsers()
    }, []);

    const handleLike = useCallback(async (id: number) => {
        const response = await likeAction(id)
        setLikedProfiles((prev) => [...prev, id]); // Добавляем профиль в список лайкнутых
        if (api) {
            api.scrollNext(); // Переключаем на следующую карточку
        }
    }, [api]);

    // Обработчик для кнопки "дизлайк"
    const handleDislike = useCallback(() => {
        if (api) {
            api.scrollNext(); // Переключаем на следующую карточку
        }
    }, [api]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            <header className="border-b bg-white w-full">
                <nav className="rounded max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/browse" className="flex items-center">
                        <Code2 className="h-8 w-8 text-[#6A4DFF]" />
                        <span className="ml-2 text-2xl font-bold gradient-text">Cognit.io</span>
                    </Link>
                </nav>
            </header>
            <main className="max-w-md w-full mt-6 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-2">Найди разработчика</h1>
                <p className="text-gray-600 text-center mb-4">Выбери подходящего сокомандника по стэку технологий</p>
                <Carousel className="rounded w-full" setApi={setApi}>
                    <CarouselContent>
                        {students.map((dev) => (
                            <CarouselItem key={dev.student_id}>
                                <Card className="w-full border-0">
                                    <CardContent className="p-4 flex flex-col items-center text-center">
                                        <img
                                            src={dev.photo}
                                            alt={dev.full_name}
                                            className="w-32 h-32 object-cover rounded-full mb-4"
                                        />
                                        <CardTitle className="text-lg">{dev.full_name}</CardTitle>
                                        <CardDescription className="text-gray-600">{dev.position}</CardDescription>
                                        <div className="flex flex-wrap gap-2 mt-2 justify-center">
                                            {dev.technologies.map((tech) => (
                                                <Badge key={tech} variant="secondary" className="bg-brand-lavender/10 text-brand-indigo">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                        <a href={`https://${dev.github}`} target="_blank" rel="noopener noreferrer" className="mt-2 text-[#6A4DFF] hover:underline">
                                            {dev.github}
                                        </a>
                                        <p className="text-gray-600 mt-2">{dev.description}</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between gap-4 p-4">
                                        {/* Дизлайк */}
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                className="rounded-full w-20 h-20 p-0"
                                                onClick={handleDislike} // Добавляем обработчик
                                            >
                                                <X className="h-6 w-6 text-gray-500" />
                                            </Button>
                                        </motion.div>

                                        {/* Лайк */}
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Button
                                                size="lg"
                                                className="rounded-full w-20 h-20 p-0 bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90"
                                                onClick={() => handleLike(dev.student_id)} // Обновляем обработчик
                                            >
                                                <Heart className="h-6 w-6 text-white" />
                                            </Button>
                                        </motion.div>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </main>
            <footer className="w-full py-6 text-center text-gray-400 text-xs mt-10">
                Как это работает? <br/>Просто свайпай профили и находи интересных разработчиков!<br/>
                <BottomBar/>
            </footer>
        </div>
    );
}