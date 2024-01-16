import { Row, Col } from "react-bootstrap";
import Navbar from "../../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const ProjectsRecords = () => {
    const [recordsList, setRecordsList] = useState([])
    const [isRecordsListLoading, setIsRecordsListLoading] = useState(true)
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

            setTotalPages(Math.ceil(recordsList.length / itemsPerPage))
        }
    },[filteredData, recordsList, currentPage, startIndex])

    const fetchProjectsRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallprojectsrecords', {
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setIsRecordsListLoading(false)
            setRecordsList(res.data) 
        }

    }

    useEffect(() => {
        fetchProjectsRecords()
    },[])
    return (
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                        <h2 style={{textAlign:'center', marginTop:'100px'}}>MASANAFU PROJECTS DELIVERY RECORDS</h2>
                        <table className="table table-light" style={{ marginTop: '10px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Delivery Date</th>
                                    <th scope="col">Item Ordered</th>
                                    <th scope="col">Ordered Items Not Delivered</th>
                                </tr>
                            </thead>
                            <tbody>
                            {(!isRecordsListLoading && filteredData.length === 0)  ? recordsList.slice(startIndex, endIndex).map((item) => (
                                   <tr>
                                   <td>{item.orderid}</td>
                                   <td>{item.deliverydate}</td>
                                   <td>
                                   <table className="table table-light" style={{ marginTop: '2px' }}>
                                           <thead>
                                               <tr>
                                                   <th scope="col">Item Name</th>
                                                   <th scope="col">Quantity</th>
                                                   <th scope="col">Units Of Measurement</th>
                                               </tr>
                                           </thead>
                                           <tbody style={{ textAlign: 'center' }}>
                                               {JSON.parse(item.itemsordered).map(itemordered =>
                                                   <tr>
                                                       <td>{itemordered.itemName}</td>
                                                       <td>{itemordered.itemQuantity}</td>
                                                       <td>{itemordered.mUnits}</td>
                                                   </tr>
                                               )}
                                           </tbody>
                                       </table>
                                   </td>
                                   <td>{item.orderedquantitynotdelivered}</td>
                               </tr>
                                ))
                                : 
                                filteredData.slice(startIndex, endIndex).map((item) => (
                                    <tr>
                                        <td>{item.orderid}</td>
                                        <td>{item.deliverydate}</td>
                                        <td>
                                        <table className="table table-light" style={{ marginTop: '2px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Units Of Measurement</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(item.itemsordered).map(itemordered =>
                                                        <tr>
                                                            <td>{itemordered.itemName}</td>
                                                            <td>{itemordered.itemQuantity}</td>
                                                            <td>{itemordered.mUnits}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>{item.orderedquantitynotdelivered}</td>
                                    </tr>
                                ))}
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
                    <Col sm='12' md='2' lg='2' xl='2'>
                        <Navbar />
                    </Col>
                </Row>
    )
}

export default ProjectsRecords