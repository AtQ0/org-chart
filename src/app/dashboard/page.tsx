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
      <FlexContainer>
        <FlexContainer
          className="w-full h-full"
          as="section"
          directionMobileView="col"
          directionTabletView="col"
          directionLaptopView="col"
          directionDesktopView="row"
          stretchChildren
        >
          <FlexContainer
            className="h-full w-full"
            directionMobileView="col"
            directionTabletView="col"
            directionLaptopView="col"
            stretchChildren
          >
            <FlexContainer
              className="h-full"
              directionMobileView="col"
              directionTabletView="row"
              directionLaptopView="row"
            >
              <DataListWithAdd
                headerTitle="Countries"
                buttonTitle="Add country"
                dataType="countries"
                showSearch={true}
              />
              <DataListWithAdd
                headerTitle="Cities"
                buttonTitle="Add city"
                dataType="cities"
                showSearch={true}
              />
            </FlexContainer>

            <FlexContainer
              className="h-full"
              directionMobileView="col"
              directionTabletView="row"
              directionLaptopView="row"
            >
              <DataListWithAdd
                headerTitle="Offices"
                buttonTitle="Add office"
                dataType="offices"
                showSearch={true}
              />
              <DataListWithAdd
                headerTitle="Departments"
                buttonTitle="Add department"
                dataType="departments"
                showSearch={true}
              />
            </FlexContainer>
          </FlexContainer>
          <FlexContainer
            className="h-full w-full"
            directionMobileView="col"
            directionTabletView="col"
            directionLaptopView="col"
            stretchChildren
          >
            <FlexContainer
              className="h-full"
              directionMobileView="col"
              directionTabletView="row"
              directionLaptopView="row"
            >
              <DataListWithAdd
                headerTitle="Teams"
                buttonTitle="Add team"
                dataType="teams"
                showSearch={true}
              />
              <DataListWithAdd
                headerTitle="Domains"
                buttonTitle="Add domain"
                dataType="domains"
                showSearch={true}
              />
            </FlexContainer>
            <FlexContainer className="h-full">
              <DataListWithAdd
                headerTitle="Users"
                buttonTitle="Add user"
                dataType="users"
                showSearch={true}
              />
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer
          directionMobileView="col"
          directionLaptopView="col"
          directionDesktopView="row"
        >
          <DataListWithAdd
            headerTitle="Roles"
            buttonTitle="Add role"
            dataType="roles"
            showSearch={true}
          />
          <DataListWithAdd
            headerTitle="Titles"
            buttonTitle="Add title"
            dataType="titles"
            showSearch={true}
          />
          <DataListWithAdd
            headerTitle="Permissions"
            buttonTitle="Add permission"
            dataType="permissions"
            showSearch={true}
          />
        </FlexContainer>
      </FlexContainer>
    </ClientLayout>
  );
}
