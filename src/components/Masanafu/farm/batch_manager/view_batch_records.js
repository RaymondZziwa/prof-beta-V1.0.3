import { Row, Col } from "react-bootstrap";
import Navbar from "../../../side navbar/sidenav";
import { useState, useEffect } from 'react'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const ViewBatchRecords = () => {
    const [isExListLoading, setIsExListListLoading] = useState(true)
    const [exList, setExList] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [filteredData, setFilteredData] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const itemsPerPage = 3

    useEffect(()=>{
        if(filteredData.length > 0){
            setStartIndex((currentPage - 1) * itemsPerPage)
            setEndIndex(startIndex + itemsPerPage)

            setTotalPages(Math.ceil(filteredData.length / itemsPerPage))

        }else{
            setStartIndex((currentPage - 1) * itemsPerPage)
            setEndIndex(startIndex + itemsPerPage);

            setTotalPages(Math.ceil(exList.length / itemsPerPage))
        }
    },[filteredData, exList, currentPage, startIndex])

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
    };


    const fetchRecordList = async () => {
        const res = await axios.post('http://82.180.136.230:3005/viewfarmrecords', {
            token: localStorage.getItem("token")
        })
        if (typeof res.data === 'string') {
            setIsExListListLoading(true)
        } else {
            const recordsWithDates = res.data.map(record => ({
                ...record,
                date: new Date(record.stagestartedon),
            }));
            const sortedRecords = recordsWithDates.sort((a, b) => b.stagestartedon - a.stagestartedon);

            setExList(sortedRecords)
            setIsExListListLoading(false)
        }
    }

    useEffect(() => {
        fetchRecordList()
    }, [])

    const filterData = event => {
        let input = event.target.value
        setCurrentPage(1)

        if(exList.length > 0){
            let FilteredRecords = exList.filter((record)=>{
                return record.stage === input 
            })
            setFilteredData(FilteredRecords)
        }
    }


    return(
        <>
             <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', marginTop: '100px'}}>BATCH STATUS RECORDS</h2>
                        <h5>Filter by stage:</h5>
                        <span>
                                    <select className="form-select" aria-label="Default select example" style={{ height: "40px" }} onChange={filterData}>
                                        <option defaultValue>Select Stage</option>
                                        <option value="">All</option>
                                        <option value="incubator">Incubator</option>
                                        <option value="nursery">Nursery</option>
                                        <option value="sent to general store">Store</option>
                                    </select>
                        </span>
                        <table className="table table-light" style={{ marginTop: '50px' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Batch No.</th>
                                    <th scope="col">Items</th>
                                    <th scope="col">Stage</th>
                                    <th scope="col">Stage Started On</th>
                                </tr>
                            </thead>
                            <tbody>
                            {(!isExListLoading && filteredData.length === 0)  ? exList.slice(startIndex, endIndex).map((item) => (
                                    <tr>
                                    <td>{item.batchno}</td>
                                    <td>
                                        <table className="table table-light" style={{ marginTop: '2px' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Item Name</th>
                                                    <th scope="col">Initial Quantity</th>
                                                    <th scope="col">Remaining Quantity</th>
                                                    <th scope="col">Quantity Damaged In Previous Stage</th>
                                                    <th scope="col">Units Of Measurement</th>

                                                </tr>
                                            </thead>
                                            <tbody style={{ textAlign: 'center' }}>
                                                {JSON.parse(item.items).map(itemrecord =>
                                                    <tr>
                                                        <td>{itemrecord.itemName}</td>
                                                        <td>{itemrecord.itemQuantity}</td>
                                                        <td>{itemrecord.itemNewQuantity}</td>
                                                        <td>{itemrecord.Damages}</td>
                                                        <td>{itemrecord.mUnits}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>{item.stage}</td>
                                    <td>{item.stagestartedon}</td>

                                </tr>
                                ))
                                : 
                                filteredData.slice(startIndex, endIndex).map((item) => (
                                    <tr>
                                            <td>{item.batchno}</td>
                                            <td>
                                                <table className="table table-light" style={{ marginTop: '2px' }}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Item Name</th>
                                                            <th scope="col">Initial Quantity</th>
                                                            <th scope="col">Remaining Quantity</th>
                                                            <th scope="col">Quantity Damaged In Previous Stage</th>
                                                            <th scope="col">Units Of Measurement</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ textAlign: 'center' }}>
                                                        {JSON.parse(item.items).map(itemrecord =>
                                                            <tr>
                                                                <td>{itemrecord.itemName}</td>
                                                                <td>{itemrecord.itemQuantity}</td>
                                                                <td>{itemrecord.itemNewQuantity}</td>
                                                                <td>{itemrecord.Damages}</td>
                                                                <td>{itemrecord.mUnits}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td>{item.stage}</td>
                                            <td>{item.stagestartedon}</td>

                                        </tr>
                                ))}
                            </tbody>
                        </table>
                        {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                    <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPage} of {totalPages}</span>
                        <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                    </div>)}
                    </Col>
                    <Col sm='12' md='2' lg='2' xl='2'>
                        <Navbar />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ViewBatchRecords