import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const EquatorialShopInventoryRecords = () => {

    const [areInventoryRecordsLoading, setAreInventoryRecordsLoading] = useState(true)
    const [inventoryRecords, setInventoryRecords] = useState([])
    const [incomingRecords, setIncomingRecords] = useState([]);
    const [outgoingRecords, setOutgoingRecords] = useState([]);

    const [incomingCurrentPage, setIncomingCurrentPage] = useState(1)

    const incomingItemsPerPage = 5

    const incomingStartIndex = (incomingCurrentPage - 1) * incomingItemsPerPage;
    const incomingEndIndex = incomingStartIndex + incomingItemsPerPage;

    const totalPages = Math.ceil(incomingRecords.length / incomingItemsPerPage)

    const [outgoingCurrentPage, setOutgoingCurrentPage] = useState(1)

    const outgoingItemsPerPage = 5

    const outgoingStartIndex = (outgoingCurrentPage - 1) * outgoingItemsPerPage;
    const outgoingEndIndex = outgoingStartIndex + outgoingItemsPerPage;

    const outgoingTotalPages = Math.ceil(outgoingRecords.length / outgoingItemsPerPage)

    const fetchShopInventoryRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchequatorialshopinventoryrecords',{
            token: localStorage.getItem('token'),
            branch: localStorage.getItem('branch')
        })
        if(Array.isArray(res.data)){
            setAreInventoryRecordsLoading(false)
            const sortedRecords = res.data.slice().sort((a, b) => {
                
                const partsA = a.date.split('/');
                const partsB = b.date.split('/');
                
                
                const dateA = new Date(`${partsA[1]}/${partsA[0]}/${partsA[2]}`);
                const dateB = new Date(`${partsB[1]}/${partsB[0]}/${partsB[2]}`);
        
                return dateB - dateA;
            });
            setInventoryRecords(sortedRecords);
            setAreInventoryRecordsLoading(false);
        }
    }

    useEffect(()=>{
        const incoming = inventoryRecords.filter(record => record.recordcategory === 'incoming');
        const outgoing = inventoryRecords.filter(record => record.recordcategory === 'outgoing');
        setIncomingRecords(incoming);
        setOutgoingRecords(outgoing);
    },[inventoryRecords])

    useEffect(()=> {
        fetchShopInventoryRecords()
    },[])

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                <h1 style={{textAlign:'center'}}>Equatorial Shop Department Inventory Restocking Records</h1>
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
                                incomingRecords.slice(incomingStartIndex, incomingEndIndex).map(item => (
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
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={incomingCurrentPage === 1} onClick={() => setIncomingCurrentPage(incomingCurrentPage - 1)}/>
                        <span style={{ margin: '0 10px', color:'blue' }}>Page {incomingCurrentPage} of {totalPages}</span>
                            <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={incomingCurrentPage === totalPages} onClick={() => setIncomingCurrentPage(incomingCurrentPage + 1)}/>
                        </div>
                    )}
                <h1 style={{textAlign:'center'}}>Equatorial Shop Department Inventory Outgoing Records</h1>
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
                                outgoingRecords.slice(outgoingStartIndex, outgoingEndIndex).map(item => (
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
                    {outgoingTotalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={outgoingCurrentPage === 1} onClick={() => setOutgoingCurrentPage(outgoingCurrentPage - 1)}/>
                        <span style={{ margin: '0 10px', color:'blue' }}>Page {outgoingCurrentPage} of {totalPages}</span>
                            <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={outgoingCurrentPage === totalPages} onClick={() => setOutgoingCurrentPage(outgoingCurrentPage + 1)}/>
                        </div>
                    )}
            </div>
            <Col sm='12' md='2' lg='2' xl='2'></Col>
        </Row>
    )
}

export default EquatorialShopInventoryRecords