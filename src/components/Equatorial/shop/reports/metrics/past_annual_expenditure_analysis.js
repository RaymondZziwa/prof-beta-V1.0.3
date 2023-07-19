import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const PastAnnualExpenditureAnalysis = ({ expensesData }) => {
    const [chartData, setChartData] = useState({});

  useEffect(() => {
    const totalExpensesData = calculateTotalExpensesData(expensesData);

    setChartData(totalExpensesData);
  }, []);

  const calculateTotalExpensesData = (expensesData) => {
    const years = [];
    const totalExpensesValues = [];

    expensesData.forEach((expense) => {
      const expenseYear = parseInt(expense.date.split('/')[2]);
      const expenseAmount = expense.expenditurecost;

      const yearIndex = years.indexOf(expenseYear);
      if (yearIndex !== -1) {
        totalExpensesValues[yearIndex] += expenseAmount;
      } else {
        years.push(expenseYear);
        totalExpensesValues.push(expenseAmount);
      }
    });

    return {
      labels: years,
      datasets: [
        {
          label: 'Total Sales',
          data: totalExpensesValues,
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

export default PastAnnualExpenditureAnalysis