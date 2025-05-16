'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DataListWithAdd from '@/components/dataListWithAdd/DataListWithAdd';
import ClientLayout from '@/components/layout/ClientLayout';
import FlexContainer from '@/components/layout/FlexContainer';

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'loading') return <p>Loading…</p>;
  if (!session || session.user.role !== 'admin') {
    router.replace('/?error=forbidden');
    return null;
  }

  return (
    <ClientLayout>
      <FlexContainer
        className="w-full h-full"
        as="section"
        directionMobileView="col"
        directionTabletView="col"
        directionDesktopView="row"
        backgroundColor="bg-blue-500"
        padding="3"
        stretchChildren // 👈 enables h-full on child wrappers
      >
        <FlexContainer
          className="h-full w-full"
          directionMobileView="col"
          directionTabletView="row"
          directionDesktopView="row"
          backgroundColor="bg-red-600"
          padding="2"
          stretchChildren
        >
          <p className="bg-amber-400 h-full">hej</p>
          <p className="bg-amber-600 h-full">san</p>
        </FlexContainer>
        <FlexContainer
          className="h-full w-full"
          directionMobileView="col"
          directionTabletView="row"
          directionDesktopView="col"
          backgroundColor="bg-red-600"
          padding="2"
          stretchChildren
        >
          <p className="bg-amber-400 h-full">svej</p>
          <p className="bg-amber-600 h-full">san</p>
        </FlexContainer>
      </FlexContainer>

      {/* <div className="bg-amber-200 p-3 flex flex-col gap-3 lg:flex-row">
        <div className="w-full flex flex-col gap-1 md:flex-row">
          <div className="bg-white w-full">hej</div>
          <div className="bg-cyan-700 w-full">san</div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex flex-col gap-1 md:flex-row">
            <div className="bg-blue-400 w-full">svej</div>
            <div className="bg-amber-700 w-full">san</div>
          </div>
          <div className="bg-amber-700 w-full">Tjenixen</div>
        </div>
      </div> */}
    </ClientLayout>
  );
}
