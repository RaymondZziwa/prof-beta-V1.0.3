import { Row, Col } from 'react-bootstrap'
import Navbar from '../side navbar/sidenav'
import { Link } from "react-router-dom";

const BuwamaDashboard = () => {
return(
    <Row>
    <Col sm='12' md='2' lg='2' xl='2'>
        <Navbar />
    </Col>
    <div className="col align-self-center" style={{marginTop:'20px'}}>
    <Link className="tab_nav" to="#">
            <div className="mb-3 mclickable_option">
               Manage General Store
            </div>
        </Link>
        <Link className="tab_nav" to="/buwamachickenmgtdashboard">
            <div className="mb-3 mclickable_option">
               Chicken Management
            </div>
        </Link>
        <Link className="tab_nav" to="/buwamacattlemgtdashboard">
            <div className="mb-3 mclickable_option">
                Livestock Management
            </div>
        </Link>
        <Link className="tab_nav" to="/buwamafarmdashboard">
            <div className="mb-3 mclickable_option">
                Farm Management
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

export default BuwamaDashboard