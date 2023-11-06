import { useEffect, useState } from "react"

const TotalAmountFromShopSales = ({ salesData }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [amountFromSales, setAmountFromSales] = useState(0)

    useEffect(()=>{
        if(Array.isArray(salesData)){
            setIsLoading(false)
            const totalAmountSum = salesData.reduce((sum, obj) => sum + obj.totalAmount, 0);
            setAmountFromSales(totalAmountSum)
        }
    },[])

    return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Overall Total Amount From Sales</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{!isLoading && <p> UGX {amountFromSales} </p> }</p>
        </span>
    )
}

export default TotalAmountFromShopSales