import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const IndividualMonthAndCategoryAnalysis = ({ expensesData }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    // Filter the data based on the selected category and month
    const filteredData = expensesData.filter(
      entry =>
        entry.expenditurecategory === selectedCategory &&
        entry.date.slice(-7) === selectedMonth
    );

    // Extract the day and expenditure cost from the filtered data
    const chartLabels = filteredData.map(entry => entry.date.slice(0, 2));
    const chartData = filteredData.map(entry => entry.expenditurecost);

    // Create a chart using the filtered data
    const ctx = document.getElementById('lineGraph').getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: `Expenditure in ${selectedCategory} for ${selectedMonth}`,
            data: chartData,
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Day',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Expenditure',
            },
          },
        },
      },
    });

    // Save the chart instance to the ref
    chartRef.current = newChart;

    // Clean up the chart when the component is unmounted
    return () => {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
    };
  }, [selectedCategory, selectedMonth, expensesData]);

  const generateMonthOptions = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const options = [];

    for (let month = 1; month <= 12; month++) {
      const formattedMonth = month.toString().padStart(2, '0');
      const monthOption = `${formattedMonth}/${currentYear}`;
      options.push(
        <option key={monthOption} value={monthOption}>
          {`${formattedMonth}/${currentYear}`}
        </option>
      );
    }

    return options;
  }

  return (
    <div> 
      <div style={{textAlign:'center'}}>
             <select class="form-select" aria-label="Default select example" style={{ color: "#8CA6FE;" }} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option defaultValue>Select Expenditure Category</option>
                <option value="utilities">Utilities</option>
                <option value="miscellaneous expenses">Miscellaneous Expenses</option>
                <option value="transaction fees">Transaction Fees</option>
                <option value="professional services">Professional Services</option>
                <option value="shop licenses/permits">Licenses and Permits</option>
                <option value="product transportation and delivery">Transportation and Delivery</option>
                <option value="shop maintenance">Maintenance and Repairs</option>
                <option value="shop insurance">Insurance</option>
                <option value="Shop supplies and materials">Supplies and Materials</option>
                <option value="shop equipment">Equipment and Fixtures</option>
                <option value="advertising">Marketing and Advertising</option>
                <option value="rent">Rent or Lease</option>
                <option value="employee wages">Employee Wages</option>
            </select>
        </div>
        <div style={{textAlign:'center'}}>
             <select class="form-select" aria-label="Default select example" style={{ color: "#8CA6FE;" }} value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                <option value="">Select Months</option>
                {generateMonthOptions()}
            </select>
        </div>
      <canvas id="lineGraph" width="400" height="200"></canvas>
    </div>
  )
};

export default IndividualMonthAndCategoryAnalysis
