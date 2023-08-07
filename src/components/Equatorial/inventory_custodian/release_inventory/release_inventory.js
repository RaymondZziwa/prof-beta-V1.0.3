import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import DisplayRecords from './display_records/display_records'
import Modal from 'react-modal'
import SaveNewRecordForm from './save_new_record_form/save_new_record_form'
import axios from 'axios'

const CustodianReleaseInventoryMgt = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [itemList, setitemList] = useState([])
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        //setFilteredRecords(null);
        setIsModalOpen(false);
    }

    const fetchRecords = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallequatorialgeneralstoreinventoryreleaserecords', {
            token: localStorage.getItem("token")
        })
        console.log(res.data)
        setitemList(res.data)
        setIsItemLoading(false)
    }

    useEffect(()=>{
        fetchRecords()
    },[])
    return (
        <Row>
        <Col sm='12' md='1' lg='1' xl='1'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'40px'}}>
            <h1 style={{textAlign:'center'}}>Department Inventory Supply Records</h1>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <span style={{float:'right', cursor:'pointer', color:'blue'}} onClick={openModal}><h5>Save New Record<FontAwesomeIcon icon={faPenToSquare} beat /></h5></span>
                    <DisplayRecords records={itemList}/>
                </Col>
            </Row>
        </div>
        {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            >
                <h2 style={{textAlign:'center'}}>Save New Record</h2>
                <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeModal}>Close</button>
                <SaveNewRecordForm  fetchRecords={fetchRecords} />
            </Modal> 
        <Col sm='12' md='1' lg='1' xl='1'></Col>
    </Row>
    )
}
export default CustodianReleaseInventoryMgt