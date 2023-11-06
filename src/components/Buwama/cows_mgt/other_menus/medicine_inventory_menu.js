import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom"

const BuwamaCattleMedicineInventoryMenu = () => {
    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="/registercattlemedicine">
                <div className="mb-3 mclickable_option">
                    Register Cattle Drug Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="/buwamacattlemedicinerestockingform">
                <div className="mb-3 mclickable_option">
                    Restock
                </div>
            </Link>
            <Link className="tab_nav" to="/buwamacattlemedicinestocktaking">
                <div className="mb-3 mclickable_option">
                    Stock Taking
                </div>
            </Link>
            <Link className="tab_nav" to="/buwamacattlenmedicineinventoryrecords">
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

export default BuwamaCattleMedicineInventoryMenu