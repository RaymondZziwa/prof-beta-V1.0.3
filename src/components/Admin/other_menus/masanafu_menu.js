import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const MasanafuMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/masanafuproductionmanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Production Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafufarmmanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Farm Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafuchickenmanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Chicken Farm  Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafuprojectsmanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Projects Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafushopmanagementmenu">
                       <div className="mb-3 mclickable_option">
                            Shop Mgt
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafugeneralstoremanagementmenu">
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

export default MasanafuMgtMenu