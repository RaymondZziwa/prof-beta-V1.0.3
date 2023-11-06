import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'

const SaveNewRecordForm = ({fetchRecords}) => {

    const [branchSupplied, setBranchSupplied] = useState('')
    const [itemSupplied, setItemSupplied] = useState(null)
    const [quantitySupplied, setQuantitySupplied] = useState('0')
    const [units, setUnits] = useState('')
    const [recievedBy, setRecievedBy] = useState('')
    const [notes, setNotes] = useState('')
    const [itemName, setitemName] = useState('')

    const [status, setStatus] = useState('')
    const [dept, setDept] = useState('')
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [itemList, setitemList] = useState('')

    const itemNameInput = event => {
        event.preventDefault()
        setitemName(event.target.value)
    }

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


    const submitHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/releaseinventorytodepartment',{
            token: localStorage.getItem('token'),
            date: new Date().toLocaleString(),
            itemSupplied: itemName,
            quantitySupplied: quantitySupplied,
            units: units,
            deptDeliveredTo: dept,
            recievedBy: recievedBy,
            notes: notes
        })
        .then(() => setStatus({ type: 'success' }))
         .catch((err) => setStatus({ type: 'error', err }))
         fetchRecords()
    }

    return(
        <>  
            <Form onSubmit={submitHandler}>
                        {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                        {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  value={new Date().toLocaleString()} readOnly/>
                            <label for="floatingInput">Date</label>
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
                        <div className="mb-3">
                            <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={(event)=> setDept(event.target.value)}>
                                <option defaultValue>Filter By Department</option>
                                <option value="Shop">Main Shop</option>
                                <option value="Labelling">Labelling Department</option>
                                <option value="Projects">Projects Department</option>
                                <option value="Massage">Massage Department</option>
                            </select>
                        </div>
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

export default SaveNewRecordForm