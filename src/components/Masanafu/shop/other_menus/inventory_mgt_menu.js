import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";

const InventoryManagementMenu = () => {
return(
    <Row>
    <Col sm='12' md='2' lg='2' xl='2'>
        <Navbar />
    </Col>
    <div className="col align-self-center" style={{marginTop:'20px'}}>
        <Link className="tab_nav" to="/registershopinventory">
            <div className="mb-3 mclickable_option">
                Register Shop Inventory
            </div>
        </Link>
        <Link className="tab_nav" to="/masanafushoprestockingform">
            <div className="mb-3 mclickable_option">
                Restock
            </div>
        </Link>
        <Link className="tab_nav" to="/recordmasanafushopoutgoing">
            <div className="mb-3 mclickable_option">
                Record Outgoing inventory records
            </div>
        </Link>
        <Link className="tab_nav" to="/shopstocktaking">
            <div className="mb-3 mclickable_option">
                Stock Taking
            </div>
        </Link>
        <Link className="tab_nav" to="/masanafushopinventoryrecords">
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

export default InventoryManagementMenu