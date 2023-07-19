import { useEffect, useState } from "react"
import NumberCounter from "../support_components/number_counter"

const TotalNumberOfMonthlyShopSales = ({ salesData }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [numberOfMonthlySales, setNumberOfMonthlySales] = useState(0)

    useEffect(() => {
        if (salesData.length > 0) {
            setIsLoading(false)
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so adding 1
            const currentYear = currentDate.getFullYear();
            
            // Filter the sales made in the current month
            const salesInCurrentMonth = salesData.filter((sale) => {
                const [day, month, year] = sale.saleDate.split("/");
                const saleMonth = parseInt(month, 10);
                const saleYear = parseInt(year, 10);
                return saleMonth === currentMonth && saleYear === currentYear;
            });

          console.log('items', salesInCurrentMonth)
    
          setNumberOfMonthlySales(salesInCurrentMonth.length);
        }
      }, [salesData]);

    return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Total Number Of Monthly Sales</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{!isLoading && <NumberCounter targetValue={numberOfMonthlySales} duration='3000' />}</p>
        </span>
    )
}

export default TotalNumberOfMonthlyShopSales