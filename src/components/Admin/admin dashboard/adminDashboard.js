import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import '../supervisor dashboard/namungoona.css'
import AdminNavbar from "../../side navbar/adminnavbar";

const Admindashboard = () => {
    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <AdminNavbar />
                </Col>

                <Col sm='12' md='8' lg='8' xl='8'>
                    <div className="container min-vh-50 d-flex  align-items-center">
                        <div style={{ padding: "30px", borderRadius: "10px" }}>
                            <Link className="tab_nav" to="/registerpersonnel">
                                <div className="mb-3 clickable_option">
                                    Register Personnel
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/viewinventoryrecords">
                                <div className="mb-3 clickable_option">
                                    View Inventory Records
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/stocktaking">
                                <div className="mb-3 clickable_option">
                                    Stock Taking
                                </div>
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
export default Admindashboard 