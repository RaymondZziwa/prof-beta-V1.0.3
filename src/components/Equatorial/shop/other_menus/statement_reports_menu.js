import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";

const EquatorialStatementReportsMenu = () => {
return(
    <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="/equatorialshopdailyreport">
                <div className="mb-3 mclickable_option">
                    Daily Sales And Expenses Report
                </div>
            </Link>
            <Link className="tab_nav" to="/equatorialshopweeklyreport">
                <div className="mb-3 mclickable_option">
                    Weekly Sales And Expenses Report
                </div>
            </Link>
            <Link className="tab_nav" to="/equatorialshopmonthlyreport">
                <div className="mb-3 mclickable_option">
                    Monthly Sales V Expenses Report
                </div>
            </Link>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'>
        </Col>
    </Row>
)
}

export default EquatorialStatementReportsMenu