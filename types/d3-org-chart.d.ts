declare module 'd3-org-chart' {
  // Define the structure of the node data more precisely
  type OrgChartNodeData = {
    id: string;
    name: string;
    positionName: string;
    imageUrl: string;
    _directSubordinates: number;
    _totalSubordinates: number;
  };

  // Update the class definition to use this data type
  class OrgChart {
    container(element: HTMLElement): this;
    data(data: OrgChartNodeData[]): this;
    nodeWidth(callback: (d: OrgChartNodeData) => number): this;
    nodeHeight(callback: (d: OrgChartNodeData) => number): this;
    childrenMargin(callback: (d: OrgChartNodeData) => number): this;
    compact(value: boolean): this;
    render(): void;
    destroy(): void;
  }

  // Make sure OrgChart is available for use
  const D3OrgChart: typeof OrgChart;
  export = D3OrgChart;
}
