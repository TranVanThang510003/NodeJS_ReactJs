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
    name: "Premium",
    color: "rgb(53, 162, 235)",
    values: [300, 320, 330, 350, 370, 400, 420,400,420,444,455,433],
  },

];


const RevenueChart=()=> {
 const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' ,
        display: false,
      },
      title: {
        display: true,
        text: 'REVENUE',
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
export default RevenueChart;
