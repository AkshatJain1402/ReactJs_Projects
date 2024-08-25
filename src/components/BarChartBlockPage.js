import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Rectangle,
} from "recharts";
function BarChartBlockPage({ data }) {
  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="nipun"
          fill="#8884d8"
          activeBar={<Rectangle fill="#8884d8" stroke="blue" />}
        />
        <Bar
          dataKey="upcomingNipun"
          fill="#82ca9d"
          activeBar={<Rectangle fill="#82ca9d" stroke="black" />}
        />
      </BarChart>
    </div>
  );
}

export default BarChartBlockPage;
