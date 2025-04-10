'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Code2 } from 'lucide-react';
import { auth } from '@/services/auth.service'
import { createAccessToken, getAccessToken } from "@/services/cookies.service";
import {useRouter} from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const router = useRouter(); // Инициализируем router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      try {
          const response = await auth(formData.email);
          await createAccessToken(response.access_token)
          if (response.is_first_time) {
              router.push('/signup');
          }
          else{
              router.push('/profile')
          }
      } catch (error) {
          console.error(error);
      }
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
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Welcome back</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="text-black"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full btn-gradient">
            Log in
          </Button>
        </form>
      </Card>
    </div>
  );
}