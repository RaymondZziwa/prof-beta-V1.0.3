import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from '../../side navbar/sidenav'

const BuwamaCattleMgtDashboard = () => {
    return (
        <Row>
            <Col sm='12' md='1' lg='1' xl='1'>
                <Navbar />
            </Col>
            <Col sm='12' md='9' lg='9' xl='9' style={{marginTop:'60px'}}>
                <Link className="tab_nav" to="/managebuwamacattlefeeds">
                    <div className="mb-3 mclickable_option">
                        Manage Feeds Inventory
                    </div>
                </Link>
                <Link className="tab_nav" to="/managebuwamacattlemedicine">
                    <div className="mb-3 mclickable_option">
                        Manage Medicine Inventory
                    </div>
                </Link>
                <Link className="tab_nav" to="/startnewbuwamacattlebatch">
                    <div className="mb-3 mclickable_option">
                        Register New Cattle Batch
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamacattlemortality">
                    <div className="mb-3 mclickable_option">
                        Record Cattle Batch Death
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamacattlehealth">
                    <div className="mb-3 mclickable_option">
                        Manage Cattle Health
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamacattlemilkproductionmgt">
                    <div className="mb-3 mclickable_option">
                        Manage Milk Production
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamacattlecalculatebatchfcr">
                    <div className="mb-3 mclickable_option">
                        Feed Conversion Ratio
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamacattlebatchrecords">
                    <div className="mb-3 mclickable_option">
                        Batch Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamacattlegraphicalreport">
                    <div className="mb-3 mclickable_option">
                       Graphical Report Analysis
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamacattlefarmstatementreport">
                    <div className="mb-3 mclickable_option">
                       Statemental Report
                    </div>
                </Link>
            </Col>
            <Col sm='12' md='1' lg='1' xl='1'>
            </Col>
        </Row>
    )
}

export default BuwamaCattleMgtDashboard