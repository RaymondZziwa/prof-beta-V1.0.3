import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import DisplayLabellingDailyOutputRecords from './display_records'
import RecordDailyOutputForm from './record_daily_output_form'

const LabellingDepartmentDailyOutputMgt = () => {
    const [areInventoryRecordsLoading, setAreInventoryRecordsLoading] = useState(true)
    const [inventoryRecords, setInventoryRecords] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchInventoryRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchlabellingdailyoutputrecords',{
            token: localStorage.getItem('token'),
            branch: localStorage.getItem('branch')
        })
        if(Array.isArray(res.data)){
            setAreInventoryRecordsLoading(false);
            setInventoryRecords(res.data)
        }
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => { 
        setIsModalOpen(false);
    }

    useEffect(()=> {
        fetchInventoryRecords()
    },[])
    


    return (
        <Row>
        <Col sm='12' md='1' lg='1' xl='1'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'60px'}}>
            <h1 style={{textAlign:'center'}}>Department Daily Output Records</h1>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <span style={{float:'right', cursor:'pointer', color:'blue'}} onClick={openModal}><h5>Save New Record<FontAwesomeIcon icon={faPenToSquare} beat /></h5></span>
                    <DisplayLabellingDailyOutputRecords records={inventoryRecords}/>
                </Col>
            </Row>
        </div>
        {/* Modal */}
        <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            >
                <h2 style={{textAlign:'center'}}>Record Daily Output</h2>
                <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeModal}>Close</button>
                <RecordDailyOutputForm fetchInventoryRecords={fetchInventoryRecords}/>
            </Modal> 
        <Col sm='12' md='1' lg='1' xl='1'></Col>
    </Row>
    )
}
export default LabellingDepartmentDailyOutputMgt