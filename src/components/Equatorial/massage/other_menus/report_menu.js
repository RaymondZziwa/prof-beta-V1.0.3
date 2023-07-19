import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";


const EquatorialMassageReportMenu = () => {
    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
                <Link className="tab_nav" to="/equatorialmassagedepartmentdailyreport">
                    <div className="mb-3 mclickable_option">
                        Daily Report
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassagedepartmentweeklyreport">
                    <div className="mb-3 mclickable_option">
                        Weekly Report
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassagedepartmentmonthlyreport">
                    <div className="mb-3 mclickable_option">
                    Monthly Report
                    </div>
                </Link>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}

export default EquatorialMassageReportMenu