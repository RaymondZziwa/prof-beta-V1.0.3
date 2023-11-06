import OverallExpensesTotalAmount from "../../reports_generic_components/expenses_components/overall_expenses_amount"
import MonthlyExpensesAmount from "../../reports_generic_components/expenses_components/monthly_expenses_amount"
import MostSpentOnExpenseCategory from "../../reports_generic_components/expenses_components/most_spent_on_category"

const ExpensesStatusBar = ({ expensesData }) => {
    return(
        <div style={{display:'flex', justifyContent:'space-between'}}>
              <OverallExpensesTotalAmount expensesData={expensesData}/>
              <MonthlyExpensesAmount expensesData={expensesData} />
              <MostSpentOnExpenseCategory expensesData={expensesData}/>
        </div>
    )
}

export default ExpensesStatusBar