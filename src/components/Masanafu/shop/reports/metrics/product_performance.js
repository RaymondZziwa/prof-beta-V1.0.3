import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

const ProductPerformance = ({ salesData }) => {
    //const [chartData, setChartData] = useState({});
    // Create a map to track the total amount made from each product
    const productMap = new Map();

    salesData.forEach((obj) => {
      const itemsSoldArray = JSON.parse(obj.itemsSold);

      itemsSoldArray.forEach((item) => {
        const { name, totalCost } = item;

        // Update the total amount for each product in the map
        if (productMap.has(name)) {
          const currentTotal = productMap.get(name);
          productMap.set(name, currentTotal + totalCost);
        } else {
          productMap.set(name, totalCost);
        }
      });
    });

    // Sort the map entries based on the total amount in descending order
    const sortedProducts = [...productMap.entries()].sort(
      (a, b) => b[1] - a[1]
    );

    // Extract labels and data for the chart
    const labels = sortedProducts.map(([name]) => name);
    const data = sortedProducts.map(([_, totalAmount]) => totalAmount)

            //   'rgba(255, 99, 132, 0.6)',
            //   'rgba(54, 162, 235, 0.6)',
            //   'rgba(255, 206, 86, 0.6)',
            //   'rgba(75, 192, 192, 0.6)',
            //   'rgba(153, 102, 255, 0.6)',
            //   'rgba(255, 159, 64, 0.6)'
    // Create the chart data
      // Define the chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#81D8D0',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
          // Add more colors if needed
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#81D8D0',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
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

}

export default ProductPerformance