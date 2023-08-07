import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

const RetrieveSaleData = ({saleData}) => {
    const [paymentMethod, setPaymentMethod] = useState('')
    const [status, setStatus] = useState('')
    const [transactionId, setTransactionId] = useState()
    const [amount, setAmountPaid] = useState(0)
    const [notes, setNotes] = useState('')

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
      }, [status]);
    
    const amountInput = event => {
        event.preventDefault()
        setAmountPaid(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
         let res = await axios.post('http://82.180.136.230:3005/updateequatorialshopsaledata',{
           token: localStorage.getItem('token'),
           branch: localStorage.getItem('branch'),
           receiptNo: saleData.receiptNumber,
           transactionId: transactionId,
           amountPaid: amount,
           date: new Date().toLocaleDateString(),
           notes: notes,
           paymentMethod: paymentMethod
         })
      .then(() => 
      setStatus({ type: 'success' }))
  
      .catch((err) => setStatus({ type: 'error', err }))
    }


    return(
        <div className="col align-self-center" style={{marginTop:'40px'}}>
            <Row>
                <Col sm='12' md='3' lg='3' xl='3'></Col> 
                <Col sm='12' md='6' lg='6' xl='6'>
                    {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                    {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                    <form>
                        <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            Total Sale Amount (UGX)
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={saleData.totalAmount}
                            required
                            readOnly
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Balance (UGX)
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={saleData.balance}
                            required
                            readOnly
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">
                            Amount Being Paid (UGX)
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            required
                            onChange={amountInput}
                        />
                        </div>
                        <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={(e)=>setPaymentMethod(e.target.value)} required>
                            <option selected>Payment Method</option>
                            <option value='Cash'>Cash</option>    
                            <option value='Airtel Money'>Airtel Money</option>
                            <option value='MTN MoMo'>MTN MoMo</option>
                            <option value='Prof MM'>Prof Mobile Money</option> 
                            <option value='Visa'>Visa</option>     
                        </select>
                        { (paymentMethod === 'MTN MoMo' || paymentMethod === 'Airtel Money') && 
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={(e)=>setTransactionId(e.target.value)} min='0' />
                                    <label for="floatingInput">Transaction Id</label>
                                </div>
                            </div>
                        }
                        <div className="mb-3">
                            <div className="form-floating mb-3">
                                <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE", height: '130px', width: '300px' }} onChange={(e)=> setNotes(e.target.value)} />
                                <label for="floatingInput">Notes</label>
                            </div>
                        </div>      
                        <button type="submit" style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop:'20px'}} onClick={handleSubmit}>
                            Save
                        </button>
                    </form>
                </Col>
            </Row>
        </div>
    )
}

export default RetrieveSaleData