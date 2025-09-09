import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const revenueData = [

  {
    name: "Views",
    color: "rgb(255, 99, 132)",
    values: [30000, 32000, 33000, 35000, 37000, 40000, 42000,43000,44000,42000,48000,50000],
  },

];


const ViewChart=()=> {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'VIEWS',
      },
    },
  };

  const labels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  const data = {
    labels,
    datasets:revenueData.map((item) => ({
      label: item.name,
      data: item.values,
      borderColor: item.color,
      backgroundColor: item.color ,
    }))

  };
  return <Line options={options} data={data} />;
}
export default ViewChart;
