'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  X,
  Code2,
  ExternalLink,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Mock data for demonstration
const developers = [
  {
    id: 1,
    name: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    title: 'Full Stack Developer',
    experience: '5 years',
    description: 'Passionate about building scalable web applications and mentoring junior developers.',
    techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
  },
  {
    id: 2,
    name: 'Alex Rodriguez',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    title: 'Frontend Developer',
    experience: '3 years',
    description: 'Specializing in creating beautiful and responsive user interfaces with modern web technologies.',
    techStack: ['React', 'Vue.js', 'TailwindCSS', 'JavaScript'],
  },
  {
    id: 3,
    name: 'Emily Johnson',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
    title: 'Backend Developer',
    experience: '4 years',
    description: 'Focused on building robust and secure backend systems with a passion for clean code.',
    techStack: ['Python', 'Django', 'Docker', 'MongoDB'],
  },
];

export default function BrowsePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState<number[]>([]);

  const handleLike = (id: number) => {
    setLikedProfiles([...likedProfiles, id]);
    // In a real app, this would make an API call
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Code2 className="h-8 w-8 text-[#6A4DFF]" />
            <span className="ml-2 text-2xl font-bold gradient-text">DevMatch</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Link href="/profile">
              <Button variant="outline">Profile</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Carousel className="w-full">
          <CarouselContent>
            {developers.map((dev) => (
              <CarouselItem key={dev.id}>
                <Card className="w-full">
                  <CardHeader className="relative p-0">
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-2xl">{dev.name}</CardTitle>
                        <CardDescription className="text-lg text-gray-600">
                          {dev.title} • {dev.experience}
                        </CardDescription>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{dev.description}</p>
                    <div className="flex flex-wrap gap-2">
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
                  </CardContent>
                  <CardFooter className="flex justify-center gap-4 p-6 pt-0">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full w-12 h-12 p-0"
                      onClick={() => setCurrentIndex(currentIndex + 1)}
                    >
                      <X className="h-6 w-6 text-gray-500" />
                    </Button>
                    <Button
                      size="lg"
                      className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90"
                      onClick={() => handleLike(dev.id)}
                    >
                      <Heart className="h-6 w-6 text-white" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full w-12 h-12 p-0"
                      onClick={() => window.open(`/profile/${dev.id}`, '_blank')}
                    >
                      <ExternalLink className="h-6 w-6 text-gray-500" />
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
    </div>
  );
}