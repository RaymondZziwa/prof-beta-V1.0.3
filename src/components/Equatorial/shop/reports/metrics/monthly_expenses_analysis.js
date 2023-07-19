import { Line } from 'react-chartjs-2'

const MonthlyExpensesAnalysis = ({ expensesData }) => {
  const getExpensesPerformanceByMonth = () => {
    // Get the current year
    const currentYear = new Date().getFullYear();
  
    // Initialize an array to hold the expenses data for each month
    const expensesByMonth = Array(12).fill(0);
  
    // Loop through the expenses data and calculate the total expenses for each month
    expensesData.forEach((expense) => {
      const [day, month, year] = expense.date.split('/');
      const expenseYear = parseInt(year);
  
      // Check if the expense is from the current year
      if (expenseYear === currentYear) {
        const expenseDate = new Date(`${year}-${month}-${day}`);
        const monthIndex = expenseDate.getMonth();
        const totalAmount = expense.expenditurecost;
  
        // Add the total amount to the corresponding month's expenses
        expensesByMonth[monthIndex] += totalAmount;
      }
    });
  
    return expensesByMonth;
  }

    // Get the sales performance by month
    const salesPerformanceByMonth = getExpensesPerformanceByMonth()
    
    const chartData = {
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
          {
            label: 'Total Monthly Expenditure Cost',
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
              text: 'Expenditure Amount',
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

export default MonthlyExpensesAnalysis