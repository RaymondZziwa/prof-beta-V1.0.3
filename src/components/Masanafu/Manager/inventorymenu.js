import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../../side navbar/sidenav";
const InventoryMenu = () => {
    return (
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='4' lg='4' xl='4'>
                        <Navbar />
                    </Col>
                    <Col sm='12' md='7' lg='7' xl='7'>
                        <div className="container min-vh-50 d-flex  align-items-center">                        <div style={{ padding: "30px", borderRadius: "10px" }}>
                            <Link className="tab_nav" to="/manageinventory">
                                <div className="mb-3 clickable_option">
                                    Save New Production Item
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/saveinventoryrecords">
                                <div className="mb-3 clickable_option">
                                    Save Production Inventory Records
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/viewinventoryrecords">
                                <div className="mb-3 clickable_option">
                                    View Production Inventory Records
                                </div>
                            </Link>
                        </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default InventoryMenu