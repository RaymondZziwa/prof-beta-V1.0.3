import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from '../../../side navbar/sidenav'

const ChickenMgtDashboard = () => {
    return (
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
                <Link className="tab_nav" to="/masanafuchickenfeedsmgt">
                    <div className="mb-3 mclickable_option">
                        Manage Feeds Inventory
                    </div>
                </Link>
                <Link className="tab_nav" to="/masanafuchickenmedicinemgt">
                    <div className="mb-3 mclickable_option">
                        Manage Medicine Inventory
                    </div>
                </Link>

                <Link className="tab_nav" to="/masanafuregisternewchickenbatch">
                    <div className="mb-3 mclickable_option">
                        Register New Chicken Batch
                    </div>
                </Link>
                <Link className="tab_nav" to="/masanafurecordchickendeath">
                    <div className="mb-3 mclickable_option">
                        Record Chicken Batch Death
                    </div>
                </Link>
                <Link className="tab_nav" to="/masanafuchickenhealthmgt">
                    <div className="mb-3 mclickable_option">
                        Manage Chicken Health
                    </div>
                </Link>
                <Link className="tab_nav" to="/masanafuchickeneggproductionmgt">
                    <div className="mb-3 mclickable_option">
                        Manage Egg Production
                    </div>
                </Link>
                <Link className="tab_nav" to="/calculatebatchfcr">
                    <div className="mb-3 mclickable_option">
                        Feed Conversion Ratio
                    </div>
                </Link>
                <Link className="tab_nav" to="/chickenbatchrecords">
                    <div className="mb-3 mclickable_option">
                        Batch Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/chickenfarmreport">
                    <div className="mb-3 mclickable_option">
                       Graphical Report Analysis
                    </div>
                </Link>
                <Link className="tab_nav" to="/chickenfarmstatementreport">
                    <div className="mb-3 mclickable_option">
                       Statemental Report
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

export default ChickenMgtDashboard