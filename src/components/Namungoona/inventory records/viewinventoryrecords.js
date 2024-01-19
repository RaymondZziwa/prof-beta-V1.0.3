import { Row, Col, Form } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../Admin/admin dashboard/adminDashboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const Viewinventoryrecords = () => {
    const [isLoading, setisLoading] = useState(true)
    const [Data, setData] = useState([])
    const [itemList, setitemList] = useState([])
    const [isItemListLoading, setisItemListLoading] = useState(true)
    const [filteredData, setFilteredData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 7

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(Data.length / itemsPerPage)

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/allitemslist', {
            token: localStorage.getItem("token")
        })

        if(Array.isArray(res.data)){
            setisItemListLoading(false)
            const filteredItems = res.data.filter((item)=> item.category !== 'seed')
            setitemList(filteredItems)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])


    const fetchData = async () => {
        let res = await axios.post('http://82.180.136.230:3005/inventoryrecords', {
            token: localStorage.getItem("token")
        })
        if(Array.isArray(res.data)){
            setData(res.data)
            setisLoading(false)
        }
    }

    useEffect(()=> {
         fetchData()
    },[])

    const itemNameInput = event => {
        event.preventDefault()
        let itemName = event.target.value

        if(Data.length > 0){
            const filteredRecords = Data.filter((record)=>record.inventoryname === itemName)
            setFilteredData(prevFilteredData => [...filteredRecords])
        }
    }

    const filterInput = event => {
        event.preventDefault()
        let category = event.target.value
        if(Data.length > 0){
            const filteredRecords = Data.filter((record)=>record.category === category)
            setFilteredData(prevFilteredData => [...filteredRecords])
        }
    }
    const dateInput = event => {
        event.preventDefault()
        let date = event.target.value
        
        if(Data.length > 0){
            const filteredRecords = Data.filter((record)=>record.date === date)
            setFilteredData(filteredRecords)
        }
    }
    const sourceBranchInput = event => {
        event.preventDefault()
        let sBranch = event.target.value

        if(Data.length > 0){
            const filteredRecords = Data.filter((record)=>record.sourcebranch === sBranch)
            setFilteredData(prevFilteredData => [...filteredRecords])
        }
    }

    const destBranchInput = event => {
        event.preventDefault()
        let destBranch = event.target.value

        if(Data.length > 0){
            const filteredRecords = Data.filter((record)=>record.destinationbranch === destBranch)
            setFilteredData(prevFilteredData => [...filteredRecords])
        }
    }
    
    return (
        <div className='container-fluid'>
            <Row style={{marginTop:'60px'}}>
                <Col sm='12' md='12' lg='12' xl='12'>
                    {localStorage.getItem("branch") !== 'admin' ? <Navbar /> : <AdminNavbar />}
                    <h1 style={{textAlign:'center'}}>Inventory Records</h1>
                    <Form>
                        Filters:
                        <select class="form-select" id='fil' aria-label="Default select example" onChange={itemNameInput} required>
                            <option selected>Filter By Item Name</option>
                            {isItemListLoading ? <option>Loading Items From Database</option> :
                                itemList.map(item => (
                                    <option>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                        <select class="form-select" id='fil' aria-label="Default select example" onChange={filterInput}>
                            <option value="">Filter Records</option>
                            <option value="outgoing">Outgoing</option>
                            <option value="incoming">Incoming</option>
                        </select>
                        <select class="form-select" id='fil' aria-label="Default select example" onChange={sourceBranchInput}>
                            <option value="">Source Branch</option>
                            <option value="external-supplier">External Suppliers</option>
                            <option value="masanafu">Masanafu Branch</option>
                            <option value="buwama">Buwama Branch</option>
                            <option value="equatorial">Equatorial Branch</option>
                            <option value="namungoona">Namungoona Branch</option>
                        </select>
                        <select class="form-select" id='fil' aria-label="Default select example" onChange={destBranchInput}>
                            <option value="">Destination Branch</option>
                            <option value="namungoona">Namungoona Branch</option>
                            <option value="masanafu">Masanafu Branch</option>
                            <option value="buwama">Buwama Branch</option>
                            <option value="equatorial">Equatorial Branch</option>
                        </select>
                        <input class="form-control" id='fil' type='date' placeholder='Filter by date' onChange={dateInput} />
                    </Form>
                    <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Reason</th>
                                <th scope="col">Additional Notes</th>
                                <th scope="col">Source Branch</th>
                                <th scope="col">Delivered By</th>
                                <th scope="col">Destination Branch</th>
                                <th scope="col">Taken By</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Actual Quantity</th>
                                <th scope="col">Damages</th>
                                <th scope="col">Expected Output</th>
                                <th scope="col">Category</th>
                                <th scope="col">Authorized By</th>

                            </tr>
                        </thead>
                        <tbody>
                            {(filteredData.length !== 0 && !isLoading) ? 
                                filteredData.slice(startIndex, endIndex).map(item => (
                                    <tr>
                                        <td>{item.date}</td>
                                        <td>{item.inventoryname}</td>
                                        <td>{item.reason}</td>
                                        <td>{item.additionalnotes}</td>
                                        <td>{item.sourcebranch}</td>
                                        <td>{item.broughtby}</td>
                                        <td>{item.destinationbranch}</td>
                                        <td>{item.recievedby}</td>
                                        <td>{item.quantity} {item.measurementunit}</td>
                                        <td>{item.actualquantity} {item.measurementunit}</td>
                                        <td>{item.damages} {item.measurementunit}</td>
                                        <td>{item.expectedoutput}</td>
                                        <td>{item.category}</td>
                                        <td>{item.authorizedby}</td>
                                    </tr>
                                )) :
                                Data.slice(startIndex, endIndex).map(item => (
                                    <tr>
                                        <td>{item.date}</td>
                                        <td>{item.inventoryname}</td>
                                        <td>{item.reason}</td>
                                        <td>{item.additionalnotes}</td>
                                        <td>{item.sourcebranch}</td>
                                        <td>{item.broughtby}</td>
                                        <td>{item.destinationbranch}</td>
                                        <td>{item.recievedby}</td>
                                        <td>{item.quantity} {item.measurementunit}</td>
                                        <td>{item.actualquantity} {item.measurementunit}</td>
                                        <td>{item.damages} {item.measurementunit}</td>
                                        <td>{item.expectedoutput}</td>
                                        <td>{item.category}</td>
                                        <td>{item.authorizedby}</td>
                                    </tr>
                                ))
                            }                           
                        </tbody>
                    </table>
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                        <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPage} of {totalPages}</span>
                            <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default Viewinventoryrecords