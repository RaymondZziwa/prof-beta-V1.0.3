import { useEffect, useState } from "react"
import axios from "axios"

const ViewPaymentRecords = ({supplyId}) => {
    const [paymentRecords, setPaymentRecords] = useState([])

    useEffect(()=>{
        const fetchPaymentRecords = async () => {
            let res = await axios.post('http://82.180.136.230:3005/fetchallsupplierpaymentrecords',{
                token: localStorage.getItem('token')
            })

            if(Array.isArray(res.data) && supplyId){
                const filteredRecords = res.data.filter((record)=>
                    record.supplyId === supplyId
                )
                console.log(filteredRecords)
                setPaymentRecords(filteredRecords)
            }
        }

        fetchPaymentRecords()
    },[])
    return(
        <>
            <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                                <thead style={{ textAlign: 'center' }}>
                                    <tr>
                                        <th scope="col">Payment Date</th>
                                        <th scope="col">Supply Id</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Units</th>
                                        <th scope="col">Amount Paid(UGX)</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Transaction Id</th>
                                        <th scope="col">Cheque Number</th>
                                        <th scope="col">Paid By</th>
                                        <th scope="col">Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { paymentRecords && paymentRecords.length > 0 ? (
                                        paymentRecords.map((item) => (
                                        <tr key={item.supplyId}>
                                            <td>{item.paymentDate}</td>
                                            <td>{item.supplyId}</td> 
                                            <td>{item.itemName}</td> 
                                            <td>{item.Quantity}</td> 
                                            <td>{item.Units}</td> 
                                            <td>{item.amountPaid}</td>
                                            <td>{item.paymentmethod}</td>
                                            <td>{item.transactionId}</td>
                                            <td>{item.chequenumber}</td>
                                            <td>{item.PaidBy}</td>
                                            <td>{item.notes}</td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='15'>No supplier payment data....</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
        </>
    )
}

export default ViewPaymentRecords