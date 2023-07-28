import { Row, Col, Form } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import Modal from "react-modal"
import { useState, useEffect } from 'react'
import DisplayTable from './display_table/table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import DisplayAllRecords from './display_table/display_all_records'

const RecieveMassageIncome = () => {
    const [allRecords, setAllRecords] = useState([])
    const [records, setRecords] = useState([])
    const [isModalOpen, setIsModalOpen] = useState('')

    const closeModal = () => {
        setAllRecords(null);
        setIsModalOpen(false);
    }

    const displayData = async (event) => {
        event.preventDefault()

        let res = await axios.post('http://82.180.136.230:3005/fetchallincomesubmissionrecords',{
            token:localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setAllRecords(res.data)
        }

        if(allRecords){
            setIsModalOpen(true)
        }
    }

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

    return (
        <Row>
        <Col sm='12' md='1' lg='1' xl='1'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'40px'}}>
            <h1 style={{textAlign:'center'}}>Equatorial Massage Income Submission</h1>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <h3 style={{textAlign:'center'}}>View Pending Income Submissions</h3><span style={{float:'right', fontWeight:'bold', cursor:'pointer', color:'blue'}} onClick={displayData}>View All Submissions<FontAwesomeIcon icon={faEye} beat /></span>
                    <DisplayTable records={records} fetchAllSubmissionRecords={fetchAllSubmissionRecords} />
                </Col>
            </Row>
            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                //contentLabel="Subscription Details"
            >
                <h2 style={{textAlign:'center'}}>All Massage Income Submission Records</h2>
                <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeModal}>Close</button>
                <DisplayAllRecords records={allRecords}/>
            </Modal>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'></Col>
    </Row>
    )
}
export default RecieveMassageIncome