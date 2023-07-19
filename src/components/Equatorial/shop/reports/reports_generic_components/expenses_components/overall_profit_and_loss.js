import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

const OverallProfitAndLossStatus = ({ salesData, expensesData }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [profitOrLoss, setProfitOrLoss] = useState(0);

    useEffect(() => {
        // Calculate total sales
        const totalSales = salesData.reduce(
            (sum, sale) => sum + sale.totalAmount,
            0
        );

        // Calculate total expenses
        const totalExpenses = expensesData.reduce(
            (sum, expense) => sum + expense.expenditurecost,
            0
        );

        setProfitOrLoss(totalSales - totalExpenses);
        setIsLoading(false);
    }, [salesData, expensesData]);

    return (
        <span style={{ borderRadius: '20px', textAlign: 'center', width: '300px', backgroundColor: 'white', boxShadow: '5px 5px #888888',marginRight:'20px' }}>
            <h3 style={{ padding: '10px', color: 'black' }}>
                {profitOrLoss > 0 ? <span style={{color:'green'}}><FontAwesomeIcon icon={faArrowUp} /> Overall Profit </span> : <span style={{color:'red'}}><FontAwesomeIcon icon={faArrowDown} /> Overall Loss</span>}
            </h3>
            <p style={{ fontSize: '30px', color: '#29AB87' }}>{!isLoading && profitOrLoss}</p>
        </span>
    );
}

export default OverallProfitAndLossStatus