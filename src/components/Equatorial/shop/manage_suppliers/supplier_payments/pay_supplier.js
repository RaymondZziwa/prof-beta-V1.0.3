import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { eventNames } from 'process'

const PaySupplier = ({supplyId}) => {
    const [status, setStatus] = useState('')
    const [amountPaid, setAmountPaid] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('')
    const [paidBy, setPaidBy] = useState('')
    const [notes, setNotes] = useState('')
    const [transactionId, setTransactionId] = useState()
    const [chequeNumber, setChequeNumber] = useState()

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
      }, [status]);


    const paymentMethodHandler = event => {
        event.preventDefault()
        setPaymentMethod(event.target.value)
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/savesupplierpayment',{
            token: localStorage.getItem('token'),
            date: new Date().toLocaleString(),
            amountPaid: amountPaid,
            supplyId: supplyId,
            paymentMethod: paymentMethod,
            transactionId: transactionId,
            chequeNumber: chequeNumber,
            paidBy: paidBy,
            notes: notes
        })
        .then(() => setStatus({ type: 'success' }))
         .catch((err) => setStatus({ type: 'error', err }))
    }

    return(
        <>  
            {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
            {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
            <Form onSubmit={submitHandler}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} value={new Date().toLocaleString()}  readOnly/>
                            <label for="floatingInput">Payment Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} value={supplyId} readOnly/>
                            <label for="floatingInput">Supply Id</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={(e)=> setAmountPaid(e.target.value)}/>
                            <label for="floatingInput">Amount Paid (UGX)</label>
                        </div>
                        <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={paymentMethodHandler} required>
                            <option selected>Payment Method</option>
                            <option value='Cash'>Cash</option>    
                            <option value='Airtel Money'>Airtel Money</option>
                            <option value='MTN MoMo'>MTN MoMo</option>
                            <option value='Cheque'>Cheque</option>     
                        </select>
                        { (paymentMethod === 'MTN MoMo' || paymentMethod === 'Airtel Money') && 
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={(e)=>setTransactionId(e.target.value)} min='0' />
                                    <label for="floatingInput">Transaction Id</label>
                                </div>
                            </div>
                        }
                        { paymentMethod === 'Cheque' && 
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={(e)=>setChequeNumber(e.target.value)} min='0' />
                                    <label for="floatingInput">Cheque Number</label>
                                </div>
                            </div>
                        }
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={(e)=> setPaidBy(e.target.value)}/>
                            <label for="floatingInput">Paid By</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }}  onChange={(e)=> setNotes(e.target.value)}/>
                            <label for="floatingInput">Notes</label>
                        </div>
                        <button type='submit' style={{ width: "92%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }}>
                            Save Payment
                        </button>
        </Form>
        </>
    )
}

export default PaySupplier