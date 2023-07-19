import { useEffect, useState } from "react"

const TotalMonthlyAmountFromShopSales = ({ salesData }) => {
    const [monthlyAmountFromSales, setMonthlyAmountFromSales] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    
      useEffect(() => {
        if (salesData.length > 0) {
            setIsLoading(false);
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
      
          const totalAmountSum = salesInCurrentMonth.reduce((sum, obj) => sum + obj.totalAmount, 0)
          console.log('ttt', totalAmountSum)
          setMonthlyAmountFromSales(totalAmountSum);
        }
      }, [salesData]);
      
    return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Current Month Total Amount From Sales</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{(!isLoading && monthlyAmountFromSales > 0) && <p> UGX {monthlyAmountFromSales} </p>}</p>
        </span>
    )
}

export default TotalMonthlyAmountFromShopSales