import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectsManagerDashboard = () => {
    const [totalNumberOfPendingOrders, setTotalNumberOfPendingOrders] = useState(0)

    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/approvedorders', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token"),
            dept: localStorage.getItem('department')
        })
        if(typeof res.data === 'string'){
            setTotalNumberOfPendingOrders(0)
        }else{
            setTotalNumberOfPendingOrders(res.data.length)
        }
        
        
    }

    useEffect(() => {
        fetchOrders()
        const interval = setInterval(() => {
            fetchOrders()
        }, 1000)


        return () => clearInterval(interval)
    })

    return (
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
                <Link className="tab_nav" to="/requestprojectsequipment">
                    <div className="mb-3 mclickable_option">
                        Request Materials
                    </div>
                </Link>
                <Link className="tab_nav" to="/rawmaterialrequestsrecords">
                    <div className="mb-3 mclickable_option">
                        Material Requests Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/machinerymenu">
                    <div className="mb-3 mclickable_option">
                        Machninery Menu
                    </div>
                </Link>
                <Link className="tab_nav" to="/orderdelivery">
                    <div className="mb-3 mclickable_option">
                        Order Delivery
                    </div>
                </Link>
                <Link className="tab_nav" to="/approvedorders">
                    <div className="mb-3 mclickable_option">
                        New Orders <p style={{ borderRadius: '80%', backgroundColor: 'red', textAlign: 'center', display: 'inline-block', width: '22px', color: 'white' }}>{totalNumberOfPendingOrders}</p>
                    </div>
                </Link>
                <Link className="tab_nav" to="/projectsrecords">
                    <div className="mb-3 mclickable_option">
                        Projects Records 
                    </div>
                </Link>
                <Link className="tab_nav" to="/accountsettings">
                    <div className="mb-3 mclickable_option">
                        Settings
                    </div>
                </Link>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}

export default ProjectsManagerDashboard