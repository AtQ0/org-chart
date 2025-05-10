'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DataListWithAdd from '@/components/dataListWithAdd/DataListWithAdd';
import ClientLayout from '@/components/layout/ClientLayout';
import FlexContainer from '@/components/layout/FlexContainer';

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
      <FlexContainer
        as="section"
        directionMobileView="col"
        directionDesktopView="row"
        className="flex p-3"
        bg="bg-amber-900"
      >
        <FlexContainer
          directionMobileView="col"
          directionDesktopView="col"
          gap="2"
          bg="bg-yellow-400"
        >
          <FlexContainer
            directionMobileView="col"
            directionDesktopView="row"
            gap="10"
            bg="bg-amber-600"
          >
            <DataListWithAdd
              buttonTitle="Add country"
              headerTitle="Countries"
            />
            <DataListWithAdd buttonTitle="Add city" headerTitle="Cities" />
          </FlexContainer>
          <FlexContainer
            directionMobileView="col"
            directionDesktopView="row"
            gap="10"
            bg="bg-zinc-300"
          >
            <DataListWithAdd buttonTitle="Add office" headerTitle="Offices" />
            <DataListWithAdd
              buttonTitle="Add department"
              headerTitle="Departments"
            />
          </FlexContainer>
        </FlexContainer>
        <FlexContainer bg="bg-pink-500">
          <div>HEJ</div>
        </FlexContainer>
      </FlexContainer>
    </ClientLayout>
  );
}
