'use client';

import { useSession } from 'next-auth/react';
import ClientLayout from '@/components/layout/ClientLayout';
import Searchbar from '@/components/searchbar/Searchbar';

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
  const { id: userId, name: userName, role: userRole } = session.user;

  return (
    <ClientLayout userRole={userRole}>
      <section className="h-[100%] flex flex-col gap-5">
        <h1>Welcome to the Org Chart, {userName}!</h1>
        <p>User ID: {userId}</p>
        <p>Role: {userRole}</p>
        <section className="bg-palette-oceanblue flex justify-center items-center flex-1">
          <div className="bg-amber-400 rounded-full w-full max-w-xl max-h-xl h-full text-center flex justify-center items-center">
            <p>THE GLOBE</p>
          </div>
        </section>
      </section>
    </ClientLayout>
  );
};

export default OrgChart;
