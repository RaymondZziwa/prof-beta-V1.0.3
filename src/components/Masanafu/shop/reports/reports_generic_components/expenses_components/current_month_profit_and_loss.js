import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

const CurrentMonthProfitAndLoss = ({ salesData, expensesData }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [monthlyProfitLoss, setMonthlyProfitLoss] = useState(0);

    useEffect(() => {
        setIsLoading(false)
      // Get current month and year
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Note: January is 0-based
      const currentYear = currentDate.getFullYear();
  
      // Filter sales for the current month and year
      const filteredSales = salesData.filter((sale) => {
        const saleDateParts = sale.saleDate.split('/');
        const saleMonth = parseInt(saleDateParts[1], 10);
        const saleYear = parseInt(saleDateParts[2], 10);
        return saleMonth === currentMonth && saleYear === currentYear;
      });
  
      // Filter expenses for the current month and year
      const filteredExpenses = expensesData.filter((expense) => {
        const expenseDateParts = expense.date.split('/');
        const expenseMonth = parseInt(expenseDateParts[1], 10);
        const expenseYear = parseInt(expenseDateParts[2], 10);
        return expenseMonth === currentMonth && expenseYear === currentYear;
      });
  
      // Calculate total sales for the month
      const totalSales = filteredSales.reduce(
        (sum, sale) => sum + sale.totalAmount,
        0
      );
  
      // Calculate total expenses for the month
      const totalExpenses = filteredExpenses.reduce(
        (sum, expense) => sum + expense.expenditurecost,
        0
      );
  
      // Calculate monthly profit or loss
      const profitLoss = totalSales - totalExpenses;
  
      setMonthlyProfitLoss(profitLoss);
    }, [salesData, expensesData]);
  
    console.log(monthlyProfitLoss)
      return (
        <span style={{ borderRadius: '20px', textAlign: 'center', width: '300px', backgroundColor: 'white', boxShadow: '5px 5px #888888',marginRight:'20px' }}>
            <h3 style={{ padding: '10px', color: 'black' }}>
                {monthlyProfitLoss > 0 ? <span style={{color:'green'}}><FontAwesomeIcon icon={faArrowUp} /> Current Month Profit </span> : <span style={{color:'red'}}><FontAwesomeIcon icon={faArrowDown} /> Current Month Loss</span>}
            </h3>
            <p style={{ fontSize: '30px', color: '#29AB87' }}>{!isLoading && monthlyProfitLoss}</p>
        </span>
    );
}

export default CurrentMonthProfitAndLoss