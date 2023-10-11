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
                <Link className="tab_nav" to="/buwamaregisternewcattlebatch">
                    <div className="mb-3 mclickable_option">
                        Register New Livestock Batch
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamarecordcattledeath">
                    <div className="mb-3 mclickable_option">
                        Record Livestock Batch Death
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamasavelivestockfeedingrecords">
                    <div className="mb-3 mclickable_option">
                        Manage Livestock Feeding
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamacattlehealthmgt">
                    <div className="mb-3 mclickable_option">
                        Manage Livestock Health
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamacattlemilkproductionmgt">
                    <div className="mb-3 mclickable_option">
                        Manage Milk Production
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamacattlemanureproductionmgt">
                    <div className="mb-3 mclickable_option">
                        Manage Manure Production
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