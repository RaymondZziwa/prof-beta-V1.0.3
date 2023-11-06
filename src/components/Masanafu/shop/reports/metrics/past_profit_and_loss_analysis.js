import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

const PastProfitAndLossAnalysis = ({ salesData, expensesData }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
      const profitLossData = calculateProfitLossData(salesData, expensesData);
      setChartData(profitLossData);
    }, []);
  
    const calculateProfitLossData = (salesData, expensesData) => {
      const years = [];
      const profitLossValues = [];
  
      salesData.forEach((sale) => {
        const saleYear = parseInt(sale.saleDate.split('/')[2]);
        const saleAmount = sale.totalAmount;
  
        const yearIndex = years.indexOf(saleYear);
        if (yearIndex !== -1) {
          profitLossValues[yearIndex] += saleAmount;
        } else {
          years.push(saleYear);
          profitLossValues.push(saleAmount);
        }
      });
  
      expensesData.forEach((expense) => {
        const expenseYear = parseInt(expense.date.split('/')[2]);
        const expenseAmount = expense.expenditurecost * -1; // Negate expense amount
  
        const yearIndex = years.indexOf(expenseYear);
        if (yearIndex !== -1) {
          profitLossValues[yearIndex] += expenseAmount;
        } else {
          years.push(expenseYear);
          profitLossValues.push(expenseAmount);
        }
      });
  
      return {
        labels: years,
        datasets: [
          {
            label: 'Profit/Loss',
            data: profitLossValues,
            fill: false,
            borderColor: profitLossValues.map((value) => (value >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)')),
            borderWidth: 2,
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
                  text: 'Profit/Loss Analysis',
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

export default PastProfitAndLossAnalysis