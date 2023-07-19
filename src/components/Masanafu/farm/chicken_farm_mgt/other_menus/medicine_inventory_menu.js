import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import { Link } from "react-router-dom"

const MedicineInventoryMenu = () => {
    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="/registerchickenmedicine">
                <div className="mb-3 mclickable_option">
                    Register Chicken Drug Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="/masanafuchickenmedicinerestockingform">
                <div className="mb-3 mclickable_option">
                    Restock
                </div>
            </Link>
            <Link className="tab_nav" to="/masanafuchickenmedicinestocktaking">
                <div className="mb-3 mclickable_option">
                    Stock Taking
                </div>
            </Link>
            <Link className="tab_nav" to="/masanafuchickenmedicineinventoryrecords">
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

export default MedicineInventoryMenu