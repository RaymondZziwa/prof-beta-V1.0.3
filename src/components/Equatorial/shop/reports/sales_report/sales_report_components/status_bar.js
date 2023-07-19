import TotalNumberOfShopSales from '../../reports_generic_components/sales_components/total_number_of_sales'
import TotalNumberOfMonthlyShopSales from '../../reports_generic_components/sales_components/total_monthly_sales'
import TotalAmountFromShopSales from '../../reports_generic_components/sales_components/overall_total_amount_from_sales'
import TotalMonthlyAmountFromShopSales from '../../reports_generic_components/sales_components/total_monthly_sales_amount'

const SalesStatusBar = ({ salesData }) => {
    return(
        <div style={{display:'flex', justifyContent:'space-between'}}>
                <TotalNumberOfShopSales salesData={salesData}/>
                <TotalNumberOfMonthlyShopSales salesData={salesData}/>
                <TotalAmountFromShopSales salesData={salesData}/> 
                <TotalMonthlyAmountFromShopSales salesData={salesData}/>
        </div>
    )
}

export default SalesStatusBar