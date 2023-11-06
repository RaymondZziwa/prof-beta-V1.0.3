import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { useEffect, useState } from 'react';
import axios from 'axios';

const EquatorialProjectsClientPaymentPlan = () => {
    const [receiptNumber, setReceiptNumber] = useState()
    const [receiptData, setReceiptData] = useState({})
    const [paymentPeriod, setPaymentPeriod] = useState(0)
    const [paymentData, setPaymentData] = useState([])
    const [status, setStatus] = useState('')

    const receiptNumberHandler = event => {
        event.preventDefault();
        setReceiptNumber(event.target.value)
    }

    const paymentPeriodHandler = event => {
        event.preventDefault();
        setPaymentPeriod(event.target.value)
    }
  
    const fetchReceiptData = async (e) => {
        e.preventDefault();
        let res = await axios.post('http://82.180.136.230:3005/fetchequatorialprojectsreceiptdata',{
            token: localStorage.getItem('token'),
            receiptNumber: receiptNumber
        })
        console.log(res.data)
        setReceiptData(res.data[0])
    } 

    useEffect(()=>{
        const generatePaymentData = () => {
            const numberOfMonths = parseInt(paymentPeriod, 10);
            const initialBalance = receiptData.balance
            const paymentAmount = Math.ceil(initialBalance / numberOfMonths);
      
            const generatedPaymentData = [];
            let remainingBalance = initialBalance;
            for (let i = 0; i < numberOfMonths; i++) {
              const payment = {
                paymentDate: getPaymentDate(i),
                amountToBePaid: paymentAmount,
                balanceAfterPayment: remainingBalance - paymentAmount,
              };
              generatedPaymentData.push(payment);
              remainingBalance -= paymentAmount;
            }
      
            setPaymentData(generatedPaymentData);
          };
      
          const getPaymentDate = (monthIndex) => {
            const currentDate = new Date();
            const paymentDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + monthIndex,
              currentDate.getDate()
            );
            return paymentDate.toLocaleDateString();
          };
      
          generatePaymentData();
    },[paymentPeriod])

    const saveClientPaymentPlan = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/saveclientpaymentplan',{
            token: localStorage.getItem('token'),
            receiptNumber: receiptNumber,
            paymentPlan: JSON.stringify(paymentData)
        })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
    }
  
    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <Col sm='12' md='8' lg='8' xl='8' style={{marginTop: '60px'}}>
                <h2 style={{textAlign:'center'}}>Projects Client Payment Plan</h2>
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
                        <h4 style={{textAlign:'center'}}>Balance Payment Scheduler</h4>
                        <div className="mb-3">
                            <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={paymentPeriodHandler}>
                                <option defaultValue>Payment Period In Months</option>
                                {[...Array(48)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>{index + 1} Months</option>
                                ))}
                            </select>
                        </div>
                        <table className="table table-light">
                                <thead>
                                        <tr>
                                            <th>Next Payment Date</th>
                                            <th>Amount To Be Paid (UGX)</th>
                                            <th>Balance After Payment (UGX)</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {paymentData.map((payment, index) => (
                                    <tr key={index}>
                                        <td>{payment.paymentDate}</td>
                                        <td>{payment.amountToBePaid}</td>
                                        <td>{payment.balanceAfterPayment}</td>
                                    </tr>
                                    ))}
                                </tbody>
                        </table>
                        <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px', marginBottom:'20px' }} onClick={saveClientPaymentPlan}>Save Client Payment Plan</button>
                    </Col>
                </Row>
            </Col>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}

export default EquatorialProjectsClientPaymentPlan