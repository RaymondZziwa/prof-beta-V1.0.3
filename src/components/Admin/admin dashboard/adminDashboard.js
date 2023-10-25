import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"


const Admindashboard = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/equatorialmanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Equatorial Branch
                        </div>
                    </Link>
                    <Link className="tab_nav" to="#">
                        <div className="mb-3 mclickable_option">
                            Masanafu Branch
                        </div>
                    </Link>
                    <Link className="tab_nav" to="#">
                        <div className="mb-3 mclickable_option">
                            Buwama Branch
                        </div>
                    </Link>
                    <Link className="tab_nav" to="#">
                        <div className="mb-3 mclickable_option">
                            Namungoona Branch
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/saffroncompeititonmanagementmenu">
                        <div className="mb-3 mclickable_option">
                            Saffron Competition
                        </div>
                    </Link>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'>
        </Col>
    </Row>
    )
}

export default Admindashboard 