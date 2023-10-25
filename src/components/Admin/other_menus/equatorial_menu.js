import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const EquatorialMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/equatorialshopmanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Main Shop Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialmassagemanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Massage Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialdebtmanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Debt  Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatoriallabellingmanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Labelling Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialprojectsmanagementmenu">
                       <div className="mb-3 mclickable_option">
                            Projects Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialgeneralstoremanagementmenu">
                       <div className="mb-3 mclickable_option">
                            General Store Mgt
                        </div>
                    </Link>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'>
        </Col>
    </Row>
    )
}

export default EquatorialMgtMenu