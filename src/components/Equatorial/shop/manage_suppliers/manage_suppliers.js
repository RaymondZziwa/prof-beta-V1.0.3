import { Row, Col, Form } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayTable from './display_table/display_table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import SaveNewSupplyForm from './save_new_supply_form/save_new_supply_form'

const ManageSuppliers = () => {
    const [filteredRecords, setFilteredRecords] = useState([])
    const [records, setRecords] = useState([])
    const [selectedDay, setSelectedDay] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const selectedDateHandler = (event) => {
        event.preventDefault()
        setSelectedDay(event.target.value)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setFilteredRecords(null);
        setIsModalOpen(false);
    }


    const fetchAllSubmissionRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallsupplyrecords',{
            token: localStorage.getItem('token'),
        })

        if(Array.isArray(res.data)){
            const unConfirmedSubmissions = res.data.filter((sub)=>
                sub.submissionstatus === 'unconfirmed' 
            )
            setRecords(res.data)
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
            <h1 style={{textAlign:'center'}}>Manage Suppliers</h1>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <span style={{float:'right', cursor:'pointer', color:'blue'}} onClick={openModal}><h5>Save new supply <FontAwesomeIcon icon={faPenToSquare} beat /></h5></span>
                    <DisplayTable records={records} filteredRecords={filteredRecords} />
                </Col>
            </Row>
        </div>
        {/* Modal */}
        <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                //contentLabel="Subscription Details"
            >
                <h2 style={{textAlign:'center'}}>Save New Supply Record</h2>
                <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeModal}>Close</button>
                <SaveNewSupplyForm />
            </Modal>
        <Col sm='12' md='1' lg='1' xl='1'></Col>
    </Row>
    )
}
export default ManageSuppliers