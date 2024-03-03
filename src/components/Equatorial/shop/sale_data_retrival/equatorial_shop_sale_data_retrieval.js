import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import Logo from '../../../../imgs/logo.png'
import ReactToPrint from "react-to-print";

class PrintableContent extends React.Component {
    render() {
      const { firstName, lastName, cart, clientcontact, total,balance, amountPaid, receiptNumber, paymentMethod, transactionId, saleDate} = this.props;
      const today = new Date();
        const options = { dateStyle: 'short', timeStyle: 'short' };
        const formattedDateTime = new Intl.DateTimeFormat(undefined, options).format(today)
      return (
        <div style={{color:'black',padding:'20px'}}>
          <h1 style={{textAlign:'center'}}> <img src={Logo} alt="receipt-logo" style={{margin:'auto'}}  height='80px'/><br></br>Prof-bioresearch {localStorage.getItem('branch')} massage receipt</h1>
          <h5 style={{textAlign:'center'}}>Sales Points: Equatorial near bank of Africa, Masanafu near padre pio vocational school</h5>
          <h5 style={{textAlign:'center'}}>Web: www.profbioresearch.net</h5>
          <h5 style={{textAlign:'center'}}>Email: profbioresearch@gmail.com</h5>
          <h5 style={{textAlign:'center',borderBottom:'1px dashed black'}}>Contact: 0702061652 / 0779519652</h5>
          <p style={{marginTop:'40px'}}>Date: {formattedDateTime}</p>
          <p>Original Sale Date: {saleDate}</p>
          <p>Receipt Number: {receiptNumber}</p>
          <p>Client Names: {firstName} {lastName}</p>
          <p>Client Contact: {clientcontact}</p>
          <p>Payment Method: {paymentMethod}</p>
          {(paymentMethod === 'MTN MoMo' || paymentMethod === 'Airtel Money') && 
            <p>Transaction Id: {transactionId}</p>
          }
          <p>Total Amount: UGX: {total}</p>
          <p>Amount Paid: UGX: {amountPaid}</p>
          <p>Balance: UGX: {balance}</p>
          <table className="table table-light">
                <thead>
                    <tr>
                    <th>Item Name</th>
                    <th>Unit Cost (UGX)</th>
                    <th>Discount (%)</th>
                    <th>Total Quantity</th>
                    <th>Total Cost (UGX)</th>
                    </tr>
                </thead>
                <tbody>
                    {!cart || cart.length === 0 ? (
                    <tr>
                        <td colSpan="8" style={{ textAlign: "center" }}>
                        There are no items in the cart.
                        </td>
                    </tr>
                    ) : (
                    JSON.parse(cart).map((item) => (
                        <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.unitCost}</td>
                        <td>{item.discount}</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalCost}</td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
          <p>Served By: {localStorage.getItem('username')}</p>
          <p style={{ marginTop: '5px', marginBottom:'5px', fontSize: '13px', borderTop:'1px solid black', textAlign:'center' }}>
            Receipt re-printed By {localStorage.getItem('branch')} Prof-Bioresearch POS System.
          </p>
        </div>
      );
    }
}

const EquatorialShopSaleDataRetrieval = () => {
    const [receiptNumber, setReceiptNumber] = useState()
    const [receiptData, setReceiptData] = useState()
    const [clientFName, setClientFName] = useState('')
    const [clientContact, setClientContact] = useState('')
    const [status, setStatus] = useState('')
    const [additonalInfo, setAdditionalInfo] = useState('')
    const [itemsSold, setItemsSold] = useState()
    const [paymentMethod, setPaymentMethod] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('')
    const [balance, setBalance] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [amount, setAmountPaid] = useState(0)
    const [saleDate, setSaleDate] = useState()
    const [notes, setNotes] = useState('')
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }

    const componentRef = useRef();
    const  printBtnRef = useRef()

    const receiptNumberHandler = event => {
        event.preventDefault()
        setReceiptNumber(event.target.value)
    }

    const amountInput = event => {
        event.preventDefault()
        setAmountPaid(event.target.value)
    }

    const paymentMethodHandler = event => {
        event.preventDefault()
        setPaymentMethod(event.target.value)
    }

    const retrieveReceiptDataHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/fetchequatorialsalereceiptdata',{
            token: localStorage.getItem('token'),
            receiptNumber: receiptNumber
        })
        console.log(res.data)
        setReceiptData(res.data)
    }

    useEffect(()=>{
        if (receiptData) {
            setAdditionalInfo(receiptData[0].additionalinfo)
            setClientFName(receiptData[0].customerNames)
            setClientContact(receiptData[0].customerContact)
            setSaleDate(receiptData[0].saleDate)
            setTotalAmount(receiptData[0].totalAmount)
            setBalance(receiptData[0].balance)
            setItemsSold(receiptData[0].itemsSold)
        }

    }, [receiptData])

    const handleSubmit = async (event) => {
        event.preventDefault()
        //console.log(amount)
         let res = await axios.post('http://82.180.136.230:3005/updateequatorialshopsaledata',{
           token: localStorage.getItem('token'),
           branch: localStorage.getItem('branch'),
           receiptNo: receiptNumber,
           amountPaid: amount,
           date: new Date().toLocaleDateString(),
           notes: notes,
           paymentMethod: paymentMethod
         })
      .then(() => 
      setStatus({ type: 'success' }))
  
      .catch((err) => setStatus({ type: 'error', err }))
    }

    const handlePaymentStatusChange = (event) => {
        setPaymentStatus(event.target.value);
    };

    const printReceipt = event => {
        event.preventDefault()
        printBtnRef.current.click();
    }
    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'40px'}}>
            <h1 style={{textAlign:'center'}}>Retrieve And Update Sale Data</h1>
            <Row>
                <Col sm='12' md='7' lg='7' xl='7'>
                        <div className="form-floating mb-3">
                        <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }}  required onChange={receiptNumberHandler}/>
                        <label htmlFor="floatingInput">Receipt Number</label>
                    </div>
                    <span>
                        <button className="btn btn-primary" onClick={retrieveReceiptDataHandler}>
                            Retrieve Receipt Data
                        </button>
                        <button className="btn btn-primary" onClick={printReceipt}> Re-print Receipt</button>
                    </span>
                    <h4>Client Information</h4>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={clientFName}  required readOnly/>
                            <label htmlFor="floatingInput">Client Names</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={clientContact}  required readOnly/>
                            <label htmlFor="floatingInput">Client's Contact</label>
                        </div>
                    <h4>Receipt Additional Information</h4>
                    <div className="mb-3">
                        <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="Additional Notes" style={{ color: "#8CA6FE", height: '130px', width: '300px' }} value={additonalInfo} readOnly/>
                    </div>
                    <h4>Items Sold</h4>
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
                                { typeof itemsSold === "string" ? JSON.parse(itemsSold).map((item) => (
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
                </Col> 
                <Col sm='12' md='3' lg='3' xl='3'>
                <h3 style={{textAlign:'center'}}>Update Sale payment Details</h3>
                    {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                    {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            Total Sale Amount
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={totalAmount}
                            required
                            readOnly
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Balance
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={balance}
                            required
                            readOnly
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">
                            Amount Being Paid
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            required
                            onChange={amountInput}
                        />
                        </div>
                        <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={paymentMethodHandler} required>
                            <option selected>Payment Method</option>
                            <option value='Cash'>Cash</option>    
                            <option value='Airtel Money'>Airtel Money</option>
                            <option value='MTN MoMo'>MTN MoMo</option>
                            <option value='Prof MM'>Prof Mobile Money</option>      
                        </select>
                        <button type="submit" style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop:'20px'}}>
                            Save
                        </button>
                    </form>
                    <ReactToPrint
                    trigger={() => (
                        <button style={{ width: "100%",border: "none",color: "white", height: "45px", backgroundColor: "#3452A3", marginTop:'5px', display:'none'}} ref={printBtnRef}>Print Receipt</button>
                    )}
                    content={() => componentRef.current}
                    pdfPrint={true}
                />
                <div className="print-content">
                    <PrintableContent ref={componentRef} firstName={clientFName} cart={itemsSold} clientcontact={clientContact} total={totalAmount} balance={balance} amountPaid={totalAmount-balance} receiptNumber={receiptNumber} paymentMethod={paymentMethod}  saleDate={saleDate}/>
                </div>
                <style>
                    {`
                    .print-content {
                        display: none;
                    }
                    `}
                </style>
                </Col>
            </Row>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'></Col>
    </Row>
    )
}

export default EquatorialShopSaleDataRetrieval