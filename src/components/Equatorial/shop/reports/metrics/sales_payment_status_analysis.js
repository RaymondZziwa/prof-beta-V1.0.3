import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

const SalesPaymentStatusAnalysis = ({ salesData }) => {

    const paymentStatus = salesData.map((obj) => obj.paymentStatus)
    const paymentStatusCounts = paymentStatus.reduce((counts, status) => {
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {});
  
    const paymentStatusLabels = Object.keys(paymentStatusCounts);
    const paymentStatusData = Object.values(paymentStatusCounts);
  
    // Define the chart data
    const chartData = {
      labels: paymentStatusLabels,
      datasets: [
        {
          data: paymentStatusData,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#81D8D0'
            // Add more colors if needed
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#81D8D0'
            // Add more colors if needed
          ],
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

export default SalesPaymentStatusAnalysis