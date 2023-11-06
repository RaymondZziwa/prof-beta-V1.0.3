import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

const PaymentModeAnalysisPieChart = ({ salesData }) => {
  //const [paymentMethods, setPaymentMethods] = useState({});

  const paymentMethods = salesData.map((obj) => obj.paymentMethod)
  const paymentMethodCounts = paymentMethods.reduce((counts, method) => {
    counts[method] = (counts[method] || 0) + 1;
    return counts;
  }, {});

  const paymentMethodLabels = Object.keys(paymentMethodCounts);
  const paymentMethodData = Object.values(paymentMethodCounts);

  // Define the chart data
  const chartData = {
    labels: paymentMethodLabels,
    datasets: [
      {
        data: paymentMethodData,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#81D8D0'
          // Add more colors if needed
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#81D8D0'
          // Add more colors if needed
        ],
      },
    ],
  };

  // Define the chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{height:'400px'}}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );

};

export default PaymentModeAnalysisPieChart;
