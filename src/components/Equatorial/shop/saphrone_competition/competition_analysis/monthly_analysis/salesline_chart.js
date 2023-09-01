import React from 'react';
import { Line } from 'react-chartjs-2';

const MonthlyMerchandiseSoldAnalysis = ({ salesData }) => {
  // Initialize arrays to hold data for each month
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const merchandiseSoldData = Array(12).fill(0);

  // Calculate merchandise sold per month
  salesData.forEach((sale) => {
    const [day, month, year] = sale.date.split('/');
    const monthIndex = parseInt(month, 10) - 1; // Subtract 1 to convert to 0-based index
    const merchandiseSold = sale.merchandisesold;

    if (monthIndex >= 0 && monthIndex < 12) {
      merchandiseSoldData[monthIndex] += merchandiseSold;
    }
  });

  // Create chart data
  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Merchandise Sold',
        data: merchandiseSoldData,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Merchandise Sold',
        },
      },
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <h5 style={{ textAlign: 'center' }}>Monthly Merchandise Sold Analysis</h5>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default MonthlyMerchandiseSoldAnalysis;
