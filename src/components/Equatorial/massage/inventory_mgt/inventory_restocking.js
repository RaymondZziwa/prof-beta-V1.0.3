import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Select from 'react-select';

const EquatorialMassageDepartmentInventoryRestockingForm = () => {
    const [expenditureDate, setExpenditureDate] = useState()
    const [itemName, setitemName] = useState('')
    const [quantity, setquantity] = useState('')
    const [restockSource,  setRestockSource] = useState('')
    const [moreInfo, setMoreInfo] = useState('')
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')
    const [options, setOptions] = useState([])
    

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

    useEffect(()=>{
        let date = new Date().toLocaleDateString()
        setExpenditureDate(date)
    },[])

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/shopitemlist', {
            token: localStorage.getItem("token")
        })
        const transformedOptions = res.data.map((item) => ({
            value: item.productId.toString(),
            label: item.productName
        }));
        setOptions(transformedOptions)
    }

    const handleSelectChange = (selectedOption) => {
        setitemName(selectedOption);
    }

    useEffect(()=>{
        fetchItems()
    },[])

    const saveRestockData = async (event) => {
        event.preventDefault();
      
        try {
          let res = await axios.post('http://82.180.136.230:3005/saveequatorialmassagerestockdata', {
            token: localStorage.getItem('token'),
            date: expenditureDate,
            itemid: itemName,
            quantity: quantity,
            category: 'incoming',
            unit: 'Pcs',
            source: restockSource,
            externalSourceDetails: moreInfo,
            notes: notes,
          });
      
          // Reset the form fields and status
          setitemName('');
          setquantity('');
          setRestockSource('');
          setMoreInfo('');
          setNotes('');
          setStatus({ type: 'success' });
      
          console.log(expenditureDate);
        } catch (err) {
          setStatus({ type: 'error', err });
        }
      };
      

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                <h1 style={{textAlign:'center'}}>Equatorial Massage Department Restocking Form</h1>
                {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={expenditureDate} required readOnly/>
                    <label htmlFor="floatingInput">Date</label>
                </div>
                <div className="form-floating mb-3">
                    <Select
                        value={itemName}
                        onChange={handleSelectChange}
                        options={options}
                        isSearchable
                        placeholder="Select an Item"
                        id="floatingInput"
                    /> 
                </div>
                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={quantityInput} required />
                    <label for="floatingInput">Quantity In</label>
                </div>
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} required>
                    <option selected>Select Unit Of Measurement</option> 
                    <option value='Pcs'>Pcs</option>    
                </select>
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={sourceInput} required>
                    <option selected>Select Restock Source</option>
                    <option value='equatorialshop'>From Equatorial Main Shop</option>    
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

export default EquatorialMassageDepartmentInventoryRestockingForm