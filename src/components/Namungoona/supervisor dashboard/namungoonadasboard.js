import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './namungoona.css'
import Navbar from "../../side navbar/sidenav";

const Namungoonadashboard = () => {
    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <Navbar />
                </Col>

                <Col sm='12' md='8' lg='8' xl='8'>
                    <div className="container min-vh-50 d-flex  align-items-center">
                        <div style={{ padding: "30px", borderRadius: "10px" }}>
                            <Link className="tab_nav" to="/manageinventory">
                                <div className="mb-3 clickable_option">
                                    Manage Inventory
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/saveinventoryrecords">
                                <div className="mb-3 clickable_option">
                                    Inventory Records
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/placeproductorder">
                                <div className="mb-3 clickable_option">
                                    Order Products
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/branchorderrecords">
                                <div className="mb-3 clickable_option">
                                    Orders Records
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
export default Namungoonadashboard 