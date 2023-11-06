import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

const ExpenditureCategoryAnalysis = ({ expensesData }) => {
    // Extracting expenditure categories and their counts from the data
    const categories = expensesData.map(item => item.expenditurecategory);
    const categoryCounts = {};
    categories.forEach(category => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    // Formatting data for the pie chart
    const chartData = {
        labels: Object.keys(categoryCounts),
        datasets: [
        {
            data: Object.values(categoryCounts),
            backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            ],
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

export default ExpenditureCategoryAnalysis