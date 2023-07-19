import { Row, Col, Form } from "react-bootstrap";
import Navbar from "../../../side navbar/sidenav";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StartBatchFromMotherGarden = () => {
    const [status, setStatus] = useState({})
    const [itemList, setitemList] = useState()
    const [isItemListLoading, setisItemListLoading] = useState(true)
    const [orderId, setOrderId] = useState('')
    const [itemsRequested, setItemsRequested] = useState([{ itemName: '', itemQuantity: '', mUnits: '' },])
    const [additionalInfo, setAdditionalinfo] = useState('')

    const branchRef = useRef()
    const deptRef = useRef()
    const roleRef = useRef()

    const additionalInfoInput = event => {
        event.preventDefault()
        setAdditionalinfo(event.target.value)
    }

    const removeInput = (index) => {
        const values = [...itemsRequested];
        values.splice(index, 1);
        setItemsRequested(values)
    }
    const addNewInput = () => {
        setItemsRequested([...itemsRequested, { itemName: '', itemQuantity: '', mUnits: '' }])
    }

    const handleChangeInput = (index, event) => {
        let values = [...itemsRequested];
        values[index][event.target.name] = event.target.value;
        setItemsRequested(values)
    }

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/itemlist', {
            token: localStorage.getItem("token")
        })
        setitemList(res.data)
        setisItemListLoading(false)
    }

    useEffect(() => {
        fetchItems()
        const interval = setInterval(() => {
            fetchItems()
        }, 5000)


        return () => clearInterval(interval)
    }, [])

    const submitRequestHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/requestseeds', {
            batchNo: `B-${Math.floor(Math.random() * 1800000)}`,
            sourcebranch: localStorage.getItem('branch'),
            orderedbydepartment: localStorage.getItem('department'),
            orderedbyrole: localStorage.getItem('role'),
            orderedby: localStorage.getItem('username'),
            itemsrequested: JSON.stringify(itemsRequested),
            additionalInfo: additionalInfo,
            initialStatus: "approved",
            token: localStorage.getItem("token")
        }).then(() => setStatus({ type: 'success' }))
            .catch((err) => setStatus({ type: 'error', err }))
    }

    return(
        <Row>
                <Col sm='12' md='2' lg='2' xl='2'>
                    <Navbar />
                </Col>
                <Col className="col align-self-center">
                    <h2 style={{ marginTop: '60px', fontSize: '30px', textAlign: 'center' }}>Start Batch Form</h2>
                        <Form>    
                            {status?.type === 'success' && <span style={{ margin: '20px' }} class="alert alert-success" role="alert">Batch successfully registered</span>}
                            {status?.type === 'error' && <span style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error! Request was not submitted</span>}
                            <div style={{ marginTop: '20px' }}>
                                <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Batch Items</h3>
                                    {itemsRequested.map((itemRequested, index) => (
                                        <div style={{borderBottom:'1px dashed black'}} key={index}>
                                            <div className="form-floating mb-3">
                                                <select className="form-select"
                                                            name="itemName"
                                                            aria-label="Default select example"
                                                            placeholder="Item Name"
                                                            onChange={event => handleChangeInput(index, event)}
                                                            value={itemRequested.itemName}
                                                            required>
                                                            <option selected>Filter By Item Name</option>
                                                            {isItemListLoading ? <option>Loading Items From Database</option> :
                                                                itemList.map(item => (
                                                                    <option key={item.name}>
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
                                                            value={itemRequested.itemQuantity}
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
                                                            value={itemRequested.mUnits}
                                                            onChange={event => handleChangeInput(index, event)}
                                                            required>

                                                            <option selected>Measurement</option>
                                                            <option value="Pcs">Pcs</option>
                                                        </select>
                                            </div>
                                            <FontAwesomeIcon onClick={addNewInput} icon={faPlusCircle} style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} />
                                            <FontAwesomeIcon onClick={() => removeInput(index)} icon={faMinusCircle} style={{ color: 'red', fontSize: '30px', marginLeft: '2px', cursor: 'pointer' }} />
                                        </div>
                                    ))
                                    }
                                <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Additional Information</h3>
                                <div className="mb-3">
                                    <div className="form-floating mb-3">
                                        <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE", height: '200px', width: '350px' }} onChange={additionalInfoInput} />
                                        <label for="floatingInput">Additional Information</label>
                                    </div>
                                </div>
                                {/* <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Sender's Data</h3>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('branch')} required readOnly />
                                    <label for="floatingInput">Order From ( Branch )</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('department')} required readOnly />
                                    <label for="floatingInput">Ordered By ( Department )</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('role')} required readOnly />
                                    <label for="floatingInput">Ordered By ( Role )</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('username')} required readOnly />
                                    <label for="floatingInput">Ordered By ( username )</label>
                                </div> */}
                                <div className="mb-3" style={{ textAlign: 'center' }}>
                                    <button style={{ width: "50%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }} onClick={submitRequestHandler}>REGISTER BATCH</button>
                                </div>
                            </div>
                        </Form>
                </Col>
            </Row>
    )
}

export default StartBatchFromMotherGarden