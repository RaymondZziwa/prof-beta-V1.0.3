import { useState } from "react"
import { Line } from 'react-chartjs-2'

const IndividualMonthSalesPerformanceAnalysis = ({ salesData }) => {
    const [selectedMonth, setSelectedMonth] = useState('')

    const months = Array.from(
        new Set(salesData.map((sale) => {
          const [day, month, year] = sale.saleDate.split('/');
          return parseInt(month);
        }))
    ).sort()
    
    const filteredSalesData = salesData.filter((sale) => {
        const [day, month, year] = sale.saleDate.split('/');
        const saleYear = parseInt(year);
        const currentYear = new Date().getFullYear();
        
        return saleYear === currentYear && parseInt(month) === parseInt(selectedMonth);
      })

    const monthNames = Array.from({ length: 12 }, (_, index) =>
        new Date(0, index).toLocaleString('default', { month: 'long' })
    )

    const uniqueDays = [...new Set(filteredSalesData.map((sale) => {
        const [day, month, year] = sale.saleDate.split('/');
        return day;
      }))];

    const chartData = {
        labels: uniqueDays,
        datasets: [
          {
            label: 'Total Sales',
            data: uniqueDays.map((day) => {
                const salesForDay = filteredSalesData.filter((sale) => {
                  const [saleDay, month, year] = sale.saleDate.split('/');
                  return saleDay === day;
                });
                const totalAmount = salesForDay.reduce((sum, sale) => sum + sale.totalAmount, 0);
                return totalAmount;
              }),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
    }

    const renderDropdown = (
        <select class="form-select" aria-label="Default select example" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Select a month</option>
            {months.map((month) => (
                <option key={month} value={month}>
                    {monthNames[month - 1]}
                </option>
            ))}
        </select>
    )

    const renderLineGraph = (
        <Line data={chartData} options={{ responsive: true }} />
    )


    const date = new Date()
    const currentYear = date.getFullYear()

    return (
        <div style={{height:'400px'}}>
          <h5 style={{textAlign:'center'}}>Year: {currentYear}</h5>
          <p style={{textAlign:'center'}}>{renderDropdown}</p>
          {selectedMonth && renderLineGraph}
        </div>
    )
}

export default IndividualMonthSalesPerformanceAnalysis