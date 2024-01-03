import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";


const EquatorialMassageInventoryMgtMenu = () => {
    return(
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
                <Link className="tab_nav" to="/registermassageservice">
                    <div className="mb-3 mclickable_option">
                        Register Massage Service
                    </div>
                </Link>
                <Link className="tab_nav" to="/recordequatorialmassageinventoryrestocking">
                    <div className="mb-3 mclickable_option">
                        Inventory Restocking
                    </div>
                </Link>
                <Link className="tab_nav" to="/recordequatorialmassageinventoryoutgoings">
                    <div className="mb-3 mclickable_option">
                        Record Inventory Outgoings
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassagestocktaking">
                    <div className="mb-3 mclickable_option">
                        Stock Taking
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialmassageinventoryrecords">
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

export default EquatorialMassageInventoryMgtMenu