'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { OrgChart as D3OrgChart } from 'd3-org-chart';
import { useSession } from 'next-auth/react';
import ClientLayout from '@/components/layout/ClientLayout';

const OrgChart = () => {
  const { data: session, status } = useSession();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<any>(null); // store the chart instance

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) return;

    const chartContainer = chartContainerRef.current;

    const loadChart = async () => {
      // @ts-ignore: Ignore type error here
      const dataFlattened = (await d3.csv(
        'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv',
      )) as any; // Assuming the type is fine but TypeScript doesn't know

      if (chartContainer) {
        // @ts-ignore: Ignore type error here
        const chart = new D3OrgChart()
          .container(chartContainer)
          .data(dataFlattened) // Assuming the data is fine
          .nodeWidth(() => 250)
          .initialZoom(0.7)
          .nodeHeight(() => 175)
          .childrenMargin(() => 40)
          .compactMarginBetween(() => 15)
          .compactMarginPair(() => 80)
          .nodeContent((d: any) => {
            return `
              <div style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height}px;border-radius:2px;overflow:visible">
                <div style="height:${d.height - 32}px;padding-top:0px;background-color:white;border:1px solid lightgray;">

                  <img src="${d.data.imageUrl}" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />

                  <div style="margin-right:10px;margin-top:15px;float:right">${d.data.id}</div>

                  <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${d.width - 2}px;border-radius:1px"></div>

                  <div style="padding:20px; padding-top:35px;text-align:center">
                      <div style="color:#111672;font-size:16px;font-weight:bold">${d.data.name}</div>
                      <div style="color:#404040;font-size:16px;margin-top:4px">${d.data.positionName}</div>
                  </div> 
                  <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
                    <div>Manages: ${d.data._directSubordinates} :bust_in_silhouette:</div>  
                    <div>Oversees: ${d.data._totalSubordinates} :bust_in_silhouette:</div>    
                  </div>
                </div>     
              </div>
            `;
          })
          .render();

        chartInstance.current = chart;
      }
    };

    loadChart();

    return () => {
      // Clean up the chart container manually
      if (chartContainer) {
        d3.select(chartContainer).selectAll('*').remove(); // This removes all child elements from the container
      }
    };
  }, [status, session]);

  if (status === 'loading') return <div>Loading...</div>;
  if (!session)
    return <div>You need to be logged in to view the org chart.</div>;

  const { id: userId, name: userName, role: userRole } = session.user;

  return (
    <ClientLayout userRole={userRole}>
      <section className="h-full flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">
          Welcome to the Org Chart, {userName}!
        </h1>
        <p className="text-base">User ID: {userId}</p>
        <p className="text-base">Role: {userRole}</p>
        <section className="bg-palette-oceanblue flex justify-center items-center flex-1">
          <div
            className="w-full h-[1200px] bg-[#f6f6f6] chart-container"
            ref={chartContainerRef}
          />
        </section>
      </section>
    </ClientLayout>
  );
};

export default OrgChart;
