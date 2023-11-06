import TotalAmountFromShopSales from '../../reports_generic_components/sales_components/overall_total_amount_from_sales'
import TotalMonthlyAmountFromShopSales from '../../reports_generic_components/sales_components/total_monthly_sales_amount'
import OverallExpensesTotalAmount from "../../reports_generic_components/expenses_components/overall_expenses_amount"
import MonthlyExpensesAmount from "../../reports_generic_components/expenses_components/monthly_expenses_amount"

const SalesVExpenditureStatusBar = ({ salesData, expensesData }) => {
    return(
        <div style={{display:'flex', justifyContent:'space-between'}}>
              <TotalAmountFromShopSales salesData={salesData}/> 
              <TotalMonthlyAmountFromShopSales salesData={salesData}/> 
              <OverallExpensesTotalAmount expensesData={expensesData}/>
              <MonthlyExpensesAmount expensesData={expensesData} /> 
        </div>
    )
}

export default SalesVExpenditureStatusBar