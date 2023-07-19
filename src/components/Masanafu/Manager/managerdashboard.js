import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../side navbar/sidenav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const Managerdashboard = () => {
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)
    const [totalNumberOfPendingOrders, setTotalNumberOfPendingOrders] = useState(0)
    


    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/approvedorders', {
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
        const interval = setInterval(() => {
            fetchOrders()
        }, 1000)


        return () => clearInterval(interval)
    })


    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='1' md='1' lg='1' xl='1'></Col>
                <Col sm='12' md='10' lg='10' xl='10'>
                    <div>
                        <div style={{ padding: "30px", borderRadius: "10px" }}>
                            <Link className="tab_nav" to="/inventorymenu">
                                <div className="mb-3 mclickable_option">
                                    Inventory
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/approvedorders">
                                <div className="mb-3 mclickable_option">
                                    Pending Product Orders <p style={{ borderRadius: '80%', backgroundColor: 'red', textAlign: 'center', display: 'inline-block', width: '22px', color: 'white' }}>{totalNumberOfPendingOrders}</p>
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/productionrecords">
                                <div className="mb-3 mclickable_option">
                                    Production Records
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/stocktaking">
                                <div className="mb-3 mclickable_option">
                                    Stock Taking (Production Store)
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/requestrawmaterials">
                                <div className="mb-3 mclickable_option">
                                    Request for raw materials
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/rawmaterialrequestsrecords">
                                <div className="mb-3 mclickable_option">
                                    Raw Material Requests Records
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
    );
}
export default Managerdashboard 