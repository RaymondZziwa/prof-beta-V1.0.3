import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const EquatorialLabellingMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/equatoriallabellingincominginventorymgt">
                        <div className="mb-3 mclickable_option">
                            Inventory Incomings
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatoriallabellingdailyoutputmgt">
                        <div className="mb-3 mclickable_option">
                            Department Daily Output
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatoriallabellingstorestocktaking">
                        <div className="mb-3 mclickable_option">
                            Stock Taking
                        </div>
                    </Link>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default EquatorialLabellingMgtMenu