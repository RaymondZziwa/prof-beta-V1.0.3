import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from '../../side navbar/sidenav'

const BuwamaChickenMgtDashboard = () => {
    return (
        <Row>
            <Col sm='12' md='1' lg='1' xl='1'>
                <Navbar />
            </Col>
            <Col sm='12' md='9' lg='9' xl='9' style={{marginTop:'60px'}}>
                <Link className="tab_nav" to="/buwamachickenfeedsmgt">
                    <div className="mb-3 mclickable_option">
                        Manage Feeds Inventory
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamachickenmedicinemgt">
                    <div className="mb-3 mclickable_option">
                        Manage Medicine Inventory
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamaregisternewchickenbatch">
                    <div className="mb-3 mclickable_option">
                        Register New Chicken Batch
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamarecordchickendeath">
                    <div className="mb-3 mclickable_option">
                        Record Chicken Batch Death
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamachickenhealthmgt">
                    <div className="mb-3 mclickable_option">
                        Manage Chicken Health
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamachickeneggproductionmgt">
                    <div className="mb-3 mclickable_option">
                        Manage Egg Production
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamacalculatebatchfcr">
                    <div className="mb-3 mclickable_option">
                        Feed Conversion Ratio
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamachickenbatchrecords">
                    <div className="mb-3 mclickable_option">
                        Batch Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamachickenfarmstatementreport">
                    <div className="mb-3 mclickable_option">
                       Statemental Report
                    </div>
                </Link>
            </Col>
            
        </Row>
    )
}

export default BuwamaChickenMgtDashboard