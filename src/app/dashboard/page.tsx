'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DataListWithAdd from '@/components/dataListWithAdd/DataListWithAdd';
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

  return (
    <ClientLayout>
      <section>
        <DataListWithAdd buttonTitle="Add country" headerTitle="Cuntries" />
      </section>
    </ClientLayout>
  );
}
