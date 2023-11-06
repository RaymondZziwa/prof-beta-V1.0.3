import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const MasanafuProductionMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/viewinventoryrecords">
                        <div className="mb-3 mclickable_option">
                            Production Inventory Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/productionrecords">
                        <div className="mb-3 mclickable_option">
                            Production Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/stocktaking">
                        <div className="mb-3 mclickable_option">
                            Production Store Stock Taking
                        </div>
                    </Link>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default MasanafuProductionMgtMenu