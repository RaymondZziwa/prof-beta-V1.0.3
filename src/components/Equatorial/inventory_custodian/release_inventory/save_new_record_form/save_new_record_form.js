import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select';

const SaveNewRecordForm = ({fetchRecords}) => {
    const [recievedBy, setRecievedBy] = useState('')
    const [notes, setNotes] = useState('')

    const [status, setStatus] = useState('')
    const [dept, setDept] = useState('')
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [itemList, setitemList] = useState('')
    const [selectedItems, setSelectedItems] = useState([])
    const [items, setItems] = useState([{ itemId: '', itemQuantity: '', mUnits: '' },])
    const [options, setOptions] = useState([])

    const removeInput = (index) => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values)
    }
    const addNewInput = () => {
        setItems([...items, { itemId: 0, itemQuantity: '', mUnits: '' }])
    }

    const getSelectedItemForIndex = (index) => selectedItems[index]

    const handleItemChangeForIndex = (index, selectedOption) => {
        const updatedSelectedItemsArray = [...selectedItems];
        updatedSelectedItemsArray[index] = selectedOption;
        setSelectedItems(updatedSelectedItemsArray);
        const updatedItemsDelivered = [...items];
        updatedItemsDelivered[index] = {
            ...updatedItemsDelivered[index],
            itemId: selectedOption.value, // Update with the selected item's value
        };
        setItems(updatedItemsDelivered);
    }

    const handleChangeInput = (index, event) => {
        let values = [...items];
        values[index][event.target.name] = event.target.value;
        setItems(values)
    }

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setSelectedItems([])
            setItems([{ itemId: '', itemQuantity: '', mUnits: '' },])
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

        const transformedOptions = res.data.map((item) => ({
            value: item.productId,
            label: item.productName
        }));
        setOptions(transformedOptions)
    }

    useEffect(()=>{
        fetchItems()
    },[])


    const submitHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/releaseinventorytodepartment',{
            token: localStorage.getItem('token'),
            date: new Date().toLocaleString(),
            itemSupplied: JSON.stringify(items),
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
                        {items.map((items, index) => (
                                        <div  key={index}>
                                            <div className="form-floating mb-3">
                                            <Select
                                                value={getSelectedItemForIndex(index)} // Use the function to get the selected option
                                                onChange={(selectedOption) => handleItemChangeForIndex(index, selectedOption)} // Use the function to handle the change
                                                options={options}
                                                isSearchable
                                                placeholder="Select an Item"
                                                id="floatingInput"
                                            />
                                            </div>
                                            <div className="form-floating mb-3">
                                                        <input type="text"
                                                            className="form-control"
                                                            id="floatingInput"
                                                            name="itemQuantity"
                                                            placeholder="Item Quantity"
                                                            style={{ color: "#8CA6FE" }}
                                                            value={items.itemQuantity}
                                                            onChange={event => handleChangeInput(index, event)}
                                                            required />
                                                        <label for="floatingInput">Item Quantity</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                        <select
                                                            className="form-select"
                                                            aria-label="Default select example"
                                                            style={{ height: "60px", color: "#8CA6FE" }}
                                                            placeholder="mUnits"
                                                            name="mUnits"
                                                            value={items.mUnits}
                                                            onChange={event => handleChangeInput(index, event)}
                                                            required>

                                                            <option value="L">Litres</option>
                                                            <option value="KG">Kilograms</option>
                                                            <option value="MLS">Milliliters</option>
                                                            <option value="Pcs">Pcs</option>
                                                        </select>
                                            </div>
                                            <button onClick={addNewInput}  style={{ cursor: 'pointer' }} > Add </button>
                                            <button onClick={() => removeInput(index)} style={{ marginLeft: '2px', cursor: 'pointer' }} > Remove </button >
                                        </div>
                                    ))
                        }
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