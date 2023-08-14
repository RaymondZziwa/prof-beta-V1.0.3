import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

const UpgradeClientProject = ({data}) => {
    const [paymentMode, setPaymentMode] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [status, setStatus] = useState('')
    const [transactionId, setTransactionId] = useState()
    const [itemIn, setItemIn] = useState('')
    const [quantityIn, setQuantityIn] = useState(1)
    const [unitsIn, setUnitsIn] = useState('')
    const [amount, setAmountPaid] = useState(0)
    const [notes, setNotes] = useState('')
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [itemList, setitemList] = useState('')
    const [totalCost, setTotalCost] = useState(0)
    const [newItemData, setNewItemData] = useState([])
    const [newBalance, setNewBalance] = useState(0)

    const newItemInput = event => {
        event.preventDefault()
        setItemIn(event.target.value)

        const itemData = itemList.filter((item)=> 
            item.productId === event.target.value
        )   
        setNewItemData(itemData)
    }

    useEffect(()=>{
        if(newItemData.length > 0){
            setTotalCost(newItemData[0].unitPrice * quantityIn)
            let oldAmountPaid = data.totalprice - data.balance
            if(totalCost){
                setNewBalance(totalCost-oldAmountPaid)
            }
        }
    },[newItemData, quantityIn, data, totalCost])

    // useEffect(()=>{
    //     if(totalCost){
    //         let 
    //     }
    // },[totalCost, quantityIn])


    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallprojectsdata', {
            token: localStorage.getItem("token")
        })
        setitemList(res.data)
        setIsItemLoading(false)
    }

    useEffect(()=>{
        fetchItems()
    },[])

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
    }, [status])

    const handleSubmit = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/saveclientprojectsupgrade',{
            token: localStorage.getItem('token'),
            orderId: data.orderId,
            itemName: itemIn,
            quantity: quantityIn,
            units: unitsIn,
            totalPrice: totalCost,
            newBalance: newBalance - amount,
            paymentMethod: paymentMethod,
            transactionId: transactionId,
            notes: notes
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
                        <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={newItemInput} required>
                            <option selected>New Item</option>
                                            { isItemListLoading ? <option>Loading Items From Database</option> :
                                                itemList.map(item => (
                                                    <option key={item.name} value={item.productId}>
                                                        {item.productName}
                                                    </option>
                                                ))
                            }
                        </select>
                        <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Quantity
                                    </label>
                                    <input
                                        className="form-control"
                                        id="lastName"
                                        onChange={(e)=>setQuantityIn(e.target.value)}
                                        required
                                    />
                                    </div>
                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={(e)=> setUnitsIn(e.target.value)} required>
                                        <option selected>Select Unit Of Measurement</option> 
                                        <option value='Pcs'>Pcs</option>
                                        <option value='Kgs'>Kgs</option> 
                                        <option value='L'>Litres</option>       
                                    </select>
                                    <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">
                                    Total Cost (UGX)
                                </label>
                                <input
                                    className="form-control"
                                    id="phoneNumber"
                                    required
                                   value={totalCost}
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
                           value={newBalance}
                            required
                            readOnly
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">
                            Amount Being Paid (UGX)
                        </label>
                        <input
                            className="form-control"
                            id="phoneNumber"
                            required
                            onChange={(e)=> setAmountPaid(e.target.value)}
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
                        { (paymentMethod === 'MTN MoMo' || paymentMethod === 'Airtel Money' || paymentMethod === 'Prof MM') && 
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
                            Upgrade
                        </button>
                    </form>
                </Col>
            </Row>
        </div>
    )
}
export default UpgradeClientProject