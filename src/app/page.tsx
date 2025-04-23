'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Modal from '@/components/modal/Modal';
import './globals.css';

interface LoginForm {
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.ok) {
      router.push('/org-chart');
    } else {
      // Show error message to user
      console.error('Login failed', res?.error);
    }
  };

  return (
    <main>
      <section className="flex flex-col justify-center items-center h-screen">
        <div className="h-[100%] flex flex-col gap-10 pt-10">
          <Image
            priority
            alt="Logotype"
            className="object-cover rounded-xl w-full" // Use Tailwind's width utility class
            height={400}
            src="/images/main-logo.png"
            width={400}
          />

          <form className="flex justify-center" onSubmit={handleSubmit}>
            <Modal<LoginForm>
              buttonTitle="Login"
              formData={formData}
              headerTitle="Sign in to Org-Chart"
              inputLabels={['Email', 'Password']}
              setFormData={setFormData}
            />
          </form>
        </div>
      </section>
    </main>
  );
}
