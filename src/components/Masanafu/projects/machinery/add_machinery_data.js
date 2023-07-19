import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { useState, useEffect } from 'react'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const AddmachineryData = () => {
    const [itemsRequired, setItemsRequired] = useState([{ itemName: '', itemQuantity: ''},])
    const [machineryName, setMachineryName] = useState('')
    const [isFetchedProjectsLoading, setIsFetchedProjectsLoading] = useState(true)
    const [fetchedProjects, setFetchedProjects] = useState([])
    const [isFetchedEquipmentLoading, setIsFetchedEquipmentLoading] = useState(true)
    const [fetchedEquipment, setFetchedEquipment] = useState([])
    const [status, setStatus] = useState('')
    const fetchAllMaterials = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallmaterials',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setIsFetchedEquipmentLoading(false)
            setFetchedEquipment(res.data)
        }
        console.log(res.data)
    }

    const fetchAllProjects = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallprojects',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setIsFetchedProjectsLoading(false)
            setFetchedProjects(res.data)
        }
        console.log(res.data)
    }

    useEffect(()=> {
        fetchAllMaterials()
        fetchAllProjects()
    },[])

    const machineryNameInputHandler = event => {
        event.preventDefault()
        setMachineryName(event.target.value)
    }

    const handleChangeInput = (index, event) => {
        let values = [...itemsRequired];
        values[index][event.target.name] = event.target.value;
        setItemsRequired(values)
    }

    
    const removeInput = (index) => {
        const values = [...itemsRequired];
        values.splice(index, 1);
        setItemsRequired(values)
    }

    const addNewInput = () => {
        setItemsRequired([...itemsRequired, { itemName: '', itemQuantity: ''}])
    }

    const saveMachineryDataHandler = async ( event ) => {
        console.log(`name: ${machineryName}`)
        console.log(JSON.stringify(itemsRequired))
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/registermachinerydata', {
             token: localStorage.getItem('token'),
             equipmentName: machineryName,
             itemsRequired: JSON.stringify(itemsRequired)
         })
         console.log(res.data)
         setStatus(res.data.msg)
         window.location.reload();
    }

    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'40px'}}>
        <div>
             <h1 style={{textAlign:'center'}}>Save Project Material Data</h1>
             {(status !== '' && status === 'success') && <span style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</span>}
             {(status !== '' && status !== 'success') && <span style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error</span>}
             
             <div style={{marginTop:'20px'}}>
                 <form>
                     <>     
                            <select class="form-select"
                                name="itemName"
                                aria-label="Default select example"
                                placeholder="Item Name"
                                onChange={machineryNameInputHandler}
                                required>
                                <option defaultValue>Select Project Name</option>
                                {isFetchedProjectsLoading ? <option>Loading Projects From Database</option> :
                                    fetchedProjects.map(item => (
                                    <option value={item.id} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                     </>
                     <>
                        <h3 style={{textAlign:'center'}}>Requirements</h3>
                            {itemsRequired.map((itemRequired, index) => (
                            <div key={index} style={{borderBottom: 'dashed black 1px'}}>
                                <div className="form-floating mb-3">
                                    <select className="form-select"
                                        name="itemName"
                                        aria-label="Default select example"
                                        placeholder="Item Name"
                                        onChange={event => handleChangeInput(index, event)}
                                        value={itemRequired.itemName}
                                        required>
                                        <option defaultValue>Select Requirement Name</option>
                                        {isFetchedEquipmentLoading ? <option>Loading Projects From Database</option> :
                                            fetchedEquipment.map(item => (
                                            <option>
                                                {item.name}
                                            </option>
                                        ))}                                                         
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    name="itemQuantity"
                                    placeholder="Item Quantity"
                                    style={{ color: "#8CA6FE" }}
                                    value={itemRequired.itemQuantity}
                                    onChange={event => handleChangeInput(index, event)}
                                    required />
                                    <label for="floatingInput">Item Quantity</label>
                                </div>
                                <FontAwesomeIcon onClick={() => removeInput(index)} icon={faMinusCircle} style={{ color: 'red', fontSize: '30px', marginLeft: '2px', cursor: 'pointer' }} />
                                <FontAwesomeIcon onClick={addNewInput} icon={faPlusCircle} style={{ color: 'green', fontSize: '30px', cursor: 'pointer', marginLeft: '5px' }} />
                            </div>
                            ))}
                     </>
                     <div className="mb-3" style={{ textAlign: 'center' }}>
                        <button style={{ width: "50%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }} onClick={saveMachineryDataHandler}>SAVE</button>
                     </div>
                 </form>
            </div>
            </div>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'>
        </Col>
    </Row>
    )
}

export default AddmachineryData