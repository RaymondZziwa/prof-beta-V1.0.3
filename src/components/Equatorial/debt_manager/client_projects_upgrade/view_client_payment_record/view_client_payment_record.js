import { useEffect, useState } from "react"
import axios from "axios"

const ViewClientPaymentRecords = ({orderId}) => {
    const [paymentRecords, setPaymentRecords] = useState([])

    useEffect(()=>{
        const fetchPaymentRecords = async () => {
            let res = await axios.post('http://82.180.136.230:3005/fetchclientprojectspayment',{
                token: localStorage.getItem('token')
            })

            if(Array.isArray(res.data) && orderId){
                const filteredRecords = res.data.filter((record)=>
                    record.orderId === orderId
                )
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
                                        <th scope="col">Order Id</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Units</th>
                                        <th scope="col">Amount Paid (UGX)</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Transaction Id</th>
                                        <th scope="col">Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { paymentRecords && paymentRecords.length > 0 ? (
                                        paymentRecords.map((item) => (
                                        <tr key={item.orderId}>
                                            <td>{item.paymentDate}</td>
                                            <td>{item.orderId}</td> 
                                            <td>{item.itemName}</td> 
                                            <td>{item.Quantity}</td> 
                                            <td>{item.Units}</td> 
                                            <td>{item.amountPaid}</td>
                                            <td>{item.paymentmethod}</td>
                                            <td>{item.transactionId}</td>
                                            <td>{item.notes}</td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='15'>No client payment data....</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
        </>
    )
}

export default ViewClientPaymentRecords