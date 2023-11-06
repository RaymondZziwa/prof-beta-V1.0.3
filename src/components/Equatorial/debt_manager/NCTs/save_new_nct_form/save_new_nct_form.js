import { Row, Col } from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from "axios"

const SaveNewNctForm = ({fetchNCTRecords}) => {
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [contact, setContact] = useState('')
    const [itemIn, setItemIn] = useState('')
    const [quantityIn, setQuantityIn] = useState('')
    const [unitsIn, setUnitsIn] = useState('')
    const [itemOut, setItemOut] = useState('')
    const [quantityOut, setQuantityOut] = useState('')
    const [unitsOut, setUnitsOut] = useState('')
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [itemList, setitemList] = useState('')

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
      }, [status]);


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://82.180.136.230:3005/equatorialsavenewnct', {
                token: localStorage.getItem('token'),
                date: new Date().toLocaleString(),
                customerNames: `${fName.toUpperCase().trim()} ${lName.toUpperCase().trim()}`,
                customerContact: contact,
                itemIn: itemIn,
                quantityIn: quantityIn,
                unitsIn: unitsIn,
                itemOut: itemOut,
                quantityOut: quantityOut,
                unitsOut: unitsOut,
                authorizedBy: localStorage.getItem('username'),
                notes: notes
            });
    
            // Assuming that setStatus and fetchNCTRecords are state functions
            setStatus({ type: 'success' });
            fetchNCTRecords(); // Make sure this function is defined and does what's intended
        } catch (error) {
            setStatus({ type: 'error', err: error });
        }
    }
    return(
        <div className="col align-self-center" style={{marginTop:'40px'}}>
            <Row>
                <Col sm='12' md='1' lg='1' xl='1'></Col> 
                <Col sm='12' md='10' lg='10' xl='10'>
                    {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                    {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                            <form>
                            <Row>
                                <Col sm='12' md='4' lg='4' xl='4' style={{borderRight:'1px black dashed'}}>
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            //value={firstName}
                                            onChange={(e)=>setFName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        //value={lastName}
                                        onChange={(e)=>setLName(e.target.value)}
                                        required
                                    />
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Phone Contact
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        //value={lastName}
                                        onChange={(e)=>setContact(e.target.value)}
                                        required
                                    />
                                    </div>
                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={(e)=>setItemIn(e.target.value)} required>
                                        <option selected>Item Name In</option>
                                            { isItemListLoading ? <option>Loading Items From Database</option> :
                                                itemList.map(item => (
                                                    <option key={item.productId} value={item.productId}>
                                                        {item.productName}
                                                    </option>
                                                ))
                                            }
                                    </select>
                                   
                                </Col>
                                <Col sm='12' md='4' lg='4' xl='4' style={{borderRight:'1px black dashed'}}>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Quantity In
                                    </label>
                                    <input
                                        className="form-control"
                                        id="lastName"
                                        //value={lastName}
                                        onChange={(e)=>setQuantityIn(e.target.value)}
                                        required
                                    />
                                    </div>
                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={(e)=> setUnitsIn(e.target.value)} required>
                                        <option selected>Select Unit Of Measurement</option> 
                                        <option value='Pcs'>Pcs</option>
                                        <option value='Kgs'>Kgs</option> 
                                        <option value='L'>Litres</option>       
                                    </select>
                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={(e)=>setItemOut(e.target.value)} required>
                                        <option selected>Item Name Out</option>
                                            { isItemListLoading ? <option>Loading Items From Database</option> :
                                                itemList.map(item => (
                                                    <option key={item.productId} value={item.productId}>
                                                        {item.productName}
                                                    </option>
                                                ))
                                            }
                                    </select>
                                    <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Quantity Out
                                    </label>
                                    <input
                                        className="form-control"
                                        id="lastName"
                                        //value={lastName}
                                      onChange={(e)=>setQuantityOut(e.target.value)}
                                        required
                                    />
                                    </div>
                            
                                </Col>
                                <Col sm='12' md='4' lg='4' xl='4'>
                                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={(e)=> setUnitsOut(e.target.value)} required>
                                        <option selected>Select Unit Of Measurement</option> 
                                        <option value='Pcs'>Pcs</option>
                                        <option value='Kgs'>Kgs</option> 
                                        <option value='L'>Litres</option>       
                                    </select>
                                <div className="mb-3">
                            <div className="form-floating mb-3">
                                <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE", height: '130px', width: '300px' }} onChange={(e)=> setNotes(e.target.value)} />
                                <label for="floatingInput">Notes</label>
                            </div>
                        </div>     
                            <button type="submit" style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop:'20px'}} onClick={handleSubmit}>
                                Save
                            </button>
    
                                </Col>
                            </Row>
                        </form>
                </Col>
                <Col sm='12' md='1' lg='1' xl='1'></Col> 
            </Row>
        </div>
    )
}
export default SaveNewNctForm