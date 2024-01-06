import axios from 'axios'
import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from "react-bootstrap"
import { useEffect, useState } from 'react';

const EquatorialProjectsReceiptsClientPaymentStatus = () => {
    const [receiptNumber, setReceiptNumber] = useState()
    const [receiptData, setReceiptData] = useState({})
    const [paymentPlan, setPaymentPlan] = useState([])
    const [status, setStatus] = useState('')
    const [date, setDate] = useState()

    const [notes, setNotes] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [amount, setAmount] = useState(0)

    const receiptNumberHandler = event => {
        event.preventDefault();
        setReceiptNumber(event.target.value)
    }

    const fetchReceiptData = async (e) => {
        e.preventDefault();
        let res = await axios.post('http://82.180.136.230:3005/fetchprojectsclientpaymentplans',{
            token: localStorage.getItem('token'),
            receiptNumber: receiptNumber
        })

        setReceiptData(res.data[0])
    } 

    useEffect(()=>{
        const today = new Date(); // Create a new Date object representing the current date
        const day = today.getDate(); // Get the current day of the month (1-31)
        const month = today.getMonth() + 1; // Get the current month (0-11, hence adding 1)
        const year = today.getFullYear(); // Get the current year (e.g., 2023)

        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
        setDate(formattedDate)
    },[])

    useEffect(()=> {
        if(receiptData && typeof receiptData.paymentPlan === "string" ){
            setPaymentPlan(receiptData.paymentPlan)
        }
    },[receiptData])

    const amountPaidHandler = event => {
        event.preventDefault()
        setAmount(event.target.value)
    }

    const paymentMethodHandler = event => {
        event.preventDefault()
        setPaymentMethod(event.target.value)
    }

    const notesHandler = event => {
        event.preventDefault()
        setNotes(event.target.value)
    }


    const saveClientPayment = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/saveclientpayment',{
            token: localStorage.getItem('token'),
            receiptNumber: receiptNumber,
            paymentdate: date,
            notes: notes,
            paymentMethod: paymentMethod,
            amountPaid: amount
        })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
    }

    return(
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='9' lg='9' xl='9' style={{marginTop:'60px'}}>
                        <h2 style={{textAlign:'center'}}>Projects Receipts Payment Status</h2>
                        <Row>
                    <Row style={{marginBottom:'20px'}}>
                        <div className="col-sm-8">
                            <div className="form-floating mb-6">
                                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE", width:'550px' }} onChange={receiptNumberHandler} required/>
                                <label htmlFor="floatingInput">Enter Receipt Number</label>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-primary" style={{ display: 'inline-block' }} onClick={fetchReceiptData}>Retrieve Receipt Data</button>
                        </div>
                        {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                        {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                    </Row>


                    <Col sm='12' md='3' lg='3' xl='3'>
                        <h4 style={{textAlign:'center'}}>Client Information</h4>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }}  value={receiptData.customerNames} readOnly />
                            <label htmlFor="floatingInput">Client's Names</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={receiptData.customerContact} readOnly />
                            <label htmlFor="floatingInput">Client's Contact</label>
                        </div>
                        
                        <h4 style={{textAlign:'center'}}>Receipt Payment Information</h4>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={receiptData.saleDate} readOnly />
                            <label htmlFor="floatingInput">Sale Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={receiptData.paymentStatus} readOnly />
                            <label htmlFor="floatingInput">Receipt Payment Status</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={receiptData.totalAmount} readOnly />
                            <label htmlFor="floatingInput">Total Receipt Amount</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={receiptData.totalAmount-receiptData.balance | null} readOnly />
                            <label htmlFor="floatingInput">Total Amount Paid</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={receiptData.balance} readOnly />
                            <label htmlFor="floatingInput">Total Balance</label>
                        </div>
                    </Col>
                    <Col sm='12' md='1' lg='1' xl='1'>
                    </Col>
                    <Col sm='12' md='7' lg='7' xl='7' style={{marginLeft:'20px'}}>
                        <h4 style={{textAlign:'center'}}>Items Attached To Receipt</h4>
                        <table className="table table-light">
                                <thead>
                                        <tr>
                                        <th>Item Name</th>
                                        <th>Quantity Sold</th>
                                        <th>Unit Cost (UGX)</th>
                                        <th>Discount (%)</th>
                                        <th>Total Cost (UGX)</th>
                                        </tr>
                                </thead>
                                { typeof receiptData.itemsSold === "string" ? JSON.parse(receiptData.itemsSold).map((item) => (
                                            <>
                                                <tbody>
                                                <tr key={item.id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.unitCost}</td>
                                                    <td>{item.discount}</td>
                                                    <td>{item.totalCost}</td>
                                                </tr>
                                                </tbody>
                                            </>
                                        )): <tbody> <tr><td colSpan="5" style={{ textAlign: "center" }}>No Items</td></tr> </tbody>}
                        </table>
                        <h4 style={{textAlign:'center'}}>Client Payment Plan</h4>
                        <table className="table table-light">
                                <thead>
                                        <tr>
                                            <th>Payment Date</th>
                                            <th>Amount To Be Paid (UGX)</th>
                                            <th>Balance After Payment (UGX)</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {paymentPlan && (() => {
                                try {
                                    const parsedPaymentPlan = JSON.parse(paymentPlan);
                                    if (Array.isArray(parsedPaymentPlan)) {
                                    return parsedPaymentPlan.map((payment, index) => (
                                        <tr key={index}>
                                        <td>{payment.paymentDate}</td>
                                        <td>{payment.amountToBePaid}</td>
                                        <td>{payment.balanceAfterPayment}</td>
                                        </tr>
                                    ));
                                    }
                                } catch (error) {
                                    console.error('Error parsing JSON:', error);
                                }
                                return null;
                                })()}
                                </tbody>
                        </table>
                        <Row style={{marginBottom:'20px'}}>
                        <div className="col-sm-8" style={{ display: "flex", gap: "10px" }}>
                            <div className="form-floating mb-6">
                                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE"}} required value={date} readOnly/>
                                <label htmlFor="floatingInput">Date</label>
                            </div>
                            <div className="form-floating mb-6">
                                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE"}} required onChange={amountPaidHandler}/>
                                <label htmlFor="floatingInput">Amount Paid (UGX)</label>
                            </div>
                        </div>
                        <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE", marginTop:'10px' }} onChange={paymentMethodHandler} required>
                            <option selected>Payment Method</option>
                            <option value='Cash'>Cash</option>    
                            <option value='Airtel Money'>Airtel Money</option>
                            <option value='MTN MoMo'>MTN MoMo</option>
                            <option value='Prof MM'>Prof Mobile Money</option>      
                        </select>
                        <div className="mb-3">
                         <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="Notes" style={{ color: "#8CA6FE", height: '130px', width: '300px' , marginTop:'10px'}} onChange={notesHandler}/>
                        </div>
                        </Row>
                        <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px', marginBottom:'20px' }} onClick={saveClientPayment}>Save Client Payment</button>
                        </Col>
                    </Row>
                    </Col>
                    <Col sm='12' md='2' lg='2' xl='2'>
                        <Navbar />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default EquatorialProjectsReceiptsClientPaymentStatus