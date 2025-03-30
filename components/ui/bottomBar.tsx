'use client';

import { Home, User, Search, MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomBar = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16">
            <Link href="/browse" className="flex flex-col items-center">
                <Home className={`h-6 w-6 ${isActive('/browse') ? 'text-blue-500' : 'text-gray-600'}`} />
                <span className={`text-xs mt-1 ${isActive('/browse') ? 'text-blue-500' : 'text-gray-600'}`}>Главная</span>
            </Link>
            <Link href="/direct" className="flex flex-col items-center">
                <MessageCircle className={`h-6 w-6 ${isActive('/direct') ? 'text-blue-500' : 'text-gray-600'}`} />
                <span className={`text-xs mt-1 ${isActive('/direct') ? 'text-blue-500' : 'text-gray-600'}`}>Директ</span>
            </Link>
            <Link href="/likes" className="flex flex-col items-center">
                <Heart className={`h-6 w-6 ${isActive('/likes') ? 'text-blue-500' : 'text-gray-600'}`} />
                <span className={`text-xs mt-1 ${isActive('/likes') ? 'text-blue-500' : 'text-gray-600'}`}>Лайки</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center">
                <User className={`h-6 w-6 ${isActive('/profile') ? 'text-blue-500' : 'text-gray-600'}`} />
                <span className={`text-xs mt-1 ${isActive('/profile') ? 'text-blue-500' : 'text-gray-600'}`}>Профиль</span>
            </Link>
        </nav>
    );
};

export default BottomBar;