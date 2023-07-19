import { Line } from 'react-chartjs-2'

const MonthlySalesPerformanceAnalysis = ({ salesData }) => {
  const getSalesPerformanceByMonth = () => {
    // Get the current year
    const currentYear = new Date().getFullYear();
  
    // Initialize an array to hold the sales data for each month
    const salesByMonth = Array(12).fill(0);
  
    // Loop through the sales data and calculate the total sales for each month
    salesData.forEach((sale) => {
      const [day, month, year] = sale.saleDate.split('/');
      const saleDate = new Date(`${year}-${month}-${day}`);
      const saleYear = saleDate.getFullYear();
  
      // Check if the sale is from the current year
      if (saleYear === currentYear) {
        const monthIndex = saleDate.getMonth();
        const totalAmount = sale.totalAmount;
  
        // Add the total amount to the corresponding month's sales
        salesByMonth[monthIndex] += totalAmount;
      }
    });
  
    return salesByMonth;
  };

    // Get the sales performance by month
    const salesPerformanceByMonth = getSalesPerformanceByMonth()
    
    const chartData = {
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
          {
            label: 'Sales Performance',
            data: salesPerformanceByMonth,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      };
      
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Sales',
            },
          },
        },
      }

      const date = new Date()
      const currentYear = date.getFullYear()

    return (
        <div style={{height:'400px'}}>
            <h5 style={{textAlign:'center'}}>Year: {currentYear}</h5>
            <Line data={chartData} options={chartOptions} />
        </div>
    )
}

export default MonthlySalesPerformanceAnalysis