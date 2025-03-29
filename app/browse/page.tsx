'use client';

import {useState} from 'react';
import Link from 'next/link';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {
    Heart, X, Code2, ExternalLink, MessageCircle, ChevronLeft, ChevronRight, UserIcon,
} from 'lucide-react';
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from '@/components/ui/carousel';


// Mock data for demonstration
const developers = [{
    id: 1,
    name: 'Мария Гончаренко',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    position: 'Fullstack Разработчик',
    github: 'github.com/alexandr-dev',
    description: 'Увлекаюсь созданием масштабируемых веб-приложений и наставничеством молодых разработчиков.',
    techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
}, {
    id: 2,
    name: 'Алексей Родригез',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    position: 'Frontend разработчик',
    github: 'github.com/alexandr-dev',
    description: 'Специализируюсь на создании красивых и отзывчивых пользовательских интерфейсов с использованием современных веб-технологий.',
    techStack: ['React', 'Vue.js', 'TailwindCSS', 'JavaScript'],
}, {
    id: 3,
    name: 'Эмилия Богданова',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
    position: 'Backend разработчик',
    github: 'github.com/alexandr-dev',
    description: 'Сосредоточена на создании надежных и безопасных серверных систем и стремлюсь к чистоте кода.',
    techStack: ['Python', 'Django', 'Docker', 'MongoDB'],
},];

export default function BrowsePage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedProfiles, setLikedProfiles] = useState<number[]>([]);

    const handleLike = (id: number) => {
        setLikedProfiles([...likedProfiles, id]);
        // In a real app, this would make an API call
    };

    return (<div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white">
            <nav className="rounded max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Code2 className="h-8 w-8 text-[#6A4DFF]"/>
                    <span className="ml-2 text-2xl font-bold gradient-text">Cognit.io</span>
                </Link>
                <div className=" flex items-center gap-4">
                    {/*<Button className="rounded-full" variant="ghost" size="icon">*/}
                    {/*    <MessageCircle className="h-5 w-5"/>*/}
                    {/*</Button>*/}
                    <Button className="rounded-full" variant="ghost" size="icon">
                        <Link href="/profile">
                            <UserIcon className="h-7 w-7" />
                        </Link>
                    </Button>
                </div>
            </nav>
        </header>
        <main className="max-w-2xl mx-auto my-8 flex items-center justify-center px-4 py-2 rounded shadow-xl border border-gray-300 bg-white">
            <Carousel className="rounded w-full">
                <CarouselContent>
                    {developers.map((dev) => (<CarouselItem key={dev.id}>
                        <Card className="w-full border-0">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                                    <img
                                        src={dev.image}
                                        alt={dev.name}
                                        className="w-[150px] h-[150px] object-cover rounded-full mb-4 md:mb-0 mx-auto md:mx-0"
                                    />
                                    <div className="w-full flex flex-col justify-start">
                                        <div>
                                            <CardTitle className="text-2xl">{dev.name}</CardTitle>
                                            <CardDescription className="text-lg text-gray-600">
                                                {dev.position}
                                            </CardDescription>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {dev.techStack.map((tech) => (
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
                                            <a href={`https://${dev.github}`} target="_blank" rel="noopener noreferrer"
                                               className="text-[#6A4DFF] hover:underline">
                                                {dev.github}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <p className="text-gray-600 md:col-span-2">{dev.description}</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-center gap-4 p-6 pt-0">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full w-12 h-12 p-0"
                                    onClick={() => setCurrentIndex(currentIndex + 1)}
                                >
                                    <X className="h-6 w-6 text-gray-500"/>
                                </Button>
                                <Button
                                    size="lg"
                                    className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90"
                                    onClick={() => handleLike(dev.id)}
                                >
                                    <Heart className="h-6 w-6 text-white"/>
                                </Button>
                            </CardFooter>
                        </Card>
                    </CarouselItem>))}
                </CarouselContent>
            </Carousel>
        </main>
    </div>);
}
