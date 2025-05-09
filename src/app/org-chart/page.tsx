'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { OrgChart as D3OrgChart } from 'd3-org-chart';
import { useSession } from 'next-auth/react';
import ClientLayout from '@/components/layout/ClientLayout';

const OrgChart = () => {
  const { data: session, status } = useSession();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (status === 'loading' || !session) return;

    const loadChart = async () => {
      const response = await fetch('http://localhost:3000/api/users');
      const users = await response.json();

      // Convert flat array to hierarchy
      const usersWithNames = users.map((u: any) => ({
        id: u.id,
        parentId: u.manager_id || null, // d3-org-chart expects parentId
        name: `${u.first_name} ${u.last_name}`,
        image: u.image,
        position: u.email, // Or use a job title if you add one
      }));

      const chart = new D3OrgChart()
        .container(chartContainerRef.current)
        .data(usersWithNames)
        .nodeWidth(() => 265)
        .nodeHeight(() => 110)
        .childrenMargin(() => 40)
        .compactMarginBetween(() => 15)
        .compactMarginPair(() => 40)
        .neighbourMargin(() => 20)
        .nodeContent((d: any) => {
          return `
            <div style='width:${d.width}px;height:${d.height}px;padding:6px;box-sizing:border-box'>
              <div style="font-family:sans-serif;background-color:white;border:1px solid #ccc;border-radius:10px;width:100%;height:100%;padding:10px">
                <div style="display:flex;align-items:center">
                  <img src="${d.data.image}" style="border-radius:50%;width:50px;height:50px;margin-right:10px;" />
                  <div>
                    <div style="font-weight:bold;font-size:14px;">${d.data.name}</div>
                    <div style="font-size:12px;color:#666;">${d.data.position}</div>
                  </div>
                </div>
              </div>
            </div>`;
        })
        .render();

      chartInstance.current = chart;
    };

    loadChart();
  }, [session, status]);

  return (
    <ClientLayout>
      <div ref={chartContainerRef} style={{ width: '100%', height: '100vh' }} />
    </ClientLayout>
  );
};

export default OrgChart;
