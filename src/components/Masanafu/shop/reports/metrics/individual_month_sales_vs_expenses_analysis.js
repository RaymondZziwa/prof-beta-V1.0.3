import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const IndividualMonthSalesVsExpenditureAnalysis = ({ salesData, expensesData }) => {
  const chartContainerRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [chart, setChart] = useState(null);

  useEffect(() => {
    // Filter sales and expenses data based on the selected month
    const filteredSalesData = salesData.filter(sale => {
      const saleMonth = new Date(sale.saleDate).getMonth() + 1;
      return saleMonth.toString() === selectedMonth;
    });

    const filteredExpensesData = expensesData.filter(expense => {
      const expenseMonth = new Date(expense.date).getMonth() + 1;
      return expenseMonth.toString() === selectedMonth;
    });

    // Prepare the data for the chart
    const chartLabels = [];
    const salesAmounts = [];
    const expensesAmounts = [];

    // Create an array with the days of the selected month
    const daysInMonth = new Date(
      new Date().getFullYear(),
      selectedMonth - 1,
      0
    ).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const day = i.toString().padStart(2, '0');
      const month = selectedMonth.toString().padStart(2, '0');
      chartLabels.push(`${day}/${month}`);
    }

    // Calculate the total sales amount for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const salesOfDay = filteredSalesData.filter(sale => {
        const saleDay = new Date(sale.saleDate).getDate();
        return saleDay === i;
      });

      const salesAmountOfDay = salesOfDay.reduce(
        (total, sale) => total + sale.totalAmount,
        0
      );

      salesAmounts.push(salesAmountOfDay);
    }

    // Calculate the total expenses amount for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const expensesOfDay = filteredExpensesData.filter(expense => {
        const expenseDay = new Date(expense.date).getDate();
        return expenseDay === i;
      });

      const expensesAmountOfDay = expensesOfDay.reduce(
        (total, expense) => total + expense.amountspent,
        0
      );

      expensesAmounts.push(expensesAmountOfDay);
    }

    // Destroy the previous chart instance
    if (chart) {
      chart.destroy();
    }

    // Create the chart
    const ctx = chartContainerRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Sales',
            data: salesAmounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Expenses',
            data: expensesAmounts,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChart(newChart);

    // Cleanup function to destroy the chart before unmounting
    return () => {
      newChart.destroy();
    };
  }, [selectedMonth, salesData, expensesData]);

  const handleMonthChange = event => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="">Select a month</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <canvas ref={chartContainerRef} />
    </div>
  );
};

export default IndividualMonthSalesVsExpenditureAnalysis;
