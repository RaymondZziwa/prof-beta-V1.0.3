import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";

const CustodianGeneralStoreInventoryManagement = () => {
    
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>

        <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="/registershopinventory">
                    <div className="mb-3 mclickable_option">
                        Register New Items
                    </div>
            </Link>
            <Link className="tab_nav" to="/equatorialgeneralstorerestockingform">
                <div className="mb-3 mclickable_option">
                   Save Restocking Records
                </div>
            </Link>
            <Link className="tab_nav" to="/equatorialgeneralstorerestockingrecords">
                <div className="mb-3 mclickable_option">
                   Incoming Inventory Records
                </div>
            </Link>
            <Link className="tab_nav" to="/equatorialgeneralstorestocktaking">
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

export default CustodianGeneralStoreInventoryManagement