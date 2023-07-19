import { useEffect, useState } from "react"

const MonthlyExpensesAmount = ({ expensesData }) => {
    const [monthlyExpensesAmount, setMonthlyExpensesAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (expensesData.length > 0) {
            setIsLoading(false);
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so adding 1
            const currentYear = currentDate.getFullYear();
            
            // Filter the expenses incurred in the current month
            const expensesInCurrentMonth = expensesData.filter((expense) => {
                const [day, month, year] = expense.date.split("/");
                const expenseMonth = parseInt(month, 10);
                const expenseYear = parseInt(year, 10);
                return expenseMonth === currentMonth && expenseYear === currentYear;
            });

          console.log('items', expensesInCurrentMonth)
      
          const totalAmountSum = expensesInCurrentMonth.reduce((sum, obj) => sum + obj.expenditurecost, 0)
          console.log('test', totalAmountSum)
          setMonthlyExpensesAmount(totalAmountSum);
        }
      }, [expensesData]);

      return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Current Month Total Expenses</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{(!isLoading && monthlyExpensesAmount > 0) && <p> UGX {monthlyExpensesAmount} </p>}</p>
        </span>
      )

}

export default MonthlyExpensesAmount