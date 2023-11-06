import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'

const PaySupplier = ({supplyId}) => {
    const [paymentMode, setPaymentMode] = useState('')
    const [status, setStatus] = useState('')
    const [amountPaid, setAmountPaid] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('')
    const [paidBy, setPaidBy] = useState('')
    const [notes, setNotes] = useState('')
    const [transactionId, setTransactionId] = useState()
    const [chequeNumber, setChequeNumber] = useState()

    const [productId, setProductId] = useState(null)
    const [productQuantity, setProductQuantity] = useState(1)
    const [units, setUnits] = useState('')
    const [options, setOptions] = useState([])
    const [shopItems, SetShopItems] = useState([])
    const [projectsItems, SetProjectsItems] = useState([])

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
    }, [status])


    const paymentMethodHandler = event => {
        event.preventDefault()
        setPaymentMethod(event.target.value)
    }

    
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        setProductQuantity(newQuantity);

        // Update the amountPaid based on the new quantity and selected item's unit price
        if (productId) {
            const selectedItemData = options.find(item => String(item.productId) === String(productId));
            if (selectedItemData) {
            const unitPrice = selectedItemData.unitPrice;
            const newAmountPaid = unitPrice * productQuantity;
            setAmountPaid(newAmountPaid)
            }
        }
    }

    useEffect(()=>{
        if (productId) {
            const selectedItemData = options.find(item => String(item.productId) === String(productId));
            if (selectedItemData) {
            const unitPrice = selectedItemData.unitPrice;
            const newAmountPaid = unitPrice * productQuantity;
            setAmountPaid(newAmountPaid)
            }
        }
    },[productQuantity, options, productId])

    const handleItemChange = (e) => {
        const selectedItemId = e.target.value
        setProductId(selectedItemId)

        // Find the selected item in the options array
        const selectedItemData = options.find(item => String(item.productId) === String(selectedItemId));
        console.log('sdd', selectedItemData)
        console.log(selectedItemId)

        if (selectedItemData) {
          const unitPrice = selectedItemData.unitPrice;
          const newAmountPaid = unitPrice * productQuantity;
          setAmountPaid(newAmountPaid)
        }
    }


    useEffect(() => {
        const fetchMaterials = async () => {
          try {
            let res = await axios.post('http://82.180.136.230:3005/fetchallshopinventory', {
              token: localStorage.getItem('token')
            });
    
            if (Array.isArray(res.data)) {
              SetShopItems(res.data)
            }
          } catch (error) {
            console.error('Error fetching materials:', error);
          }
        };
    
        const fetchProjectsMaterials = async () => {
          try {
            let res = await axios.post('http://82.180.136.230:3005/fetchallprojectsdata', {
              token: localStorage.getItem('token')
            });
    
            if (Array.isArray(res.data)) {
              SetProjectsItems(res.data)
            }
          } catch (error) {
            console.error('Error fetching project materials:', error);
          }
        };
    
        fetchMaterials();
        fetchProjectsMaterials();
      }, [])

    
      useEffect(()=>{
        if(shopItems && projectsItems){
            setOptions([...shopItems,...projectsItems])
        }
      },[shopItems, projectsItems])

      function getProductNameById(productId) {
        const product = options.find(item => String(item.productId) === String(productId));
        return product ? product.productName : null;
    }


    const submitHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/savesupplierpayment',{
            token: localStorage.getItem('token'),
            date: new Date().toLocaleString(),
            amountPaid: amountPaid,
            supplyId: supplyId,
            itemName: getProductNameById(productId),
            quantity: productQuantity,
            units: units,
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
            <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={(e)=> setPaymentMode(e.target.value)} required>
                    <option selected>Payment Mode</option>
                    <option value='Cash'>Cash</option>    
                    <option value='Product Exchange'>Product Exchange</option>
            </select>
            {paymentMode === 'Cash' && 
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
            }
            {(paymentMode === 'Product Exchange' && supplyId) && 
                <Form onSubmit={submitHandler}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} value={new Date().toLocaleString()}  readOnly/>
                    <label for="floatingInput">Payment Date</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} value={supplyId} readOnly/>
                    <label for="floatingInput">Supply Id</label>
                </div>
                <select
                className="form-select"
                aria-label="Default select example"
                style={{ height: "60px", color: "#8CA6FE" }}
                onChange={handleItemChange}
                required
                >
                <option value="" selected>
                    Item Name
                </option>
                {!options.length ? (
                    <option>Loading Items From Database</option>
                ) : (
                    options.map((item) => (
                    <option key={item.productId} value={item.productId}>
                        {item.productName} - UGX {item.unitPrice}
                    </option>
                    ))
                )}
                </select>
                <div className="form-floating mb-3">
                    <input type='number' className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={handleQuantityChange}/>
                    <label for="floatingInput">Quantity</label>
                </div>
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={(e)=> setUnits(e.target.value)} required>
                    <option selected>Units Of Measurement</option>
                    <option value="L">Litres</option>
                    <option value="KG">Kilograms</option>
                    <option value="MLS">Milliliters</option>
                    <option value="Pcs">Pcs</option>
                </select>
                <div className="form-floating mb-3">
                    <input className="form-control"  id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  value={amountPaid} readOnly/>
                    <label for="floatingInput">Product Worth (UGX)</label>
                </div>
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
            }
        </>
    )
}

export default PaySupplier