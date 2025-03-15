'use client';

import { useState } from 'react';
import { Eye, Activity, Brain, ArrowDown, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleFeedback = (type: 'liked' | 'disliked') => {
    setFeedback(type);
    setShowThankYou(true);
  };

  const exercises = [
    {
      name: "Жмурки",
      description: "Крепко закройте глаза на 3-5 секунд. Повторите 6-8 раз.",
      steps: [
      ],
      images: [
        "/zhmurki.jpg",
        "/zhmurki_2.jpg",
      ],
      duration: "2-3 минуты"
    },
    {
      name: "Пол-потолок-стены",
      description: "Медленно переводите взгляд с пола на потолок, вправо, влево и обратно, не меняя положения головы. Повторите 8-12 раз.",
      steps: [
        "Представьте перед собой большой круг",
        "Медленно двигайте глазами по кругу по часовой стрелке",
        "Поменяйте направление",
        "5 кругов в каждую сторону"
      ],
      images: [
        "/wall-floor_1.jpg",
        "/wall-floor_2.jpg",
        "/wall-floor_3.jpg",
        "/wall-floor_4.jpg",
      ],
      duration: "1-2 минуты"
    },
    {
      name: "Переносица",
      description: "Смотреть прямо перед собой 2-3 сек. Сводим зрачки к переносице изо всех сил, приблизив палец к носу 3-5 сек. Повторить 10-12 раз. Упражнение снимает утомление, облегчает зрительную работу на близком расстоянии.",
      steps: [
        "Представьте перед собой зигзагообразную линию",
        "Проведите взглядом по этой линии слева направо",
        "Затем проведите взглядом по диагонали сверху вниз",
        "Повторите 10 раз"
      ],
      images: [
        "/perenosica_1.jpg",
        "/perenosica_2.jpg",
      ],
      duration: "2-3 минуты"
    },
    {
      name: "Шторки",
      description: "Быстро и легко моргайте 2 минуты. Это упражнение способствует улучшению кровообращения.",
      steps: [
        "Представьте перед собой зигзагообразную линию",
        "Проведите взглядом по этой линии слева направо",
        "Затем проведите взглядом по диагонали сверху вниз",
        "Повторите 10 раз"
      ],
      images: [
        "/shtorki_1.jpg",
        "/shtorki_2.jpg",
      ],
      duration: "2-3 минуты"
    },
    {
      name: "Часики",
      description: "Перемещайте взгляд в разных направлениях: по кругу – по часовой стрелке и против. Упражнение укрепляет мышцы глаз.",
      steps: [
      ],
      images: [
        "/watches_1.jpg",
        "/watches_2.jpg",
        "/watches_3.jpg",
        "/watches_4.jpg",
      ],
      duration: "2-3 минуты"
    },
    {
      name: "Стерльба глазками",
      description: "Вверх – влево, вниз – право и наоборот. Глаза при этом могут быть открыты или закрыты, как удобнее. Упражнение укрепляет мышцы глаз.",
      steps: [
      ],
      images: [
        "/shoot_eyes_1.jpg",
        "/shoot_eyes_2.jpg",
        "/shoot_eyes_3.jpg",
        "/shoot_eyes_4.jpg",
      ],
      duration: "2-3 минуты"
    },
    {
      name: "Удивление",
      description: "Зажмуриваем глаза на пять секунд и широко распахивает веки. Этот метод укрепляет и расслабляет мышцы глазного яблока, повышает обмен веществ и циркуляцию крови в тканях. Повторите 8-10 раз.",
      steps: [
      ],
      images: [
        "/surprize_1.jpg",
        "/surprize_2.jpg",
      ],
      duration: "2-3 минуты"
    },
    {
      name: "Метка на стекле",
      description: "Определяем точку на стекле. Выбираем за окном далекий объект, несколько секунд смотрим вдаль, потом переводим взгляд на точку. Позже можно усложнить нагрузки – фокусироваться на четырех разноудаленных объектах.",
      steps: [
      ],
      images: [
        "/metka_1.jpg",
        "/metka_2.jpg",
      ],
      duration: "2-3 минуты"
    },
    {
      name: "Массаж",
      description: "Тремя пальцами каждой руки легко нажмите на верхние веки, через 1-2 секунды снимите пальцы с век. Повторите 3 раза. Упражнение улучшает циркуляцию внутриглазной жидкости.",
      steps: [
      ],
      images: [
        "/massage_1.jpg"
      ],
      duration: "2-3 минуты"
    }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              Зачем беречь зрение?
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Ваши глаза - бесценный дар. Давайте научимся их беречь вместе.
            </p>
            <Button
                size="lg"
                className="animate-bounce"
                onClick={() => {
                  document.getElementById('main-content')?.scrollIntoView({behavior: 'smooth'});
                }}
            >
              Узнать больше <ArrowDown className="ml-2"/>
            </Button>
          </div>
        </section>

        {/* Main Content */}
        <main id="main-content" className="max-w-7xl mx-auto px-4 py-16">
          {/* Why It's Important */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
              Почему важно заботиться о зрении?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Eye className="w-12 h-12 text-blue-600 mb-4"/>
                <h3 className="text-xl font-semibold mb-3">Качество жизни</h3>
                <p className="text-gray-600">
                  90% информации мы получаем через глаза. Хорошее зрение критически важно для полноценной жизни.
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Activity className="w-12 h-12 text-blue-600 mb-4"/>
                <h3 className="text-xl font-semibold mb-3">Профилактика заболеваний</h3>
                <p className="text-gray-600">
                  Своевременная забота о глазах предотвращает развитие серьезных заболеваний.
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Brain className="w-12 h-12 text-blue-600 mb-4"/>
                <h3 className="text-xl font-semibold mb-3">Умственная активность</h3>
                <p className="text-gray-600">
                  Хорошее зрение напрямую влияет на концентрацию и работоспособность.
                </p>
              </Card>
            </div>
          </section>

          {/* Eye Exercises */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
              Упражнения для глаз
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {exercises.map((exercise, index) => (
                  <Card key={index} className="p-6 flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">{exercise.name}</h3>
                    <Carousel className="w-full max-w-xs mx-auto mb-4">
                      <CarouselContent>
                        {exercise.images.map((image, imageIndex) => (
                            <CarouselItem key={imageIndex}>
                              <div className="aspect-square relative overflow-hidden rounded-lg">
                                <img
                                    src={image}
                                    alt={`Шаг ${imageIndex + 1} упражнения ${exercise.name}`}
                                    className="object-contain w-full h-full"
                                />
                              </div>
                            </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious/>
                      <CarouselNext/>
                    </Carousel>
                    <div className="mt-4">
                    </div>
                    <p className="text-gray-600 mb-4">{exercise.description}</p>
                  </Card>
              ))}
            </div>
          </section>

          {/* Prevention Tips */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
              Советы по профилактике
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Правило 20-20-20</h3>
                <p className="text-gray-600">
                  Каждые 20 минут делайте перерыв на 20 секунд и смотрите на предметы на расстоянии 20 футов (6 метров).
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Правильное освещение</h3>
                <p className="text-gray-600">
                  Обеспечьте достаточное освещение рабочего места. Избегайте бликов на экране.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Здоровое питание</h3>
                <p className="text-gray-600">
                  Употребляйте продукты, богатые витаминами A, C, E и омега-3 жирными кислотами.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Регулярные проверки</h3>
                <p className="text-gray-600">
                  Посещайте офтальмолога минимум раз в год для профилактического осмотра.
                </p>
              </Card>
            </div>
          </section>
        </main>
        <footer className="mt-auto py-8 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              {!showThankYou ? (
                  <>
                    <p className="text-lg text-gray-700">Была ли эта статья полезной?</p>
                    <div className="flex gap-4">
                      <Button
                          variant="outline"
                          className={`p-6 ${feedback === 'liked' ? 'bg-green-50 border-green-500' : ''}`}
                          onClick={() => handleFeedback('liked')}
                      >
                        <ThumbsUp className={`w-6 h-6 ${feedback === 'liked' ? 'text-green-500' : 'text-gray-500'}`}/>
                      </Button>
                      <Button
                          variant="outline"
                          className={`p-6 ${feedback === 'disliked' ? 'bg-red-50 border-red-500' : ''}`}
                          onClick={() => handleFeedback('disliked')}
                      >
                        <ThumbsDown
                            className={`w-6 h-6 ${feedback === 'disliked' ? 'text-red-500' : 'text-gray-500'}`}/>
                      </Button>
                    </div>
                  </>
              ) : (
                  <p className="text-lg text-green-600 font-medium">Спасибо за ваш отзыв!</p>
              )}
            </div>
          </div>
        </footer>
      </div>
  );
}