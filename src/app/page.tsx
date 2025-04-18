'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
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

    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);

    if (data.user_id) {
      // Redirect to the user-specific page, passing user_id and role_name in the URL
      router.push(`/user/${data.user_id}?role_name=${data.role_name}`);
    }
  };

  return (
    <section className="px-5 flex flex-col justify-center items-center h-screen bg-[url('/images/clouds.png')] bg-cover bg-center lg:bg-[url('/images/clouds.png')]">
      <div className="h-[100%] flex flex-col gap-10 pt-10">
        <Image
          alt="My image"
          className="object-cover rounded-xl"
          height={400}
          src="/images/main-logo.png"
          width={400}
        />

        <form onSubmit={handleSubmit}>
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
  );
}
