import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'

const SaveNewSupplyForm = () => {
    const [paymentMethod, setPaymentMethod] = useState('')
    const [transactionId, setTransactionId] = useState()
    const [chequeNumber, setChequeNumber] = useState()
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [mName, setMName] = useState('')
    const [branchSupplied, setBranchSupplied] = useState('')
    const [itemSupplied, setItemSupplied] = useState('')
    const [quantitySupplied, setQuantitySupplied] = useState('0')
    const [units, setUnits] = useState('')
    const [totalCost, setTotalCost] = useState(0)
    const [recievedBy, setRecievedBy] = useState('')
    const [notes, setNotes] = useState('')
    const [amountPaid, setAmountPaid] = useState(0)
    const [paymentStatus, setPaymentStatus] = useState('')

    const [status, setStatus] = useState('')

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

    useEffect(()=>{
        let blc = totalCost - amountPaid
        if(blc == 0){
            setPaymentStatus('fully Paid')
        }else if(blc > 0){
            setPaymentStatus('partially Paid')
        }else{
            setPaymentStatus('unpaid')
        }
    },[amountPaid, totalCost])

    const submitHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/savesupplydata',{
            token: localStorage.getItem('token'),
            date: new Date().toLocaleString(),
            supplierNames: `${fName.toUpperCase().trim()} ${mName.toUpperCase().trim()} ${lName.toUpperCase().trim()}`,
            branchSupplied: branchSupplied,
            itemsSupplied: itemSupplied,
            quantitySupplied: quantitySupplied,
            units: units,
            totalSupplyCost: totalCost,
            balance: totalCost - amountPaid,
            paymentMethod: paymentMethod,
            paymentStatus: paymentStatus,
            transactionId: transactionId,
            chequeNumber: chequeNumber,
            receivedBy: recievedBy,
            notes: notes
        })
        .then(() => setStatus({ type: 'success' }))
         .catch((err) => setStatus({ type: 'error', err }))
    }

    return(
        <>  
            <Form onSubmit={submitHandler}>
                        {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                        {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={(e)=> setFName(e.target.value)}/>
                            <label for="floatingInput">Supplier First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={(e)=> setMName(e.target.value)}/>
                            <label for="floatingInput">Supplier Middle Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={(e)=> setLName(e.target.value)}/>
                            <label for="floatingInput">Supplier Last Name</label>
                        </div>
                            <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={(e)=> setBranchSupplied(e.target.value)}>
                                <option defaultValue>Branch Supplied</option>
                                <option value="namungoona">Namungoona</option>
                                <option value="masanafu">Masanafu</option>
                                <option value="equatorial">Equatorial</option>
                                <option value="buwama">Buwama</option>
                            </select>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={(e)=> setItemSupplied(e.target.value)}/>
                            <label for="floatingInput">Item Supplied</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={(e)=> setQuantitySupplied(e.target.value)}/>
                            <label for="floatingInput">Quantity supplied</label>
                        </div>
                        <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={(e)=> setUnits(e.target.value)} required>
                                    <option selected>Units Of Measurement</option>
                                    <option value="L">Litres</option>
                                    <option value="KG">Kilograms</option>
                                    <option value="MLS">Milliliters</option>
                                    <option value="Pcs">Pcs</option>
                        </select>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={(e)=> setTotalCost(e.target.value)}/>
                            <label for="floatingInput">Total Supply Cost (UGX)</label>
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
                            <option value='cheque'>Cheque</option>     
                        </select>
                        { (paymentMethod === 'MTN MoMo' || paymentMethod === 'Airtel Money') && 
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={(e)=>setTransactionId(e.target.value)} min='0' />
                                    <label for="floatingInput">Transaction Id</label>
                                </div>
                            </div>
                        }
                        { paymentMethod === 'cheque' && 
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={(e)=>setChequeNumber(e.target.value)} min='0' />
                                    <label for="floatingInput">Cheque Number</label>
                                </div>
                            </div>
                        }
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={(e)=> setRecievedBy(e.target.value)}/>
                            <label for="floatingInput">Recieved By</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }}  onChange={(e)=> setNotes(e.target.value)}/>
                            <label for="floatingInput">Notes</label>
                        </div>
                        <button type='submit' style={{ width: "92%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }}>
                            Save
                        </button>
        </Form>
        </>
    )
}
export default SaveNewSupplyForm