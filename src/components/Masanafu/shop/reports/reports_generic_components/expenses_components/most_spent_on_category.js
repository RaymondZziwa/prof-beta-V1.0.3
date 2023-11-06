import { useEffect, useState } from "react"

const MostSpentOnExpenseCategory = ({ expensesData }) => {
    const [mostSpentCategory, setMostSpentCategory] = useState('')
    const [highestAmountSpent, setHighestAmountSpent] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Calculate the expenditure category with the highest amount spent
        if (expensesData.length > 0) {
            setIsLoading(false)
          const expenditureTotals = expensesData.reduce((totals, entry) => {
            const category = entry.expenditurecategory;
            const amountSpent = entry.amountspent;
    
            if (totals.hasOwnProperty(category)) {
              totals[category] += amountSpent;
            } else {
              totals[category] = amountSpent;
            }
    
            return totals;
          }, {});
    
          let maxSpentCategory = '';
          let maxAmountSpent = 0;
    
          for (const category in expenditureTotals) {
            if (expenditureTotals[category] > maxAmountSpent) {
              maxAmountSpent = expenditureTotals[category];
              maxSpentCategory = category;
            }
          }
    
          setMostSpentCategory(maxSpentCategory);
          setHighestAmountSpent(maxAmountSpent);
        }
      }, [expensesData])
      return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Most Spent On Category</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{(!isLoading && highestAmountSpent > 0) && <p> {mostSpentCategory} <br></br> UGX: {highestAmountSpent}</p>}</p>
        </span>
      )
}

export default MostSpentOnExpenseCategory