import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const IndividualCategoryMonthlyExpenditureAnalysis = ({ expensesData }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);
  
    useEffect(() => {
      if (chartRef.current) {
        // Destroy previous chart instance
        chartRef.current.destroy();
      }
  
      // Get the current year
const currentYear = new Date().getFullYear();

// Filter the data based on the selected category and current year
const filteredData = expensesData.filter((item) => {
  const [day, month, year] = item.date.split('/');
  const expenseYear = parseInt(year);
  
  return (
    item.expenditurecategory === selectedCategory && expenseYear === currentYear
  );
});

// Group the data by month and calculate the total expenditure for each month
const groupedData = filteredData.reduce((acc, item) => {
  const date = item.date.split('/')[1]; // Extract month from the date (assuming format: DD/MM/YYYY)
  const month = parseInt(date, 10);

  if (acc[month]) {
    acc[month] += item.expenditurecost;
  } else {
    acc[month] = item.expenditurecost;
  }

  return acc;
}, {});
  
      // Prepare the chart data
      const labels = Object.keys(groupedData).map((month) => {
        const monthNames = [
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
          'December'
        ];
        return monthNames[parseInt(month, 10) - 1];
      });
  
      const data = Object.values(groupedData);
  
      setChartData({ labels, data });
    }, [expensesData, selectedCategory]);
  
    useEffect(() => {
      if (chartData) {
        // Create the line chart once chartData is available
        const ctx = document.getElementById('expenditureChart').getContext('2d');
  
        // Destroy previous chart instance if it exists
        if (chartRef.current) {
          chartRef.current.destroy();
        }
  
        // Create new chart instance
        const newChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: chartData.labels,
            datasets: [
              {
                label: 'Expenditure',
                data: chartData.data,
                backgroundColor: 'rgba(0, 123, 255, 0.4)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(0, 123, 255, 1)',
                pointHoverRadius: 6,
                pointHoverBackgroundColor: 'rgba(0, 123, 255, 1)'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
  
        // Save the chart instance to the ref
        chartRef.current = newChart;
      }
    }, [chartData]);
  
    useEffect(() => {
      // Destroy the chart instance when the component is unmounted
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, []);
  
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    return (
      <div style={{height:'400px'}}>
        <div style={{textAlign:'center'}}>
                            <select class="form-select" aria-label="Default select example" style={{ color: "#8CA6FE;" }} value={selectedCategory} onChange={handleCategoryChange}>
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
        <canvas id="expenditureChart"></canvas>
      </div>
    )
}

export default IndividualCategoryMonthlyExpenditureAnalysis