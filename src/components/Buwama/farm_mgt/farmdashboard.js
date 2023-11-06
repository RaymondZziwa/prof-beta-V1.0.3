import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../side navbar/sidenav";

const BuwamaFarmDashboard = () => {
    return (
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
                <Link className="tab_nav" to="/buwamastartbatchfrommothergarden">
                    <div className="mb-3 mclickable_option">
                        Start Batch From Mother Garden
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamamanagebatch">
                    <div className="mb-3 mclickable_option">
                        Start / Manage Batches
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamafarmbatchrecords">
                    <div className="mb-3 mclickable_option">
                       View Farm Batch Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamaviewrecords">
                    <div className="mb-3 mclickable_option">
                        View Farm Records
                    </div>
                </Link>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}

export default BuwamaFarmDashboard