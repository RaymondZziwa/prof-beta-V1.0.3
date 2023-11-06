import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

const AnnualProfitAndLossAnalysis = ({ salesData, expensesData }) => {
    const [monthOptions, setMonthOptions] = useState([]);
    const [chartData, setChartData] = useState({});
  
    useEffect(() => {
      // Generate dynamic month options based on the current year
      const currentYear = new Date().getFullYear();
      const months = [];
      for (let month = 1; month <= 12; month++) {
        const optionValue = `${month.toString().padStart(2, '0')}/${currentYear}`;
        const optionLabel = new Date(currentYear, month - 1, 1).toLocaleString('default', { month: 'long' });
        months.push({ value: optionValue, label: optionLabel });
      }
      setMonthOptions(months);
    }, []);
  
    useEffect(() => {
      if (salesData.length > 0 && expensesData.length > 0) {
        const currentYear = new Date().getFullYear();
        const monthlyData = [];
        const barColors = [];
        for (let month = 1; month <= 12; month++) {
          const selectedMonth = `${month.toString().padStart(2, '0')}/${currentYear}`;
          const filteredSalesData = salesData.filter((sale) => {
            const saleDateParts = sale.saleDate.split('/');
            const saleMonth = parseInt(saleDateParts[1]);
            const saleYear = parseInt(saleDateParts[2]);
            return saleMonth === month && saleYear === currentYear;
          });
  
          const filteredExpensesData = expensesData.filter((expense) => {
            const expenseDateParts = expense.date.split('/');
            const expenseMonth = parseInt(expenseDateParts[1]);
            const expenseYear = parseInt(expenseDateParts[2]);
            return expenseMonth === month && expenseYear === currentYear;
          });
  
          const totalSales = filteredSalesData.reduce((total, sale) => total + sale.totalAmount, 0);
          const totalExpenses = filteredExpensesData.reduce((total, expense) => total + expense.expenditurecost, 0);
          const profitLoss = totalSales - totalExpenses;
  
          monthlyData.push(profitLoss);
          barColors.push(profitLoss < 0 ? 'red' : 'rgba(75, 192, 192, 1)');
        }
  
        setChartData({
          labels: monthOptions.map((option) => option.label),
          datasets: [
            {
              label: 'Profit/Loss',
              data: monthlyData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: barColors,
            },
          ],
        });
      }
    }, [salesData, expensesData, monthOptions]);
    const date = new Date ()
    const currentYear = date.getFullYear()

    
  const options = {
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          borderDash: [8, 4],
        },
        ticks: {
          callback: (value) => (value === 0 ? '0' : value),
          font: {
            weight: 'bold',
          },
        },
      },
    },
  };
    return (
      <div>
        <h6 style={{textAlign:'center'}}>Year: {currentYear}</h6>
        {chartData.labels && chartData.datasets ? (
          <Line data={chartData} options={options} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    )
};


export default AnnualProfitAndLossAnalysis