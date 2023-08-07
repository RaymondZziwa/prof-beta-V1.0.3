import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { Link } from "react-router-dom";

const EquatorialLabellingManagerDashboard = () => {
    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="/equatoriallabellingincominginventorymgt">
                <div className="mb-3 mclickable_option">
                    Record Incoming Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="/equatoriallabellinginventorytransfermgt">
                <div className="mb-3 mclickable_option">
                    Send Inventory To Custodian
                </div>
            </Link>
            <Link className="tab_nav" to="/equatoriallabellingdailyoutputmgt">
                <div className="mb-3 mclickable_option">
                    Record Daily Department Output
                </div>
            </Link>
            <Link className="tab_nav" to="/equatoriallabellingstorestocktaking">
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

export default EquatorialLabellingManagerDashboard