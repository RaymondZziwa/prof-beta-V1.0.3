import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

const ExpenditurePaymentStatusAnalysis = ({ expensesData }) => {
     // Extract payment status values from the data
  const paymentStatusValues = expensesData.map(item => item.paymentstatus);

  // Count the occurrences of each payment status
  const paymentStatusCount = paymentStatusValues.reduce((count, status) => {
    count[status] = (count[status] || 0) + 1;
    return count;
  }, {});

  // Prepare data for the pie chart
  const chartData = {
    labels: Object.keys(paymentStatusCount),
    datasets: [
      {
        data: Object.values(paymentStatusCount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Customize colors as needed
      },
    ],
  }

  // Custom options for the pie chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
    position: 'bottom',
    },
  }

  return (
    <div style={{height:'400px'}}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  )
}

export default ExpenditurePaymentStatusAnalysis