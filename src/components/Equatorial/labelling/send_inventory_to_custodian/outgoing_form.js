import axios from 'axios'
import { useEffect, useState } from 'react'
import Select from 'react-select';

const LabellingOutgoingForm = ({fetchInventoryRecords}) => {
    const [expenditureDate, setExpenditureDate] = useState()
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [restockSource,  setRestockSource] = useState('')
    const [moreInfo, setMoreInfo] = useState('')
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')
    const [deliveryNoteNumber, setDeliveryNoteNumber] = useState('')
    const [selectedItems, setSelectedItems] = useState([])
    const [itemsDelivered, setItemsDelivered] = useState([{ itemId: '', itemQuantity: '', mUnits: '' },])
    const [options, setOptions] = useState([])
    
    const removeInput = (index) => {
        const values = [...itemsDelivered];
        values.splice(index, 1);
        setItemsDelivered(values)
    }
    const addNewInput = () => {
        setItemsDelivered([...itemsDelivered, { itemId: 0, itemQuantity: '', mUnits: '' }])
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

    const handleChangeInput = (index, event) => {
        let values = [...itemsDelivered];
        values[index][event.target.name] = event.target.value;
        setItemsDelivered(values)
    }

    const getSelectedItemForIndex = (index) => selectedItems[index]

    const handleItemChangeForIndex = (index, selectedOption) => {
        const updatedSelectedItemsArray = [...selectedItems];
        updatedSelectedItemsArray[index] = selectedOption;
        setSelectedItems(updatedSelectedItemsArray);
        const updatedItemsDelivered = [...itemsDelivered];
        updatedItemsDelivered[index] = {
            ...updatedItemsDelivered[index],
            itemId: selectedOption.value, // Update with the selected item's value
        };
        setItemsDelivered(updatedItemsDelivered);
    }

    useEffect(()=>{
        let date = new Date().toLocaleDateString()
        setExpenditureDate(date)
    },[])

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/shopitemlist', {
            token: localStorage.getItem("token")
        })
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
              itemsDelivered: JSON.stringify(itemsDelivered),
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
                {itemsDelivered.map((itemsDelivered, index) => (
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
                                                            value={itemsDelivered.itemQuantity}
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
                                                            value={itemsDelivered.mUnits}
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
                <div className="form-floating mb-3">
                    <input  className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={dnn} required />
                    <label for="floatingInput">Delivery Note Number</label>
                </div>
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