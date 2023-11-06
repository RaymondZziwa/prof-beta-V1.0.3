import OverallProfitAndLossStatus from "../../reports_generic_components/expenses_components/overall_profit_and_loss"
import CurrentMonthProfitAndLoss from "../../reports_generic_components/expenses_components/current_month_profit_and_loss"

const ProfitAndLossStatusBar = ({ salesData , expensesData }) => {
    return(
        <div style={{display:'flex', justifyContent:'center'}}>
                    <OverallProfitAndLossStatus salesData={salesData} expensesData={expensesData} />
                    <CurrentMonthProfitAndLoss salesData={salesData} expensesData={expensesData} />
        </div>
    )
}

export default ProfitAndLossStatusBar