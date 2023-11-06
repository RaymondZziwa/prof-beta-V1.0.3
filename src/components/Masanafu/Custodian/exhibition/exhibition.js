import { Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../../side navbar/sidenav";
import { useState, useEffect, useRef } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Exhibitionmanagement = () => {
    const [status, setStatus] = useState()
    const [itemsRequested, setItemsRequested] = useState([{ itemName: '', itemQuantity: '',itemQuantitySold:'0', itemQuantityReturned: '0',Discrepancies:'0', mUnits: '' },])
    const [itemsPostRequested, setItemsPostRequested] = useState([{ itemName: '', itemQuantity: '',itemQuantitySold: '', itemQuantityReturned: '',Discrepancies:'', mUnits: '' },])
    const [itemList, setitemList] = useState()
    const [isItemListLoading, setisItemListLoading] = useState(true)
    const [formType, setFormType] = useState()

    const [exList, setExList] = useState()
    const [isExListLoading, setIsExListLoading] = useState(true)

    const [exhibitionName, setExhibitionName] = useState()
    const [exDate, setExDate] = useState()

    const [isExDataLoading, setIsExDataLoading] = useState(true)

    const [selectedExhibitionName, setSelectedExhibitionName] = useState()

    const exhibitionDate = useRef()
    const [fetchedData, setFetchedData] = useState()

    const selectedExibitionInput = event => {
        event.preventDefault()
        setSelectedExhibitionName(event.target.value)
    }

    const handleFormType = event => {
        event.preventDefault()
        setFormType(event.target.value)
    }
    const removeInput = (index) => {
        const values = [...itemsRequested];
        values.splice(index, 1);
        setItemsRequested(values)
    }

    const addNewInput = () => {
        setItemsRequested([...itemsRequested, { itemName: '', itemQuantity: '0',itemQuantitySold: '0', itemQuantityReturned: '0',Discrepancies:'0', mUnits: '' }])
    }

    const handleChangeInput = (index, event) => {
        let values = [...itemsRequested];
        values[index][event.target.name] = event.target.value;
        setItemsRequested(values)
    }

    const handlePostInput = (index, event) => {
        let values = [...itemsPostRequested];
        values[index][event.target.name] = event.target.value;
        setItemsPostRequested(values)
        console.log(index)
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
        const interval = setTimeout(() => {
            fetchItems()
        }, 5000)


        return () => clearTimeout(interval)
    }, [])


    const fetchExhibitionList = async () => {
        const res = await axios.post('http://82.180.136.230:3005/exhibitionlist', {
            token: localStorage.getItem("token")
        })
        if(typeof res.data === 'string'){
            setExList('There are no exhibitions saved in the database')
        }else{
            setExList(res.data)
            setIsExListLoading(false)
        }
        
    }

    useEffect(() => {
        fetchItems()
        const interval = setInterval(() => {
            fetchExhibitionList()
        }, 3000)


        return () => clearInterval(interval)
    }, [])

    const exNameInput = event => {
        event.preventDefault()
        setExhibitionName(event.target.value)
    }
    const dateInput = event => {
        event.preventDefault()
        setExDate(event.target.value)
    }

    const calcDecrepancies = (itemQuantity,itemQuantitySold,itemQuantityReturned) => {
       let decrepancy =  parseFloat(itemQuantity)-(parseFloat(itemQuantitySold)+parseFloat(itemQuantityReturned))

       return decrepancy;
    }

    
    const fetchExhibitionData = async event => {
        event.preventDefault()
        const res = await axios.post('http://82.180.136.230:3005/exhibitiondata', {
            exhibitionName: selectedExhibitionName,
            exhibitionDate: exhibitionDate.current.value,
            token: localStorage.getItem("token")
        })
        if (typeof res.data === 'string') {
            setIsExDataLoading(true)
        } else {
            const items = res.data.map(item => {
                const parsed = JSON.parse(item.itemsrecord);
                return parsed;
            });
            setItemsPostRequested(items.flat())
            setFetchedData(res.data)
            setIsExDataLoading(false)
            console.log('items requested', itemsPostRequested)
            console.log('fetched Data', fetchedData)
        }
    }


    const submitDataHandler = async event => {
        event.preventDefault()
        console.log(itemsRequested)
        console.log(itemsPostRequested)
        if (formType === 'preexhibition') {
            let res = await axios.post('http://82.180.136.230:3005/saveexhibitiondata', {
                exhibitionName: exhibitionName,
                date: exDate,
                items: JSON.stringify(itemsRequested),
                filledfrombranch: localStorage.getItem('branch'),
                filledbydepartment: localStorage.getItem('department'),
                filledbyrole: localStorage.getItem('role'),
                filledbyuser: localStorage.getItem('username'),
                status: formType,
                token: localStorage.getItem("token")
            }).then(() => setStatus({ type: 'success' }))
              .catch((err) => setStatus({ type: 'error', err }))
        }else if (formType === 'postexhibition'){
            itemsPostRequested.map((item) => {
               let totalItemsAccountedFor = parseFloat(item.itemQuantitySold) + parseFloat(item.itemQuantityReturned)
            //    console.log(`items sold are ${item.itemQuantitySold} and items returned are ${item.itemQuantityReturned} and the 
            //    total number of items accounted for is ${totalItemsAccountedFor}`)
               item.Discrepancies = item.itemQuantity - totalItemsAccountedFor
            })
            // console.log('checking if discrepancies have been calculated', itemsPostRequested)
             let res = await axios.post('http://82.180.136.230:3005/saveexhibitiondata', {
                  exhibitionName: selectedExhibitionName,
                  date: exhibitionDate.current.value,
                  items: JSON.stringify(itemsPostRequested),
                  status: formType,
                 token: localStorage.getItem("token")
              })
              if(typeof res.data === 'string'){
                 setStatus('Post exhibition data has been successfully saved.')
              }
        }
    }

    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='2' md='1' lg='1' xl='1'></Col>
                <Col sm='12' md='10' lg='10' xl='10'>
                    <div className="container  d-flex align-items-center" style={{ marginTop: '50px' }}>

                        <Form>
                            <h2 style={{ marginTop: '10px', fontSize: '50px', textAlign: 'center' }}>Exhibition Management</h2>
                            {status?.type === 'success' && <span style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</span>}
                            {status?.type === 'error' && <span style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</span>}
                            <div style={{ marginTop: '20px' }}>
                                <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Exhibition Form Type</h3>
                                <div className="mb-3">
                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={handleFormType}>
                                        <option selected>Form Type</option>
                                        <option value="preexhibition">Pre-Exhibition</option>
                                        <option value="postexhibition">Post-Exhibition</option>
                                    </select>
                                </div>
                                {formType === 'preexhibition' &&
                                    <>
                                        <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Exhibition Data</h3>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="floatingInput" placeholder="Exhibition Name" style={{ color: "#8CA6FE" }} onChange={exNameInput} required />
                                            <label for="floatingInput">Exhibition Name</label>
                                        </div><br></br>
                                        <div className="form-floating mb-3">
                                            <input type='date' className="form-control" id="floatingInput" placeholder="Exhibition Date" style={{ color: "#8CA6FE" }} onChange={dateInput} required />
                                            <label for="floatingInput">Exhibition Date</label>
                                        </div><br></br>
                                        <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Items Data</h3>
                                        <table className="table" style={{ marginTop: '10px' }}>
                                            <thead>
                                                <tr style={{ textAlign: 'center' }}>
                                                    <th scope="col">Item Name</th>
                                                    <th scope="col">Quantity Taken</th>
                                                    <th scope="col">Unit Of Measurement</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {itemsRequested.map((itemRequested, index) => (

                                                    <tr key={index}>
                                                        <td>
                                                            <div className="form-floating mb-3">
                                                                <select class="form-select"
                                                                    name="itemName"
                                                                    aria-label="Default select example"
                                                                    placeholder="Item Name"
                                                                    onChange={event => handleChangeInput(index, event)}
                                                                    value={itemRequested.itemName}
                                                                    required>
                                                                    <option selected>Filter By Item Name</option>
                                                                    {isItemListLoading ? <option>Loading Items From Database</option> :
                                                                        itemList.map(item => (
                                                                            <option>
                                                                                {item.name}
                                                                            </option>
                                                                        ))}
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-floating mb-3">
                                                                <input type="text"
                                                                    className="form-control"
                                                                    id="floatingInput"
                                                                    name="itemQuantity"
                                                                    placeholder="Item Quantity"
                                                                    style={{ color: "#8CA6FE" }}
                                                                    value={itemRequested.itemQuantity}
                                                                    onChange={event => { handleChangeInput(index, event) }}
                                                                    required />
                                                                <label for="floatingInput">Item Quantity</label>
                                                            </div>
                                                        </td>

                                                        <td>

                                                            <div className="form-floating mb-3">
                                                                <select
                                                                    class="form-select"
                                                                    aria-label="Default select example"
                                                                    style={{ height: "60px", color: "#8CA6FE" }}
                                                                    placeholder="mUnits"
                                                                    name="mUnits"
                                                                    value={itemRequested.mUnits}
                                                                    onChange={event => handleChangeInput(index, event)}
                                                                    required>

                                                                    <option selected>Measurement</option>
                                                                    <option value="L">Litres</option>
                                                                    <option value="KG">Kilograms</option>
                                                                    <option value="MLS">Milliliters</option>
                                                                    <option value="Pcs">Pcs</option>
                                                                    <option disabled>---grams packaging sizes---</option>
                                                                    <option value="10grampcs">10 grams Pcs</option>
                                                                    <option value="20grampcs">20 grams Pcs</option>
                                                                    <option value="50grampcs">50 grams Pcs</option>
                                                                    <option value="100grampcs">100 grams Pcs</option>
                                                                    <option value="250grampcs">250 grams Pcs</option>
                                                                    <option value="350grampcs">350 grams Pcs</option>
                                                                    <option value="400grampcs">400 grams Pcs</option>
                                                                    <option value="450grampcs">450 grams Pcs</option>
                                                                    <option value="500grampcs">500 grams Pcs</option>
                                                                    <option value="700grampcs">700 grams Pcs</option>
                                                                    <option value="750grampcs">750 grams Pcs</option>
                                                                    <option disabled>---mls packaging sizes---</option>
                                                                    <option value="10mlpcs">10 mls Pcs</option>
                                                                    <option value="20mlpcs">20 mls Pcs</option>
                                                                    <option value="50mlpcs">50 mls Pcs</option>
                                                                    <option value="100mlpcs">100 mls Pcs</option>
                                                                    <option value="250mlpcs">250 mls Pcs</option>
                                                                    <option value="350mlpcs">350 mls Pcs</option>
                                                                    <option value="500mlpcs">500 mls Pcs</option>
                                                                    <option value="550mlpcs">550 mls Pcs</option>
                                                                    <option value="600mlpcs">600 mls Pcs</option>
                                                                    <option value="650mlpcs">650 mls Pcs</option>
                                                                    <option value="700mlpcs">700 mls Pcs</option>
                                                                    <option value="750mlpcs">750 mls Pcs</option>
                                                                </select>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <FontAwesomeIcon onClick={addNewInput} icon={faPlusCircle} style={{ color: 'green', fontSize: '60px', cursor: 'pointer' }} />
                                                            <FontAwesomeIcon onClick={() => removeInput(index)} icon={faMinusCircle} style={{ color: 'red', fontSize: '60px', marginLeft: '2px', cursor: 'pointer' }} />
                                                        </td>

                                                    </tr>

                                                ))
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                }

                                {formType === 'postexhibition' &&
                                    <>
                                        <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Exhibition Data</h3>
                                        <div className="form-floating mb-3">
                                            <select class="form-select"
                                                name="itemName"
                                                aria-label="Default select example"
                                                placeholder="Item Name"
                                                onChange={selectedExibitionInput}
                                                required>
                                                <option selected>Filter By Exhibition Name</option>
                                                {isExListLoading ? <option>{exList}</option> :
                                                    exList.map(exhibition => (
                                                        <option>
                                                            {exhibition.exhibitionname}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div><br></br>
                                        <div className="form-floating mb-3">
                                            <input type='date' className="form-control" id="floatingInput" placeholder="Exhibition Date" style={{ color: "#8CA6FE" }} ref={exhibitionDate}
                                                required />
                                            <label for="floatingInput">Exhibition Date</label>
                                        </div><br></br>
                                        <button className="btn btn-primary" onClick={fetchExhibitionData}>Retrieve Data</button>



                                        <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Items Data</h3>
                                        <table className="table" style={{ marginTop: '10px' }}>
                                            <thead>
                                                <tr style={{ textAlign: 'center' }}>
                                                    <th scope="col">Item Name</th>
                                                    <th scope="col">Quantity Taken</th>
                                                    <th scope="col">Quantity Sold</th>
                                                    <th scope="col">Quantity Returned</th>
                                                    <th scope="col">Unit Of Measurement</th>
                                                </tr>
                                            </thead>

                                            <tbody style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                {isExDataLoading ? <tr>There is no Exhibition Data From Database. Please edit the parameters.</tr> :
                                                    itemsPostRequested.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="form-floating mb-3">
                                                                    <input class="form-select"
                                                                        name="itemName"
                                                                        aria-label="Default select example"
                                                                        placeholder="Item Name"
                                                                        onChange={event => handlePostInput(index, event)}
                                                                        value={item.itemName}
                                                                        readOnly
                                                                        required />
                                                                    <label for="floatingInput">Item Name</label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="form-floating mb-3">
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        id="floatingInput"
                                                                        name="itemQuantity"
                                                                        placeholder="Item Quantity"
                                                                        style={{ color: "#8CA6FE" }}
                                                                        value={item.itemQuantity}
                                                                        onChange={event => { handlePostInput(index, event) }}
                                                                        required />
                                                                    <label for="floatingInput">Item Quantity</label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="form-floating mb-3">
                                                                    <input
                                                                        className="form-control"
                                                                        id="floatingInput"
                                                                        name="itemQuantitySold"
                                                                        placeholder="Item Quantity Sold"
                                                                        style={{ color: "#8CA6FE" }}
                                                                        defaultValue={item.itemQuantitySold}
                                                                        onChange={event => { handlePostInput(index, event) }}
                                                                        required />
                                                                    <label for="floatingInput">Item Quantity Sold</label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="form-floating mb-3">
                                                                    <input
                                                                        className="form-control"
                                                                        id="floatingInput"
                                                                        name="itemQuantityReturned"
                                                                        placeholder="Item Quantity"
                                                                        style={{ color: "#8CA6FE" }}
                                                                        defaultValue={item.itemQuantityReturned}
                                                                        onChange={event => { handlePostInput(index, event) }}
                                                                        required />
                                                                    <label for="floatingInput">Item Quantity Returned</label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="form-floating mb-3">
                                                                    <input
                                                                        class="form-select"
                                                                        aria-label="Default select example"
                                                                        style={{ height: "60px", color: "#8CA6FE" }}
                                                                        placeholder="mUnits"
                                                                        name="mUnits"
                                                                        value={item.mUnits}
                                                                        onChange={event => handlePostInput(index, event)}
                                                                        readOnly
                                                                        required />
                                                                    <label for="floatingInput">Measurement Units</label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                }
                                <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Official's Data</h3>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('branch')} required readOnly />
                                    <label for="floatingInput">Filled From ( Branch )</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('department')} required readOnly />
                                    <label for="floatingInput">Filled By ( Department )</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('role')} required readOnly />
                                    <label for="floatingInput">Filled By ( Role )</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('username')} required readOnly />
                                    <label for="floatingInput">Filled By ( username )</label>
                                </div>
                                <div className="mb-3" style={{ textAlign: 'center' }}>
                                    <button style={{ width: "50%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }} onClick={submitDataHandler}>SAVE DATA</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Col>
                <Col sm='12' md='1' lg='1' xl='1'>
                    <Navbar />
                </Col>
            </Row>
        </div>
    );
}
export default Exhibitionmanagement
