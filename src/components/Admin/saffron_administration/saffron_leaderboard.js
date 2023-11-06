import {Row, Col} from 'react-bootstrap'
import SaphroneLeaderboard from '../../Saphorne_Competition/Leaderboard/leaderboard'
import '../../Saphorne_Competition/Dashboard/leaderboard.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../side navbar/adminnavbar'
import bkg from '../../../imgs/bkg.jpg'

const SaffronLeaderboardAdmin = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [participantData, setParticipantData] = useState([])
    
    useEffect(() => {
        const fetchAllParticipantData = async () => {
            try {
                const res = await axios.post('http://82.180.136.230:3005/fetchallparticipantperformancerecords', {
                    token: localStorage.getItem('token')
                });

                if (Array.isArray(res.data)) {
                    // Sort the data by 'points' in descending order
                    const sortedData = res.data.sort((a, b) => b.points - a.points);
                    setParticipantData(sortedData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllParticipantData();
    }, []);

    return(
       <div style={{ backgroundImage: `url(${bkg})`, height:'100vh' }}>
        <Row>
            <Col sm='12' md='12' lg='12' xl='12' className='ld-col d-flex flex-column align-items-center justify-content-center'>
            <Col sm='12' md='2' lg='2' xl='2'>
                <AdminNavbar />
            </Col>
                <h3 style={{textAlign:'center', color:'white', marginTop:'80px'}}>Competition Leaderboard</h3>
                <div className="d-flex flex-column align-items-center" style={{textAlign:'center'}}>
                    <SaphroneLeaderboard participantData={participantData}/> 
                </div>
            </Col>

        </Row>
       </div>
    )
}
export default SaffronLeaderboardAdmin