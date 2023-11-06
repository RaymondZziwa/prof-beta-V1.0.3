import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";


const EquatorialMassageReportMenu = () => {
    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'30px'}}>
                <h1 style={{textAlign:'center'}}>Massage Department Report Menu</h1>
                <Link className="tab_nav" to="/equatorialmassagedepartmentdailyreport">
                    <div className="mb-3 mclickable_option">
                        Products Daily Report
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassagedepartmentweeklyreport">
                    <div className="mb-3 mclickable_option">
                       Products Weekly Report
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassagedepartmentmonthlyreport">
                    <div className="mb-3 mclickable_option">
                      Products Monthly Report
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassagedailyservicesreport">
                    <div className="mb-3 mclickable_option">
                        Services Daily Report
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassageweeklyservicesreport">
                    <div className="mb-3 mclickable_option">
                       Services Weekly Report
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassagemonthlyservicesreport">
                    <div className="mb-3 mclickable_option">
                      Services Monthly Report
                    </div>
                </Link>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}

export default EquatorialMassageReportMenu