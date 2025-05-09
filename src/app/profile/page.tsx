'use client';

import { useSession } from 'next-auth/react';
import ClientLayout from '@/components/layout/ClientLayout';

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You must be signed in to view this page.</p>;
  }

  return (
    <ClientLayout>
      <div>
        <h1>PROFILE PAGE</h1>
        <p>User ID: {session.user.id}</p>
        <p>Role: {session.user.role}</p>
      </div>
    </ClientLayout>
  );
};

export default ProfilePage;
