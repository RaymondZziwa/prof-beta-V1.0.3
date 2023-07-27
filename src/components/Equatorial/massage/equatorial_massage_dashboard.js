import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../side navbar/sidenav"

const EquatorialMassageManagerDashboard = () => {
    return (
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
                <Link className="tab_nav" to="/equatorialmassagedepartmentinventorymenu">
                    <div className="mb-3 mclickable_option">
                        Inventory Management Menu
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassagedepartmentpos">
                    <div className="mb-3 mclickable_option">
                        Products Point Of Sale
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassageservicespos">
                    <div className="mb-3 mclickable_option">
                        Services Point Of Sale
                    </div>
                </Link>
                <Link className="tab_nav" to="/manageequatorialmassageclientservicesubscription">
                    <div className="mb-3 mclickable_option">
                        Manage Client Subscriptions
                    </div>
                </Link>
                <Link className="tab_nav" to="/massagedailyincomesubmission">
                    <div className="mb-3 mclickable_option">
                        Daily Income Submission
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassagedepartmentrecords">
                    <div className="mb-3 mclickable_option">
                        Massage Department Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassageclientsubscriptionrecords">
                    <div className="mb-3 mclickable_option">
                        Massage Subscriptions Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassagedepartmentreportsmenu">
                    <div className="mb-3 mclickable_option">
                        Reports Menu
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

export default EquatorialMassageManagerDashboard