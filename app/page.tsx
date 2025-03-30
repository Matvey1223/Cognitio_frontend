import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Code2, Users, Sparkles, MessageSquare, MessageCircle, PersonStanding, UserIcon} from 'lucide-react';

export default function Home() {
    return (<div className="min-h-screen">
        <header className="border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <Code2 className="h-8 w-8 text-[#6A4DFF]"/>
                    <span className="ml-2 text-2xl font-bold gradient-text">Cognit.io</span>
                </div>
            </nav>
        </header>

        <main>
            <section className="py-20 px-4 text-center">
                <h1 className="text-5xl font-bold mb-6 gradient-text">
                    Найди своего идеального кодинг-партнера
                </h1>
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                    Кооперируйся с разработчиками, которые разделяет твой технологический стек, и воплощайте свои
                    идеи в реальность!
                    Находи, общайся и разрабатывайте лучшие проекты вместе!
                </p>
                <Link href="https://capypara.kai.ru">
                    <Button className="rounded-full btn-gradient text-lg px-8 py-6 ">
                        Скачать КапиПара
                    </Button>
                </Link>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-16 gradient-text">
                        Почему Cognit.io?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<Users className="h-12 w-12 text-[#6A4DFF]"/>}
                            title="Совпадения по стеку"
                            description="Найди разработчиков, которые работают с тем же стеком, что и вы.
                                Идеально подходит для совместной работы и обучения."
                        />
                        <FeatureCard
                            icon={<MessageSquare className="h-12 w-12 text-[#A54DFF]"/>}
                            title="AI Helper"
                            description="Получи предложения по проектам с использованием искусственного интеллекта, основанные на ваших общих навыках и интересах."
                        />
                        <FeatureCard
                            icon={<Sparkles className="h-12 w-12 text-[#4DA1FF]"/>}
                            title="Разрабатывайте вместе"
                            description="Превращай знакомства в успешное сотрудничество. Создайте что-нибудь удивительное вместе."
                        />
                    </div>
                </div>
            </section>
        </main>


        <footer className="bg-gray-50 border-t py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
                <p>© 2025  Cognit.io. All rights reserved.</p>
            </div>
        </footer>
    </div>);
}

function FeatureCard({icon, title, description}: {
    icon: React.ReactNode; title: string; description: string;
}) {
    return (<div className="p-6 rounded-xl bg-gray-50 card-hover">
        <div className="flex flex-col items-center text-center">
            {icon}
            <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>);
}
