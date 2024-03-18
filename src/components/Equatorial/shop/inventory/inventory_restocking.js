import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Select from 'react-select';

const EquatorialShopInventoryRestockingForm = () => {
    const [expenditureDate, setExpenditureDate] = useState()
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [itemList, setitemList] = useState('')
    const [restockSource,  setRestockSource] = useState('')
    const [moreInfo, setMoreInfo] = useState('')
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')
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

    useEffect(()=>{
        let date = new Date().toLocaleDateString()
        setExpenditureDate(date)
    },[])

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallshopproducts', {
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

    const handleChangeInput = (index, event) => {
        let values = [...items];
        values[index][event.target.name] = event.target.value;
        setItems(values)
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

    useEffect(()=>{
        fetchItems()
    },[])

    useEffect(()=>{
        setTimeout(()=>{
            setStatus('')
        }, 1000)
    },[status])

    const saveRestockData = async event => {
        event.preventDefault()
         let res = await axios.post('http://82.180.136.230:3005/saveequatorialshoprestockdata',{
            token:localStorage.getItem('token'),
             date: expenditureDate,
             items: JSON.stringify(items),
             category:'incoming',
             source: restockSource,
             externalSourceDetails: moreInfo,
             notes: notes
         })
         .then(() => setStatus({ type: 'success' }))
         .catch((err) => setStatus({ type: 'error', err }))
    }

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                <h1 style={{textAlign:'center'}}>Equatorial Shop Department Restocking Form</h1>
                {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={expenditureDate} required readOnly/>
                    <label htmlFor="floatingInput">Date</label>
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

                                                            <option selected>Measurement</option>
                                                            <option value="Pcs">Pcs</option>
                                                        </select>
                                            </div>
                                            <button onClick={addNewInput}  style={{ cursor: 'pointer' }} > Add </button>
                                            <button onClick={() => removeInput(index)} style={{ marginLeft: '2px', cursor: 'pointer' }} > Remove </button >
                                        </div>
                                    ))
                        }
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={sourceInput} required>
                    <option selected>Select Restock Source</option>
                    <option value='equatorialshop'>From Equatorial General Store</option>    
                    <option value='external'>From External Sources</option>  
                </select>
                {restockSource === 'external' && 
                    <div className="mb-3">
                    <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="External Source Information" style={{ color: "#8CA6FE", height: '130px', width: '300px' , marginTop:'10px'}} onChange={externalSourceInfoInput} />
                    </div>
                }
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={notesInput} required />
                    <label for="floatingInput">Notes</label>
                </div>
                <button style={{ width: "86%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveRestockData}>
                    Save Restock Data
                </button>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'></Col>
        </Row>
    )
}

export default EquatorialShopInventoryRestockingForm