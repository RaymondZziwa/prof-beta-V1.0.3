import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../../side navbar/sidenav'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SalesLineChart from './salesline_chart'

const SaphroneCompetitionMonthlyAnalysis = () => {
    const [allRecords, setAllRecords] = useState([])
    const [filteredData, setFilteredData] = useState([])


    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const res = await axios.post(
                    'http://82.180.136.230:3005/fetchallsaphronesalesdata',
                    {
                        token: localStorage.getItem('token'),
                    }
                );
    
                if (Array.isArray(res.data)) {
                   // console.log(res.data)
                    setAllRecords(res.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllData()
    }, [])



    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <Col  sm='12' md='8' lg='8' xl='8' style={{marginTop:'60px'}}>
                <h2 style={{textAlign:'center'}}>Monthly Competition Analysis</h2>
                <SalesLineChart salesData={allRecords} />
            </Col>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}

export default SaphroneCompetitionMonthlyAnalysis