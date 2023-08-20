import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import DisplayDnnRecords from './display_records/display_table'

const TrackDnns = () => {
    const [generalStoreRestockRecords, setGeneralStoreRestockRecords] = useState([])
    const [labellingStoreRestockRecords, setLabellingStoreRestockRecords] = useState([])


    const fetchGeneralStoreInventoryRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallequatorialcustodianrecievedrecords',{
            token:localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setGeneralStoreRestockRecords(res.data)
        }
    }

    const fetchLabellingStoreInventoryRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchlabellingdepartmentinventoryrestockingrecords',{
            token:localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setLabellingStoreRestockRecords(res.data)
        }
    }

    useEffect(()=>{
        fetchGeneralStoreInventoryRecords()
        fetchLabellingStoreInventoryRecords()
    },[])

    useEffect(()=>{
        console.log('gr', generalStoreRestockRecords)
        console.log('lr', labellingStoreRestockRecords)
    },[generalStoreRestockRecords, labellingStoreRestockRecords])

    return (
        <Row>
        <Col sm='12' md='1' lg='1' xl='1'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'40px'}}>
            <h1 style={{textAlign:'center'}}>Track Delivery Note Numbers</h1>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <DisplayDnnRecords labellingStoreRestockRecords={labellingStoreRestockRecords}/>
                </Col>
            </Row>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'></Col>
    </Row>
    )
}
export default TrackDnns