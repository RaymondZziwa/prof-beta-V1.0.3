import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const BuwamaLivestockMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/buwamacattlebatchrecords">
                        <div className="mb-3 mclickable_option">
                            Batch Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/buwamacattlefarmstatementreport">
                        <div className="mb-3 mclickable_option">
                            Reports
                        </div>
                    </Link>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default BuwamaLivestockMgtMenu