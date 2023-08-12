import axios from 'axios'
import { useEffect, useState } from 'react'

const LabellingOutgoingForm = ({fetchInventoryRecords}) => {
    const [expenditureDate, setExpenditureDate] = useState()
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [itemList, setitemList] = useState('')
    const [itemName, setitemName] = useState('')
    const [quantity, setquantity] = useState('')
    const [restockSource,  setRestockSource] = useState('')
    const [moreInfo, setMoreInfo] = useState('')
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')
    const [deliveryNoteNumber, setDeliveryNoteNumber] = useState('')

    const itemNameInput = event => {
        event.preventDefault()
        setitemName(event.target.value)
    }

    const quantityInput = event => {
        event.preventDefault()
        setquantity(event.target.value)
    }

    const  sourceInput = event => {
        event.preventDefault()
        setRestockSource(event.target.value)
    }

    const externalSourceInfoInput = event => {
        event.preventDefault()
        setMoreInfo(event.target.value)
    }

    const notesInput = event => {
        event.preventDefault()
        setNotes(event.target.value)
    }
    const dnn = event => {
        event.preventDefault()
        setDeliveryNoteNumber(event.target.value)
    }

    useEffect(()=>{
        let date = new Date().toLocaleDateString()
        setExpenditureDate(date)
    },[])

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/shopitemlist', {
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

    const saveData = async event => {
        event.preventDefault()
         try {
            let res = await axios.post('http://82.180.136.230:3005/transferlabelledinventorytocustodian', {
              token: localStorage.getItem('token'),
              date: expenditureDate,
              itemid: itemName,
              quantity: quantity,
              units: 'Pcs',
              deliveredto: restockSource,
              notes: notes,
              deliveryNoteNumber: deliveryNoteNumber,
            });
        
            // Assuming `setStatus` is defined and handles state updates
            setStatus({ type: 'success' });
            
            // Call the function to fetch inventory records
            fetchInventoryRecords();
          } catch (err) {
            // Assuming `setStatus` is defined and handles state updates
            setStatus({ type: 'error', err });
          }

    }

    return(
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={expenditureDate} required readOnly/>
                    <label htmlFor="floatingInput">Date</label>
                </div>
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={itemNameInput} required>
                    <option selected>Item Name</option>
                        { isItemListLoading ? <option>Loading Items From Database</option> :
                            itemList.map(item => (
                                <option key={item.productId} value={item.productId}>
                                    {item.productName}
                                </option>
                            ))
                        }
                </select>
                <div className="form-floating mb-3">
                    <input  className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={dnn} required />
                    <label for="floatingInput">Delivery Note Number</label>
                </div>
                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={quantityInput} required />
                    <label for="floatingInput">Quantity Delivered</label>
                </div>
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} required>
                    <option selected>Select Unit Of Measurement</option> 
                    <option value='Pcs'>Pcs</option>    
                </select>
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={sourceInput} required>
                    <option selected>Delivered To</option>
                    <option value='Equatorial Custodian'>Equatorial Custodian</option>    
                    <option value='other'>Other Destinations</option>  
                </select>
                {restockSource === 'other' && 
                    <div className="mb-3">
                    <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="Other Destination Information" style={{ color: "#8CA6FE", height: '130px', width: '300px' , marginTop:'10px'}} onChange={externalSourceInfoInput} />
                    </div>
                }
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={notesInput} required />
                    <label for="floatingInput">Notes</label>
                </div>
                <button style={{ width: "92%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveData}>
                    Save Delivery Data
                </button>
            </div>
    )
}
export default LabellingOutgoingForm