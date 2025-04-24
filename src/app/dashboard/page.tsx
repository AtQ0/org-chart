'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ClientLayout from '@/components/layout/ClientLayout';

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  /* still loading auth info */
  if (status === 'loading') return <p>Loading…</p>;

  /* not logged in OR not an admin → bounce home with message */
  if (!session || session.user.role !== 'admin') {
    router.replace('/?error=forbidden');
    return null;
  }

  /* extract the role for the layout if it needs it */
  const { role: userRole } = session.user;

  return (
    <ClientLayout userRole={userRole}>
      <section>
        <div>
          <p>This is the DASHBOARD</p>
        </div>
      </section>
    </ClientLayout>
  );
}
