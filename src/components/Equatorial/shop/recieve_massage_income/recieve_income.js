import { Row, Col, Form } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const RecieveMassageIncome = () => {
    const [records, setRecords] = useState([])

    const fetchAllSubmissionRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallincomesubmissionrecords',{
            token: localStorage.getItem('token'),
        })

        if(Array.isArray(res.data)){
            const unConfirmedSubmissions = res.data.filter((sub)=>
                sub.submissionstatus === 'unconfirmed' 
            )
            setRecords(unConfirmedSubmissions)
        }
    }

    useEffect(()=>{
        fetchAllSubmissionRecords()
    },[])

    const rejectSubmission = async event => {
        event.preventDefault()
        try {
            await axios.post('http://82.180.136.230:3005/rejectincomesubmission', {
                token: localStorage.getItem("token"),
                submissionId: event.currentTarget.id,
            });
            await fetchAllSubmissionRecords();
        } catch (error) {
            console.error('Error rejecting submission:', error);
        }
    }

    const confirmSubmission = async event => {
        event.preventDefault()
        try {
            await  axios.post('http://82.180.136.230:3005/confirmincomesubmission', {
            token: localStorage.getItem("token"),
            submissionId: event.currentTarget.id,
         })
            await fetchAllSubmissionRecords();
        } catch (error) {
            console.error('Error confirming submission:', error);
        }
    }

    return (
        <Row>
        <Col sm='12' md='1' lg='1' xl='1'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'40px'}}>
            <h1 style={{textAlign:'center'}}>Equatorial Massage Income Submission</h1>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <h3 style={{textAlign:'center'}}>View Pending Income Submissions</h3>
                    <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                                <thead style={{ textAlign: 'center' }}>
                                    <tr>
                                        <th scope="col">Submission Id</th>
                                        <th scope="col">Submission Date</th>
                                        <th scope="col">Amount From Massage (UGX)</th>
                                        <th scope="col">Amount From Products (UGX)</th>
                                        <th scope="col">Submitted By</th>
                                        <th scope="col">Recieved By</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records ? records.map(item => (
                                        <tr>
                                            <td>{item.submissionId}</td>
                                            <td>{item.submissionDate}</td>
                                            <td>{item.massageamount}</td>
                                            <td>{item.productamount}</td>
                                            <td>{item.submittedBy}</td>
                                            <td>{item.receivedby}</td>
                                            <td>{item.submissionstatus}</td>
                                            <td>
                                                <button id={item.submissionId} className='btn btn-success' onClick={confirmSubmission}><FontAwesomeIcon icon={faCheck} bounce style={{color: "white"}} /></button>
                                                <button id={item.submissionId} className='btn btn-danger' style={{marginTop:'2px'}} onClick={rejectSubmission}><FontAwesomeIcon icon={faCircleXmark} fade style={{color: "white"}} /></button>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr><td colSpan='9'>No pending submissions....</td></tr>}
                                </tbody>
                            </table>
                </Col>
            </Row>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'></Col>
    </Row>
    )
}
export default RecieveMassageIncome