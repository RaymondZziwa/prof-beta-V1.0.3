import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../side navbar/sidenav";
import { useEffect, useState } from "react";
import axios from "axios";


const CustodianDashboard = () => {
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)
    const [totalNumberOfPendingOrders, setTotalNumberOfPendingOrders] = useState(0)
    const [totalNumberOfPendingRequests, setTotalNumberOfPendingRequests] = useState()
    const [isRequestsListLoading, setIsRequestsListLoading] = useState(true)
    const [totalNumberOfPendingFarmRequests, setTotalNumberOfPendingFarmRequests] = useState()
    const [totalNumberOfPendingProjectsRequests, setTotalNumberOfPendingProjectsRequests] = useState()
    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/pendingorders', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data === 'string'){
            setTotalNumberOfPendingOrders(0)
        }else{
            setisOrdersListLoading(false)
            setTotalNumberOfPendingOrders(res.data.length)
        }        
    }

    useEffect(() => {
        fetchOrders()
        const interval = setTimeout(() => {
            fetchOrders()
        }, 100)


        return () => clearTimeout(interval)
    })

    const fetchRawMaterialRequests = async () => {
        const res = await axios.post('http://82.180.136.230:3005/pendingrawmaterialrequests', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data === 'string'){
            setTotalNumberOfPendingRequests(0)
        }else{
            setIsRequestsListLoading(false)
            setTotalNumberOfPendingRequests(res.data.length)
        }
        
    }

    useEffect(() => {
        fetchRawMaterialRequests()
        const interval = setTimeout(() => {
            fetchRawMaterialRequests()
        }, 100)


        return () => clearTimeout(interval)
    })

    const fetchFarmRequests = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchfarmrequisitions', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data === 'string'){
            setTotalNumberOfPendingFarmRequests(0)
        }else{
            setTotalNumberOfPendingFarmRequests(res.data.length)
        }
        
    }

    const fetchProjectsRequests = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchprojectsrequisitions', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data === 'string'){
            setTotalNumberOfPendingProjectsRequests(0)
        }else{
            setTotalNumberOfPendingProjectsRequests(res.data.length)
        }
        
    }

    useEffect(() => {
        fetchFarmRequests()
        fetchProjectsRequests()
    },[])
    
    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='12' md='1' lg='1' xl='1'></Col>
                <Col sm='12' md='10' lg='10' xl='10'>
                    <div>
                        <div style={{ padding: "30px", borderRadius: "10px" }}>
                            <Link className="tab_nav" to="/inventorymenu">
                                <div className="mb-3 mclickable_option">
                                    Inventory
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/rawmaterialrequests">
                                <div className="mb-3 mclickable_option">
                                    Production Material Requests <p style={{ borderRadius: '80%', backgroundColor: 'red', textAlign: 'center', display: 'inline-block', width: '22px', color: 'white' }}>{totalNumberOfPendingRequests}</p>
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/farmrequests">
                                <div className="mb-3 mclickable_option">
                                    Farm Requests <p style={{ borderRadius: '80%', backgroundColor: 'red', textAlign: 'center', display: 'inline-block', width: '22px', color: 'white' }}>{totalNumberOfPendingFarmRequests}</p>
                                </div>
                            </Link>

                            <Link className="tab_nav" to="/projectsrequests">
                                <div className="mb-3 mclickable_option">
                                    Projects Dept Requests <p style={{ borderRadius: '80%', backgroundColor: 'red', textAlign: 'center', display: 'inline-block', width: '22px', color: 'white' }}>{totalNumberOfPendingProjectsRequests}</p>
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/masanafucustodianrecordsmenu">
                                <div className="mb-3 mclickable_option">
                                    Records Menu
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/productorders">
                                <div className="mb-3 mclickable_option">
                                    Production Orders <p style={{ borderRadius: '80%', backgroundColor: 'red', textAlign: 'center', display: 'inline-block', width: '22px', color: 'white' }}>{totalNumberOfPendingOrders}</p>
                                </div>
                            </Link>

                            <Link className="tab_nav" to="/makeprojectsorder">
                                <div className="mb-3 mclickable_option">
                                    Make Projects Order
                                </div>
                            </Link>

                            <Link className="tab_nav" to="/stocktaking">
                                <div className="mb-3 mclickable_option">
                                    Stock Taking (General Store)
                                </div>
                            </Link>

                            <Link className="tab_nav" to="/exhibtionmanagement">
                                <div className="mb-3 mclickable_option">
                                    Exhibition Management
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/accountsettings">
                                <div className="mb-3 mclickable_option">
                                    Settings
                                </div>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col sm='12' md='1' lg='1' xl='1'>
                    <Navbar />
                </Col>
            </Row>
        </div>
    )
}

export default CustodianDashboard