import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import ReportPrintingButton from '../../../shop/reports/reports_generic_components/support_components/report_printing button'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ChickenMgtReportStatusBar from './chicken_farm_status_bar/chicken_farm_status_bar'
import Loading from '../../../../../imgs/loading.gif'
import FeedConsumptionAnalysis from './metrics/feed_consumption_analysis'
import EggProductionAnalysis from './metrics/egg_production_analysis'
import MedicineConsumptionAnalysis from './metrics/medicine_consumption_analysis'
import ChickenMortalityAnalysis from './metrics/chicken_mortality_analysis'
import BatchFCRAnalysis from './metrics/batch_fcr_analysis'

const ChickenMgtReport = () => {
    const [areRecordsLoading, setAreRecordsLoading] = useState(true)
    const [records, setRecords] = useState([])

    const [areEggRecordsLoading, setAreEggRecordsLoading] = useState(true)
    const [eggRecords, setEggRecords] = useState([])

    const [fcr, setFcr] = useState([]) 
    const [mortalityData, setMortalityData] = useState([])
    const [healthData, setHealthData] = useState([])

    const [chickenBatches, setChickenBatches] = useState([])

    const fetchBatchData = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallbatchdata', {
            token: localStorage.getItem("token")
        })
        if(Array.isArray(res.data)){
            console.log('btc', res.data)
            setChickenBatches(res.data)
        }
    }

    const fetchFeedingRecords = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallfeedingrecords', {
            token: localStorage.getItem("token")
        })
        if(Array.isArray(res.data)){
            setRecords(res.data)
            setAreRecordsLoading(false)
        }
    }

    const fetchEggProductionRecords = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchalleggproduction', {
            token: localStorage.getItem("token")
        })
        if(Array.isArray(res.data)){
            setEggRecords(res.data)
            setAreEggRecordsLoading(false)
        }
    }

    const fetchFCRRecords = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallbatchfcrdata', {
            token: localStorage.getItem("token")
        })
        if(Array.isArray(res.data)){
            console.log('fcr', res.data)
            setFcr(res.data)
        }
    }

    const fetchHealthData = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallbatchhealthdata', {
            token: localStorage.getItem("token")
        })
        if(Array.isArray(res.data)){
            console.log('hh', res.data)
            setHealthData(res.data)
        }
    }

    const fetchMortalityData = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallbatchmortalitydata', {
            token: localStorage.getItem("token")
        })
        if(Array.isArray(res.data)){
            setMortalityData(res.data)
        }
    }

    useEffect(()=>{
        fetchHealthData()
        fetchMortalityData()
        fetchBatchData()
        fetchEggProductionRecords()
        fetchFeedingRecords()
        fetchFCRRecords()
    },[])
    
    return(
        <div style={{backgroundColor:'#E9E9E9'}}>
        <Row>
            <Col sm='12' md='1' lg='1' xl='1'>
                <Navbar />
            </Col>
        </Row>
        <Row>
            <h1 style={{textAlign:'center', color:'black',marginTop:'60px'}}>Chicken Farm Metrics Report <span style={{float:'right',marginRight:'10px'}}><ReportPrintingButton /></span></h1>
            <p style={{textAlign:'center', color:'black',marginTop:'5px',fontSize:'20px'}}>As On: {new Date().toLocaleString()}</p>
            <Col sm='12' md='12' lg='12' xl='12'>
                {!areRecordsLoading ? <ChickenMgtReportStatusBar batchData={chickenBatches} eggRecords={eggRecords} feedingRecords={records} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
            </Col>
        </Row>
        
        <Row style={{marginTop:'50px'}}>
            <Col sm='12' md='6' lg='6' xl='6'>
                <h2 style={{textAlign:'center', color:'black',marginTop:'100px'}}>Feed Consumption Analysis</h2>
                {!areRecordsLoading ? <FeedConsumptionAnalysis feedingRecords={records} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
            </Col>
            <Col sm='12' md='6' lg='6' xl='6'>
                <h2 style={{textAlign:'center', color:'black',marginTop:'100px'}}>Egg Production Analysis</h2>
                {!areRecordsLoading ? <EggProductionAnalysis eggRecords={eggRecords} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
            </Col>
        </Row>

        <Row style={{marginTop:'50px'}}>
            <Col sm='12' md='6' lg='6' xl='6'>
            <h2 style={{textAlign:'center', color:'black',marginTop:'100px'}}>Medical Supplies Consumption Analysis</h2>
                {!areRecordsLoading ? <MedicineConsumptionAnalysis medicineRecords={healthData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
            </Col>
            <Col sm='12' md='6' lg='6' xl='6'>
                <h2 style={{textAlign:'center', color:'black',marginTop:'100px'}}>Chicken Mortality Analysis</h2>
                {!areRecordsLoading ? <ChickenMortalityAnalysis mortalityData={mortalityData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
            </Col>
        </Row>
        <Row style={{marginTop:'50px'}}>
            <Col sm='12' md='2' lg='2' xl='2'></Col>
            <Col sm='12' md='8' lg='8' xl='8'>
                <h2 style={{textAlign:'center', color:'black',marginTop:'100px'}}>Batch Feed Conversion Ratio Analysis</h2>
                {!areRecordsLoading ? <BatchFCRAnalysis fcrData={fcr} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
            </Col>
            <Col sm='12' md='2' lg='2' xl='2'></Col>
       </Row>
    </div>
        // <> fcr </> 
    )
}

export default ChickenMgtReport