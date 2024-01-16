import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../side navbar/sidenav";

const FarmDashboard = () => {
    return (
        <Row>
            <Col sm='12' md='1' lg='1' xl='1'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
                <Link className="tab_nav" to="/requestseeds">
                    <div className="mb-3 mclickable_option">
                        Request Planting Seeds
                    </div>
                </Link>
                <Link className="tab_nav" to="/farmrequisitionstatus">
                    <div className="mb-3 mclickable_option">
                        Seed Requests Records
                    </div>
                </Link> 
                <Link className="tab_nav" to="/managebatch">
                    <div className="mb-3 mclickable_option">
                        Start / Manage Batches
                    </div>
                </Link>
                <Link className="tab_nav" to="/startbatchfrommothergarden">
                    <div className="mb-3 mclickable_option">
                        Start Batch From Mother Garden
                    </div>
                </Link>
                <Link className="tab_nav" to="/viewrecords">
                    <div className="mb-3 mclickable_option">
                        View Farm Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/accountsettings">
                    <div className="mb-3 mclickable_option">
                        Settings
                    </div>
                </Link>
            </div>
            <Col sm='12' md='1' lg='1' xl='1'>
            </Col>
        </Row>
    )
}

export default FarmDashboard