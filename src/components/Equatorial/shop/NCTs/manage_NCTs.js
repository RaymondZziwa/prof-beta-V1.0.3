import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const ManageNCTs = () => {
    const [nctRecords, setNctRecords] = useState([])

    const rejectNCT = async event => {
        event.preventDefault()
        try {
            await axios.post('http://82.180.136.230:3005/rejectnct', {
                token: localStorage.getItem("token"),
                transactionId: event.currentTarget.id,
            });
            await fetchNCTRecords()
        } catch (error) {
            console.error('Error rejecting rejecting NCT.', error);
        }
    }

    const confirmNCT = async event => {
        event.preventDefault()
        try {
            await  axios.post('http://82.180.136.230:3005/confirmnct', {
            token: localStorage.getItem("token"),
            transactionId: event.currentTarget.id,
         })
            await fetchNCTRecords()
        } catch (error) {
            console.error('Error confirming confirming NCT.', error);
        }
    }

    const fetchNCTRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallnctrecords',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            const filteredRecords = res.data.filter((record)=> 
                record.status === 'pending'
            )
            setNctRecords(filteredRecords)
        }
    }

    useEffect(()=>{
        fetchNCTRecords()
    },[])

    return(
        <>
            <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', marginTop:'60px'}}>Manage None Cash Transactions (NCTs)</h2>
                        <Row>
                            <Col sm='12' md='12' lg='12' xl='12' style={{marginLeft:'50px'}}>
                                <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Transaction Date</th>
                                    <th scope="col">Customer Names</th>
                                    <th scope="col">Customer Contact</th>
                                    <th scope="col">Item Brought In</th>
                                    <th scope="col">Quantity Brought In</th>
                                    <th scope="col">Units</th>
                                    <th scope="col">Item Taken Out</th>
                                    <th scope="col">Quantity Taken Out</th>
                                    <th scope="col">Units</th>
                                    <th scope="col">Authorized By</th>
                                    <th scope="col">Notes</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { nctRecords ? nctRecords.map(item => (
                                    <tr key={item.transactionId}>
                                        <td>{item.date}</td>
                                        <td>{item.clientnames}</td>
                                        <td>{item.clientcontact}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.quantityin}</td>
                                        <td>{item.unitsin}</td>
                                        <td>{item.itemOut}</td>
                                        <td>{item.quantityout}</td>
                                        <td>{item.unitsout}</td>
                                        <td>{item.authorizedby}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button id={item.transactionId} className='btn btn-success' onClick={confirmNCT}><FontAwesomeIcon icon={faCheck} bounce style={{color: "white"}} /></button>
                                            <button id={item.transactionId} className='btn btn-danger' style={{marginTop:'2px'}} onClick={rejectNCT}><FontAwesomeIcon icon={faCircleXmark} fade style={{color: "white"}} /></button>
                                        </td>
                                    </tr>
                                ))
                                : <tr><td colSpan='9'>Loading...</td></tr>}
                            </tbody>
                        </table>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm='12' md='1' lg='1' xl='1'>
                        <Navbar />
                    </Col>
                </Row>
        </>
    )
}
export default ManageNCTs