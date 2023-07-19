import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../side navbar/sidenav";

const FarmDashboard = () => {
    return (
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
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
                        Planting Seeds Requests Status
                    </div>
                </Link>
                <Link className="tab_nav" to="/farmrequestsrecords">
                    <div className="mb-3 mclickable_option">
                        Farm Requests Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/managebatch">
                    <div className="mb-3 mclickable_option">
                        Start / Manage Batches
                    </div>
                </Link>
                {/* <Link className="tab_nav" to="/chickenmgtdashboard">
                    <div className="mb-3 mclickable_option">
                        Chicken Farm Management
                    </div>
                </Link> */}
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
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}

export default FarmDashboard