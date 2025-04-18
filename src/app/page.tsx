'use client';

import Image from 'next/image';
import Modal from '@/components/Modal/Modal';
import './globals.css';

export default function Home() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  return (
    <>
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
            <Modal
              buttonTitle="Login"
              headerTitle="Sign in to Org-Chart"
              inputLabels={['Email adress', 'Password']}
            />
          </form>
        </div>
      </section>
    </>
  );
}
