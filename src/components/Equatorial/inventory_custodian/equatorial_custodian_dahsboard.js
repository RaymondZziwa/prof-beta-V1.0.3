import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { Link } from "react-router-dom";

const EquatorialCustodianDashboard = () => {
    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="/generalinventorymanagement">
                <div className="mb-3 mclickable_option">
                    Manage General Store Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="/trackequatorialdnns">
                <div className="mb-3 mclickable_option">
                   Track Delivery Note Numbers
                </div>
            </Link>
            <Link className="tab_nav" to="/custodianreleaseinventorymgt">
                <div className="mb-3 mclickable_option">
                   Release Inventory 
                </div>
            </Link>
            <Link className="tab_nav" to="/labellinginventorymanagement">
                <div className="mb-3 mclickable_option">
                    View Labelling Dept Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="/custodianequatorialshopinventorymanagement">
                <div className="mb-3 mclickable_option">
                    View Main Shop Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="/custodianequatorialprojectsinventorymanagement">
                <div className="mb-3 mclickable_option">
                    View Projects Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="/custodianequatorialmassageinventorymanagement">
                <div className="mb-3 mclickable_option">
                    View Massage Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="/exhibitionpos">
                <div className="mb-3 mclickable_option">
                    Exhibition Point Of Sale
                </div>
            </Link>
            <Link className="tab_nav" to="/exhibitionsalesrecords">
                <div className="mb-3 mclickable_option">
                    Exhibition Sales Records
                </div>
            </Link>
            <Link className="tab_nav" to="/accountsettings">
                <div className="mb-3 mclickable_option">
                    Settings
                </div>
            </Link>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default EquatorialCustodianDashboard