import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const EquatorialMassageInventoryRecords = () => {

    const [areInventoryRecordsLoading, setAreInventoryRecordsLoading] = useState(true)
    const [inventoryRecords, setInventoryRecords] = useState([])
    const [incomingRecords, setIncomingRecords] = useState([]);
    const [outgoingRecords, setOutgoingRecords] = useState([]);
    const [currentPageIncoming, setCurrentPageIncoming] = useState(1);
    const incomingItemsPerPage = 5

    const startIndex = (currentPageIncoming - 1) * incomingItemsPerPage;
    const endIndex = startIndex + incomingItemsPerPage;

    const totalPagesIncoming = Math.ceil(incomingRecords.length / incomingItemsPerPage)

    const fetchShopInventoryRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchequatorialmassageinventoryrecords',{
            token: localStorage.getItem('token'),
            branch: localStorage.getItem('branch')
        })
        if(Array.isArray(res.data)){
            const incoming = res.data.filter(record => record.recordcategory === 'incoming');
            const outgoing = res.data.filter(record => record.recordcategory === 'outgoing');
            setAreInventoryRecordsLoading(false);
            setInventoryRecords(res.data);
            setIncomingRecords(incoming);
            setOutgoingRecords(outgoing);
        }
    }

    useEffect(()=> {
        fetchShopInventoryRecords()
    },[])

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                <h1 style={{textAlign:'center'}}>Equatorial Massage Department Inventory Restocking Records</h1>
                <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Quantity In</th>
                                <th scope="col">Units</th>
                                <th scope="col">Restock Source</th>
                                <th scope="col">Source Details</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {areInventoryRecordsLoading ? <tr><td colSpan="7" style={{textAlign:'center'}}>Loading.....</td></tr> :
                                incomingRecords
                                .slice(startIndex, endIndex).map(item => (
                                    <tr>
                                        <td>{item.date}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.quantityin}</td>
                                        <td>{item.munits}</td>
                                        <td>{item.restocksource}</td>
                                        <td>{item.externalsourcedetails}</td>
                                        <td>{item.notes}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {totalPagesIncoming > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPageIncoming === 1} onClick={() => setCurrentPageIncoming(currentPageIncoming - 1)}/>
                    <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPageIncoming} of {totalPagesIncoming}</span>
                        <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPageIncoming === totalPagesIncoming} onClick={() => setCurrentPageIncoming(currentPageIncoming + 1)}/>
                    </div>
                    )}
                <h1 style={{textAlign:'center'}}>Equatorial Massage Department Inventory Outgoing Records</h1>
                <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Quantity In</th>
                                <th scope="col">Units</th>
                                <th scope="col">Destination</th>
                                <th scope="col">Destination Details</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {areInventoryRecordsLoading ? <tr><td colSpan="7" style={{textAlign:'center'}}>Loading.....</td></tr> :
                                outgoingRecords.map(item => (
                                    <tr>
                                        <td>{item.date}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.quantityin}</td>
                                        <td>{item.munits}</td>
                                        <td>{item.restocksource}</td>
                                        <td>{item.externalsourcedetails}</td>
                                        <td>{item.notes}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {/* {totalPagesOutgoing > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                    <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPage} of {totalPages}</span>
                        <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                    </div>
                    )} */}
            </div>
            <Col sm='12' md='2' lg='2' xl='2'></Col>
        </Row>
    )
}

export default EquatorialMassageInventoryRecords