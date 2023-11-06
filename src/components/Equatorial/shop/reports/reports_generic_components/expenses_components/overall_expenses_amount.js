import { useEffect, useState } from "react"

const OverallExpensesTotalAmount = ({ expensesData }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [expensesTotalAmount, setExpensesTotalAmount] = useState(0)

    useEffect(()=>{
        if(Array.isArray(expensesData)){
            setIsLoading(false)
            const totalAmountSum = expensesData.reduce((sum, obj) => sum + obj.expenditurecost, 0);
            setExpensesTotalAmount(totalAmountSum)
        }
    },[])

    return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Overall Expenses Total Amount</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{!isLoading && <p> UGX {expensesTotalAmount} </p> }</p>
        </span>
    )
}

export default OverallExpensesTotalAmount