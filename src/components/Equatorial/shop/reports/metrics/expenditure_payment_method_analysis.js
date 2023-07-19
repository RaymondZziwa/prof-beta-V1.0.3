import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { useState, useEffect } from "react";

const ExpenditurePaymentMethodAnalysis = ({ expensesData }) => {
  const [paymentMethods, setPaymentMethods] = useState({});

  useEffect(() => {
    // Extract payment methods and their frequencies
    const methods = {};
    expensesData.forEach(item => {
      const paymentMethod = item.paymentmethod;
      if (methods.hasOwnProperty(paymentMethod)) {
        methods[paymentMethod]++;
      } else {
        methods[paymentMethod] = 1;
      }
    });
    setPaymentMethods(methods);
  }, [expensesData]);

  // Prepare data for the pie chart
  const labels = Object.keys(paymentMethods);
  const values = Object.values(paymentMethods);

  // Define colors for the pie slices
  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
      },
    ],
  }

  // Define the chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{height:'400px'}}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  )
}

export default ExpenditurePaymentMethodAnalysis