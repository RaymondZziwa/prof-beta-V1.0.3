import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { Link } from "react-router-dom";

const EquatorialCustodianDashboard = () => {
    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="#">
                <div className="mb-3 mclickable_option">
                    Manage General Store Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="#">
                <div className="mb-3 mclickable_option">
                    Manage Labelling Dept Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="#">
                <div className="mb-3 mclickable_option">
                    Manage Main Shop Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="#">
                <div className="mb-3 mclickable_option">
                    Manage Projects Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="#">
                <div className="mb-3 mclickable_option">
                    Manage Massage Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="#">
                <div className="mb-3 mclickable_option">
                    View Records
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

export default EquatorialCustodianDashboard