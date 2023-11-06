import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const AnnualSalesVsExpensesAnalysis = ({ salesData, expensesData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      let chart = null;
  
      const prepareChartData = () => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
      
        // Initialize data arrays for sales and expenses for each month
        const salesByMonth = new Array(12).fill(0);
        const expensesByMonth = new Array(12).fill(0);
      
        // Filter sales and expenses data for the current year
        const currentYear = new Date().getFullYear();
        const filteredSalesData = salesData.filter((sale) => {
          const saleDateParts = sale.saleDate.split('/');
          const saleYear = parseInt(saleDateParts[2]);
          return saleYear === currentYear;
        });
        const filteredExpensesData = expensesData.filter((expense) => {
          const expenseDateParts = expense.date.split('/');
          const expenseYear = parseInt(expenseDateParts[2]);
          return expenseYear === currentYear;
        });
      
        // Aggregate sales by month
        filteredSalesData.forEach((sale) => {
          const saleDateParts = sale.saleDate.split('/');
          const saleMonthIndex = parseInt(saleDateParts[1]) - 1; // Adjust for zero-based indexing
          salesByMonth[saleMonthIndex] += sale.totalAmount;
        });
      
        // Aggregate expenses by month
        filteredExpensesData.forEach((expense) => {
          const expenseDateParts = expense.date.split('/');
          const expenseMonthIndex = parseInt(expenseDateParts[1]) - 1; // Adjust for zero-based indexing
          expensesByMonth[expenseMonthIndex] += expense.expenditurecost;
        });
      
        // Return the formatted chart data
        return {
          labels: months,
          datasets: [
            {
              label: 'Sales',
              data: salesByMonth,
              backgroundColor: 'green',
            },
            {
              label: 'Expenses',
              data: expensesByMonth,
              backgroundColor: 'red',
            },
          ],
        };
      };
  
      const createChart = () => {
        const ctx = chartRef.current.getContext('2d');
        chart = new Chart(ctx, {
          type: 'bar',
          data: prepareChartData(),
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      };
  
      const updateChart = () => {
        if (chart) {
          chart.data = prepareChartData();
          chart.update();
        } else {
          createChart();
        }
      };
  
      updateChart();
  
      // Cleanup function
      return () => {
        if (chart) {
          chart.destroy();
          chart = null;
        }
      };
    }, [salesData, expensesData]);

    const date = new Date()
    const currentYear = date.getFullYear()
  
    return (
        <div style={{height:'400px'}}>
            <h6 style={{textAlign:'center'}}>Year: {currentYear}</h6>
            <canvas ref={chartRef} />
        </div>
    )
}

export default AnnualSalesVsExpensesAnalysis