import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const PastAnnualSalesPerformanceAnalysis = ({ salesData }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const totalSalesData = calculateTotalSalesData(salesData);

    setChartData(totalSalesData);
  }, []);

  const calculateTotalSalesData = (salesData) => {
    const years = [];
    const totalSalesValues = [];

    salesData.forEach((sale) => {
      const saleYear = parseInt(sale.saleDate.split('/')[2]);
      const saleAmount = sale.totalAmount;

      const yearIndex = years.indexOf(saleYear);
      if (yearIndex !== -1) {
        totalSalesValues[yearIndex] += saleAmount;
      } else {
        years.push(saleYear);
        totalSalesValues.push(saleAmount);
      }
    });

    return {
      labels: years,
      datasets: [
        {
          label: 'Total Sales',
          data: totalSalesValues,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    };
  };

  return (
    <div>
      {chartData.labels && chartData.labels.length > 0 ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: ' ',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => {
                    return value.toLocaleString('en-UG', { style: 'currency', currency: 'UGX' });
                  },
                },
              },
            },
          }}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  )
}

export default PastAnnualSalesPerformanceAnalysis