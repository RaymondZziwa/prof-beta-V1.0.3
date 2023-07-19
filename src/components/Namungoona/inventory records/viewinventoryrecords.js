import { Row, Col, Form } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../Admin/admin dashboard/adminDashboard'
const Viewinventoryrecords = () => {
    const [isLoading, setisLoading] = useState(true)
    const [Filter, setFilter] = useState('')
    const [Data, setData] = useState([])
    const [sourceBranch, setsourceBranch] = useState('')
    const [destBranch, setdestBranch] = useState('')
    const [date, setdate] = useState('')
    const [itemList, setitemList] = useState()
    const [itemName, setitemName] = useState('')
    const [isItemListLoading, setisItemListLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(12);

    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const currentrecords = Data.slice(indexOfFirstPost, indexOfLastPost);

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/itemlist', {
            token: localStorage.getItem("token")
        })
        setitemList(res.data)
        setisItemListLoading(false)
    }

    useEffect(() => {
        fetchItems()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (Filter === 'incoming') {
                setdestBranch(localStorage.getItem('branch'))
            } else if (Filter === 'outgoing') {
                setsourceBranch(localStorage.getItem('branch'))
            }
        }, 1000)


        return () => clearInterval(interval)
    }, [Filter])

    const filterData = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/inventoryrecords', {
            branch: localStorage.getItem('branch'),
            role: localStorage.getItem('role'),
            department: localStorage.getItem('department'),
            itemName: itemName,
            filter: Filter,
            sourceBranch: sourceBranch,
            destBranch: destBranch,
            date: date,
            token: localStorage.getItem("token")
        })
        if(Array.isArray(res.data)){
            setData(res.data)
            setisLoading(false)
        }else{
            console.log('np data')
        }
    }

    const fetchData = async () => {
        let res = await axios.post('http://82.180.136.230:3005/inventoryrecords', {
            branch: localStorage.getItem('branch'),
            role: localStorage.getItem('role'),
            department: localStorage.getItem('department'),
            itemName: itemName,
            filter: Filter,
            sourceBranch: sourceBranch,
            destBranch: destBranch,
            date: date,
            token: localStorage.getItem("token")
        })
        if(Array.isArray(res.data)){
            setData(res.data)
            setisLoading(false)
        }
    }

    // useEffect(()=> {
    //     fetchData()
    // },[])

    const itemNameInput = event => {
        event.preventDefault()
        setitemName(event.target.value)
    }

    const filterInput = event => {
        event.preventDefault()
        setFilter(event.target.value)
    }
    const dateInput = event => {
        event.preventDefault()
        setdate(event.target.value)
    }
    const sourceBranchInput = event => {
        event.preventDefault()
        setsourceBranch(event.target.value)
    }
    const destBranchInput = event => {
        event.preventDefault()
        setdestBranch(event.target.value)
    }
    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    {localStorage.getItem("branch") !== 'admin' ? <Navbar /> : <AdminNavbar />}
                    <Form>
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
                            <option value="namungoona">Namungoona Branch</option>
                            <option value="masanafu">Masanafu Branch</option>
                            <option value="buwama">Buwama Branch</option>
                            <option value="equatorial">Equatorial Branch</option>
                        </select>
                        <select class="form-select" id='fil' aria-label="Default select example" onChange={destBranchInput}>
                            <option value="">Destination Branch</option>
                            <option value="namungoona">Namungoona Branch</option>
                            <option value="masanafu">Masanafu Branch</option>
                            <option value="buwama">Buwama Branch</option>
                            <option value="equatorial">Equatorial Branch</option>
                        </select>
                        <input class="form-control" id='fil' type='date' placeholder='Filter by date' onChange={dateInput} />
                        <button class='btn btn-primary' style={{ cursor: 'pointer' }} onClick={ filterData }>Filter</button>
                    </Form>
                    <table className="table table-dark">
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
                            {(!isLoading && Data.length > 0) ? <tr><td>Apply filters to load data</td></tr> :
                                Data.map(item => (
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
                                ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    )
}

export default Viewinventoryrecords