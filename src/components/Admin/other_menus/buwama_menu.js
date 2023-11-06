import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const BuwamaMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/buwamafarmmanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Farm  Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/buwamalivestockmanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Livestock Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/buwamachickenmanagementmenu">
                       <div className="mb-3 mclickable_option">
                            Chicken Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/buwamageneralstoremanagementmenu">
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

export default BuwamaMgtMenu