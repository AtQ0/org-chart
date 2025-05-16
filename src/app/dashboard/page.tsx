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
        className="w-full"
        as="section"
        directionMobileView="col"
        directionTabletView="col"
        directionLaptopView="row" // changed here
        backgroundColor="bg-blue-500"
        padding="3"
        stretchChildren // enables h-full on child wrappers
      >
        <FlexContainer
          className="h-full w-full"
          directionMobileView="col"
          directionTabletView="col"
          directionLaptopView="col" // changed here
          backgroundColor="bg-red-600"
          padding="2"
          stretchChildren
        >
          <FlexContainer
            className="bg-white h-full"
            directionMobileView="col"
            directionTabletView="row"
            directionLaptopView="row" // changed here
          >
            <p className="bg-amber-400 h-[300px]">hej</p>
            <p className="bg-amber-600 h-[300px]">san</p>
          </FlexContainer>

          <FlexContainer
            className="bg-white h-full"
            directionMobileView="col"
            directionTabletView="row"
            directionLaptopView="row" // changed here
          >
            <p className="bg-amber-400 h-[300px]">svej</p>
            <p className="bg-amber-600 h-[300px]">san</p>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer
          className="h-full w-full"
          directionMobileView="col"
          directionTabletView="col"
          directionLaptopView="col" // changed here
          backgroundColor="bg-red-600"
          padding="2"
          stretchChildren
        >
          <FlexContainer
            className="bg-white h-full"
            directionMobileView="col"
            directionTabletView="row"
            directionLaptopView="row" // changed here
          >
            <p className="bg-amber-400 h-[300px]">Hej</p>
            <p className="bg-amber-600 h-[300px]">san</p>
          </FlexContainer>
          <FlexContainer className="bg-white h-full">
            <p className="bg-purple-600 h-[300px]">Svej san</p>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </ClientLayout>
  );
}
