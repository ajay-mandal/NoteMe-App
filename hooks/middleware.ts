"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useMiddleware() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    }
  }, [router]);
}
