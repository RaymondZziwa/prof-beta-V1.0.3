import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";

const ReportsMenu = () => {
return(
    <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="/masanafushopsalesreport">
                <div className="mb-3 mclickable_option">
                    Sales Report
                </div>
            </Link>
            <Link className="tab_nav" to="/masanafushopexpensesreport">
                <div className="mb-3 mclickable_option">
                    Expenditure Report
                </div>
            </Link>
            <Link className="tab_nav" to="/masanafushopsalesvexpenditurereport">
                <div className="mb-3 mclickable_option">
                Sales V Expenditure Report
                </div>
            </Link>
            <Link className="tab_nav" to="/masanafushoppastreports">
                <div className="mb-3 mclickable_option">
                Past Reports
                </div>
            </Link>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'>
        </Col>
    </Row>
)
}

export default ReportsMenu