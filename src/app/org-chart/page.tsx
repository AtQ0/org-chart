'use client';

import { useSession } from 'next-auth/react';
import ClientLayout from '@/components/layout/ClientLayout';

const OrgChart = () => {
  // Use the session hook to access the user session
  const { data: session, status } = useSession();

  // If the session is loading or the user is not authenticated, show a loading message or prompt to login
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be logged in to view the org chart.</div>;
  }

  // Extract user data from the session
  const { id, name, role } = session.user;

  return (
    <ClientLayout>
      <section className="h-[100%]">
        <h1>Welcome to the Org Chart, {name}!</h1>
        <p>User ID: {id}</p>
        <p>Role: {role}</p>
      </section>
    </ClientLayout>
  );
};

export default OrgChart;
