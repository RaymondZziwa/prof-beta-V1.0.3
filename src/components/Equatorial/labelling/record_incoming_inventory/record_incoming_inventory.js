import { useState, useEffect } from "react"
import axios from "axios"
import Select from 'react-select';

const RecordIncomingInventoryForm = ({fetchShopInventoryRecords}) => {
    const [status, setStatus] = useState('')
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [itemList, setitemList] = useState('')
    const [restockSource, setRestockSource] = useState('')
    const [itemName, setitemName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [units, setUnits] = useState('')
    const [branch, setBranch] = useState('')
    const [deliveredBy, setDeliveredBy] = useState('')
    const [notes, setNotes] = useState('')
    const [dnn, setDNN] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [externalSource, setExternalSource] = useState('')
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

    const handleSelectChange = (selectedOption) => {
        setitemName(selectedOption);
    }

    const handleChangeInput = (index, event) => {
        let values = [...itemsDelivered];
        values[index][event.target.name] = event.target.value;
        setItemsDelivered(values)
    }

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
      }, [status])
      

    const handleItemChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
            option.value
        );
        setSelectedItems(selectedOptions);
    }


    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/shopitemlist', {
            token: localStorage.getItem("token")
        })
        setIsItemLoading(false)
        setitemList(res.data)

        const transformedOptions = res.data.map((item) => ({
            value: item.productId,
            label: item.productName
        }));
        setOptions(transformedOptions)
        
    }

    useEffect(()=>{
        fetchItems()
    },[])

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

    const saveData = async (event) => {
        event.preventDefault()

        const formData = new FormData();
        formData.append('token', localStorage.getItem('token'));
        formData.append('file', selectedFile);
        formData.append('date', new Date().toLocaleString())
        formData.append('items', JSON.stringify(itemsDelivered))
        formData.append('quantity', quantity)
        formData.append('unit', units)
        formData.append('restockSource', restockSource)
        formData.append('companyBranch', branch)
        formData.append('deliveredBy', deliveredBy)
        formData.append('externalSourceDetails', externalSource)
        formData.append('notes', notes)
        formData.append('deliveryNoteNumber', dnn)

        try {
            const res = await axios.post('http://82.180.136.230:3005/labellingdepartmentstorerestock', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            setStatus({ type: 'success' });
        } catch (error) {
            console.error('Error:', error);
            setStatus({ type: 'error', err: error });
        }
    
        fetchShopInventoryRecords();
    }


    return(
        <>
                {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={new Date().toLocaleString()} required readOnly/>
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
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={(e)=> setRestockSource(e.target.value)}  required>
                    <option selected>Select Restock Source</option>
                    <option value='companybranches'>From Other Company Branches</option>    
                    <option value='external'>From External Sources</option>  
                </select>
                {restockSource === 'companybranches' && 
                   <div className="mb-3">
                        <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={(e)=> setBranch(e.target.value)}>
                            <option defaultValue>Branch</option>
                            <option value="buwama">Buwama</option>
                            <option value="namungoona">Namungoona</option>
                            <option value="masanafu">Masanafu</option>
                            <option value="equatorial">Equatorial</option>
                        </select>
                    </div>
                } 
                {restockSource === 'external' && 
                   <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={(e)=> setExternalSource(e.target.value)} required />
                    <label for="floatingInput">External Source Details</label>
                    </div>
                } 
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={(e)=> setDeliveredBy(e.target.value)} required />
                    <label for="floatingInput">Delivered By</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={(e)=> setNotes(e.target.value)} required />
                    <label for="floatingInput">Notes</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={(e)=> setDNN(e.target.value)} required />
                    <label for="floatingInput">Delivery Note Number</label>
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Enter Delivery Note Image</label>
                    <input class="form-control" type="file" id="formFile" accept="image/png, image/gif, image/jpeg" style={{ width:'300px' }} onChange={(e)=> setSelectedFile(e.target.files[0])} required/>
                </div>
                <button style={{ width: "92%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveData}>
                    Save 
                </button>
        </>
    )
}
export default RecordIncomingInventoryForm