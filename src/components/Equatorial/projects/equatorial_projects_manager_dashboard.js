import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { Link } from "react-router-dom";

const EquatorialProjectsManagerDashboard = () => {
    return (
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
                <Link className="tab_nav" to="/equatorialprojectsinventorymenu">
                    <div className="mb-3 mclickable_option">
                        Equatorial Projects Inventory
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialprojectspos">
                    <div className="mb-3 mclickable_option">
                        Projects Point Of Sale
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialprojectsclientpaymentplan">
                    <div className="mb-3 mclickable_option">
                        Projects Client Payment Plan
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialprojectsreceiptspaymentstatus">
                    <div className="mb-3 mclickable_option">
                        Projects Receipt Payment Status
                    </div>
                </Link>
                <Link className="tab_nav" to="/createexternalreceipt">
                    <div className="mb-3 mclickable_option">
                        Create Projects External Receipt
                    </div>
                </Link>
                <Link className="tab_nav" to="/managesuppliers">
                    <div className="mb-3 mclickable_option">
                        Manage Suppliers
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialissuedexternalreceiptsrecords">
                    <div className="mb-3 mclickable_option">
                        View Issued External Receipts
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialtodayscheduledprojectsclientpayments">
                    <div className="mb-3 mclickable_option">
                        Today's Client Scheduled Payments
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialprojectssalesrecords">
                    <div className="mb-3 mclickable_option">
                        Projects Sales Records 
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialprojectsreportsmenu">
                    <div className="mb-3 mclickable_option">
                        Projects Department Reports
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

export default EquatorialProjectsManagerDashboard