import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";

const EquatorialShopInventoryManagementMenu = () => {
return(
    <Row>
    <Col sm='12' md='2' lg='2' xl='2'>
        <Navbar />
    </Col>
    <div className="col align-self-center" style={{marginTop:'20px'}}>
        <Link className="tab_nav" to="/equatorialshopnewitemregistration">
            <div className="mb-3 mclickable_option">
                Product Manager
            </div>
        </Link>
        <Link className="tab_nav" to="/equatorialshoprestockingform">
            <div className="mb-3 mclickable_option">
                Restock
            </div>
        </Link>
        <Link className="tab_nav" to="/equatorialshopoutgoingform">
            <div className="mb-3 mclickable_option">
                Record Outgoing inventory records
            </div>
        </Link>
        <Link className="tab_nav" to="/equatorialshopstocktaking">
            <div className="mb-3 mclickable_option">
                Stock Taking
            </div>
        </Link>
        <Link className="tab_nav" to="/equatorialshopinventoryrecords">
            <div className="mb-3 mclickable_option">
                Inventory Records
            </div>
        </Link>
    </div>
    <Col sm='12' md='2' lg='2' xl='2'>
    </Col>
</Row>
)
}

export default EquatorialShopInventoryManagementMenu