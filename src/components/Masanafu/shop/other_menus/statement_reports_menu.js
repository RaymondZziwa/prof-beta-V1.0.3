import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";

const StatementReportsMenu = () => {
return(
    <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="/masanafushopdailysalesreport">
                <div className="mb-3 mclickable_option">
                    Daily Sales And Expenses Report
                </div>
            </Link>
            <Link className="tab_nav" to="/masanafushopweeklysalesreport">
                <div className="mb-3 mclickable_option">
                    Weekly Sales And Expenses Report
                </div>
            </Link>
            <Link className="tab_nav" to="/masanafushopmonthlysalesreport">
                <div className="mb-3 mclickable_option">
                    Monthly Sales V Expenses Report
                </div>
            </Link>
            {/* <Link className="tab_nav" to="/masanafushoppastreports">
                <div className="mb-3 mclickable_option">
                Past Reports
                </div>
            </Link> */}
        </div>
        <Col sm='12' md='2' lg='2' xl='2'>
        </Col>
    </Row>
)
}

export default StatementReportsMenu