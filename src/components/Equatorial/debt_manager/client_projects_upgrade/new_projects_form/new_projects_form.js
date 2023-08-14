import { useState, useEffect } from "react"
import axios from 'axios'

const NewClientProjectsForm = ({setStatus}) => {
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [contact1, setContact1] = useState('')
    const [contact2, setContact2] = useState('')
    const [address, setAddress] = useState('')
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [units, setUnits] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [projectsItems, SetProjectsItems] = useState([])
    const [amountPaid, setAmountPaid] = useState(0)
    const [notes, setNotes] = useState('')

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        setQuantity(newQuantity);

        // Update the amountPaid based on the new quantity and selected item's unit price
        if (itemName) {
            const selectedItemData = projectsItems.find(item =>item.productId === itemName);
            if (selectedItemData) {
            const unitPrice = selectedItemData.unitPrice;
            const newAmountPaid = unitPrice * quantity;
            setTotalPrice(newAmountPaid)
            }
        }
    }

    useEffect(()=>{
        if (itemName) {
            const selectedItemData = projectsItems.find(item => item.productId === itemName);
            if (selectedItemData) {
            const unitPrice = selectedItemData.unitPrice;
            const newAmountPaid = unitPrice * quantity;
            setTotalPrice(newAmountPaid)
            }
        }
    },[quantity, projectsItems, itemName])

    const handleItemChange = (e) => {
        const selectedItemId = e.target.value
        setItemName(selectedItemId)

        // Find the selected item in the options array
        const selectedItemData = projectsItems.find(item => item.productId === selectedItemId);

        if (selectedItemData) {
          const unitPrice = selectedItemData.unitPrice;
          const newAmountPaid = unitPrice * quantity;
          setTotalPrice(newAmountPaid)
        }
    }

    useEffect(() => {
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
        }
        fetchProjectsMaterials();
      }, [])

      const saveClientOrder = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/saveclientprojectsorder',{
            token: localStorage.getItem('token'),
            fName: fName,
            lName: lName,
            contactNo_1 : contact1 ,
            contactNo_2  : contact2,
            address   : address,
            itemname    : itemName,
            quantity     : quantity,
            units        : units,
            totalprice       : totalPrice,
            balance: totalPrice - amountPaid,
            notes: notes
        })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
      }


   return(
    <form style={{display:'flex', flexDirection:'column', alignItems:'center'}} onSubmit={saveClientOrder}>
        <div class="form-floating mb-3">
            <input class="form-control" id="floatingInput" placeholder="First Name" onChange={(e)=> setFName(e.target.value)} required/>
            <label for="floatingInput">First Name</label>
        </div>
        <div class="form-floating mb-3">
            <input class="form-control" id="floatingInput" placeholder="Last Name" onChange={(e)=> setLName(e.target.value)} required/>
            <label for="floatingInput">Last Name</label>
        </div>
        <div class="form-floating mb-3">
            <input class="form-control" id="floatingInput" placeholder="Contact 1" onChange={(e)=> setContact1(e.target.value)} required/>
            <label for="floatingInput">Contact 1</label>
        </div>
        <div class="form-floating mb-3">
            <input class="form-control" id="floatingInput" placeholder="Contact 2" onChange={(e)=> setContact2(e.target.value)}/>
            <label for="floatingInput">Contact 2</label>
        </div>
        <div class="form-floating mb-3">
            <input class="form-control" id="floatingInput" placeholder="Address" onChange={(e)=> setAddress(e.target.value)} required/>
            <label for="floatingInput">Address</label>
        </div>
            <select
                className="form-select"
                aria-label="Default select example"
                style={{ height: "50px", color: "#8CA6FE" }}
                onChange={handleItemChange}
                required
                >
                <option value="" selected>
                    Item Name
                </option>
                {!projectsItems.length ? (
                    <option>Loading Items From Database</option>
                ) : (
                    projectsItems.map((item) => (
                    <option key={item.productId} value={item.productId}>
                        {item.productName}
                    </option>
                    ))
                )}
            </select>
        <div class="form-floating mb-3">
            <input class="form-control" id="floatingInput" placeholder="Quantity" onChange={handleQuantityChange} required/>
            <label for="floatingInput">Quantity</label>
        </div>
        <select class="form-select" aria-label="Default select example" style={{ height: "50px", color: "#8CA6FE" }} onChange={(e)=> setUnits(e.target.value)} required>
            <option selected>Units Of Measurement</option>
            <option value="L">Litres</option>
            <option value="KG">Kilograms</option>
            <option value="MLS">Milliliters</option>
            <option value="Pcs">Pcs</option>
        </select>
        <div class="form-floating mb-3">
            <input class="form-control" id="floatingInput" placeholder="Total Price" value={totalPrice} required readOnly/>
            <label for="floatingInput">Total Price (UGX)</label>
        </div>
        <div class="form-floating mb-3">
            <input class="form-control" id="floatingInput" placeholder="Total Price" onChange={(e)=>setAmountPaid(e.target.value)} required />
            <label for="floatingInput">Amount Paid (UGX)</label>
        </div>
        <div class="form-floating mb-3">
            <input class="form-control" id="floatingInput" placeholder="Total Price" onChange={(e)=>setNotes(e.target.value)} required />
            <label for="floatingInput">Notes</label>
        </div>
        <button type="submit" style={{ width: "60%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3"}}>
            Save
        </button>
    </form>
   )
}

export default NewClientProjectsForm