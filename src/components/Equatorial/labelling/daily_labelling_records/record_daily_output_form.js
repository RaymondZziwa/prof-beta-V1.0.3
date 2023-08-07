import { useState, useEffect } from "react"
import axios from "axios"

const RecordDailyOutputForm = ({fetchInventoryRecords}) => {
    const [status, setStatus] = useState('')
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [itemList, setitemList] = useState('')
    const [itemName, setitemName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [units, setUnits] = useState('')
    const [notes, setNotes] = useState('')
    const [dnn, setDNN] = useState('')
 
    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
      }, [status]);


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

    const saveData = async (event) => {
        event.preventDefault()
        try {
            const res = await axios.post('http://82.180.136.230:3005/savelabellingdailyoutput',  {
                token:localStorage.getItem('token'),
                date: new Date().toLocaleDateString(),
                itemName: itemName,
                quantity: quantity,
                units: units,
                recordedBy: localStorage.getItem('username'),
                notes: notes,
                dnn: dnn
            })
    
            setStatus({ type: 'success' });
        } catch (error) {
            console.error('Error:', error);
            setStatus({ type: 'error', err: error });
        }
    
        fetchInventoryRecords();
    }


    return(
        <>
                {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={new Date().toLocaleString()} required readOnly/>
                    <label htmlFor="floatingInput">Date</label>
                </div>
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={(e)=> setitemName(e.target.value)} required>
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
                    <input type='number' className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={(e)=> setQuantity(e.target.value)} required />
                    <label for="floatingInput">Quantity Labelled</label>
                </div>
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={(e)=> setUnits(e.target.value)} required>
                    <option selected>Select Unit Of Measurement</option> 
                    <option value='Pcs'>Pcs</option>    
                </select>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} value={localStorage.getItem('username')} readOnly required />
                    <label for="floatingInput">Recorded By</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={(e)=> setNotes(e.target.value)} required />
                    <label for="floatingInput">Notes</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={(e)=> setDNN(e.target.value)} required />
                    <label for="floatingInput">Delivery Note Number</label>
                </div>
                <button style={{ width: "92%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveData}>
                    Save 
                </button>
        </>
    )
}
export default RecordDailyOutputForm