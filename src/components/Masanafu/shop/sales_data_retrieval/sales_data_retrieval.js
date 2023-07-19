import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import { useState, useEffect } from 'react'

const SalesDataRetrieval = () => {
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
        let res = await axios.post('http://82.180.136.230:3005/fetchsalereceiptdata',{
            token: localStorage.getItem('token'),
            receiptNumber: receiptNumber
        })
        console.log(res.data)
        setReceiptData(res.data)
    }

    useEffect(()=>{
        if (receiptData) {
            console.log('rd', receiptData)
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
        console.log(amount)
         let res = await axios.post('http://82.180.136.230:3005/updatesaledata',{
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
       // console.log(firstName, lastName, phoneNumber, paymentMethod, amount, additionalInfo, items, total)
    }

    const handlePaymentStatusChange = (event) => {
        setPaymentStatus(event.target.value);
    };
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
                </Col>
            </Row>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'></Col>
    </Row>
    )
}

export default SalesDataRetrieval