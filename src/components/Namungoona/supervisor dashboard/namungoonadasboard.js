import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './namungoona.css'
import Navbar from "../../side navbar/sidenav";

const Namungoonadashboard = () => {
    return (
            <Row>
                <Col sm='12' md='1' lg='1' xl='1'>
                    <Navbar />
                </Col>
                    <div  className="col align-self-center">
                        <div style={{ padding: "30px", borderRadius: "10px" }}>
                            <Link className="tab_nav" to="/manageinventory">
                                <div className="mb-3 mclickable_option">
                                    Manage Inventory
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/saveinventoryrecords">
                                <div className="mb-3 mclickable_option">
                                    Inventory Records
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/placeproductorder">
                                <div className="mb-3 mclickable_option">
                                    Order Products
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/branchorderrecords">
                                <div className="mb-3 mclickable_option">
                                    Orders Records
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/viewinventoryrecords">
                                <div className="mb-3 mclickable_option">
                                    View Inventory Records
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/stocktaking">
                                <div className="mb-3 mclickable_option">
                                    Stock Taking
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/accountsettings">
                                <div className="mb-3 mclickable_option">
                                    Settings
                                </div>
                            </Link>
                        </div>
                    </div>
            </Row>
    );
}
export default Namungoonadashboard 