import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { Link } from "react-router-dom";

const EquatorialLabellingDashboard = () => {
    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="#">
                <div className="mb-3 mclickable_option">
                    Record Incoming Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="#">
                <div className="mb-3 mclickable_option">
                    Record Outgoing Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="#">
                <div className="mb-3 mclickable_option">
                    Save Daily Labelling Records
                </div>
            </Link>
            <Link className="tab_nav" to="#">
                <div className="mb-3 mclickable_option">
                    Stock Taking
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

export default EquatorialLabellingDashboard