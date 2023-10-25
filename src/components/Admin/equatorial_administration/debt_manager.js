import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const EquatorialDebtMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/viewallpartiallypaidshopsales">
                        <div className="mb-3 mclickable_option">
                            View Partially Paid Sales
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/viewallunpaidshopsales">
                        <div className="mb-3 mclickable_option">
                            View Unpaid Sales
                        </div>
                    </Link>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default EquatorialDebtMgtMenu