'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Code2 } from 'lucide-react';
import {Textarea} from "@/components/ui/textarea";

export default function SignupPage() {
  // Изменяем начальное состояние: stack теперь массив
  const [formData, setFormData] = useState({
    hometown: '',
    stack: [''], // Массив с одним пустым полем по умолчанию
    gh: '',
    position: '',
    bio: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Логика аутентификации будет реализована позже
  };

  // Функция для добавления нового поля
  const addStackField = () => {
    setFormData({
      ...formData,
      stack: [...formData.stack, ''], // Добавляем новое пустое поле
    });
  };

  // Функция для обновления конкретного поля в массиве stack
  const handleStackChange = (index: number, value: string) => {
    const updatedStack = formData.stack.map((item, i) =>
        i === index ? value : item
    );
    setFormData({
      ...formData,
      stack: updatedStack,
    });
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center">
            <Code2 className="h-8 w-8 text-[#6A4DFF]" />
            <span className="ml-2 text-2xl font-bold gradient-text">Cognit.io</span>
          </Link>
        </div>
        <Card className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-black">Прежде чем начать, дополни немного информации о себе</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hometown">Родной город</Label>
              <Input
                  id="hometown"
                  type="text"
                  placeholder="Казань"
                  value={formData.hometown}
                  onChange={(e) => setFormData({ ...formData, hometown: e.target.value })}
                  required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Позиция</Label>
              <Input
                  id="position"
                  type="text"
                  placeholder="Fullstack"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
              />
            </div>
            <div className="space-y-2">
              <Label>Стек технологий</Label>
              {formData.stack.map((stackItem, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                        id={`stack-${index}`}
                        type="text"
                        placeholder="React, NextJS, Python, ..."
                        value={stackItem}
                        onChange={(e) => handleStackChange(index, e.target.value)}
                        required
                    />
                    {/* Кнопка "+" добавляется только для последнего поля */}
                    {index === formData.stack.length - 1 && (
                        <Button type="button" onClick={addStackField} className="ml-2 text-white">
                          +
                        </Button>
                    )}
                  </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gh">Ссылка на GitHub</Label>
              <Input
                  id="gh"
                  type="link"
                  placeholder="https://github.com/newDeveloper"
                  value={formData.gh}
                  onChange={(e) => setFormData({ ...formData, gh: e.target.value })}
                  required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">О себе</Label>
              <Textarea
                  id="bio"
                  placeholder="Расскажите немного о себе..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  required
                  className="h-32"
              />
            </div>

            <Link href="/browse">
              <Button type="submit" className="rounded-full w-full btn-gradient mt-4">
                Начать поиск!
              </Button>
            </Link>
          </form>
        </Card>
      </div>
  );
}