import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { Link } from "react-router-dom";

const EquatorialShopManagerDashboard = () => {
return(
    <Row>
    <Col sm='12' md='2' lg='2' xl='2'>
        <Navbar />
    </Col>
    <div className="col align-self-center" style={{marginTop:'20px'}}>
        <Link className="tab_nav" to="/equatorialshopinventorymenu">
            <div className="mb-3 mclickable_option">
                Manage Shop Inventory
            </div>
        </Link>
        <Link className="tab_nav" to="/manageexternalreceipts">
            <div className="mb-3 mclickable_option">
                Retrieve/Manage External Receipts
            </div>
        </Link>
        <Link className="tab_nav" to="/equatorialshopPOS">
            <div className="mb-3 mclickable_option">
                Point Of Sale
            </div>
        </Link>
        <Link className="tab_nav" to="/equatorialshopsalesdataretrieval">
            <div className="mb-3 mclickable_option">
                Sale Data Retrieval
            </div>
        </Link>
        <Link className="tab_nav" to="/recievemassagedepartmentincome">
            <div className="mb-3 mclickable_option">
                Recieve Massage Dept Income
            </div>
        </Link>
        <Link className="tab_nav" to="/fetchclientassociatedreceipts">
            <div className="mb-3 mclickable_option">
                Fetch Client Associated Receipts
            </div>
        </Link>

        <Link className="tab_nav" to="/recordequatorialexpenditure">
            <div className="mb-3 mclickable_option">
                Record Shop Expenditures
            </div>
        </Link>
        <Link className="tab_nav" to="/saveequatorialexpenditurereceipts">
            <div className="mb-3 mclickable_option">
                Save Shop Expenditure Receipts
            </div>
        </Link>
        <Link className="tab_nav" to="/viewequatorialexpenditurereceipts">
            <div className="mb-3 mclickable_option">
                View Shop Expenditure Receipts
            </div>
        </Link>
        <Link className="tab_nav" to="/equatorialshopreports">
            <div className="mb-3 mclickable_option">
                Statemental Shop Reports
            </div>
        </Link>
        <Link className="tab_nav" to="/masanafuexternalreceiptsrecords">
            <div className="mb-3 mclickable_option">
                External Receipts Records
            </div>
        </Link>
        <Link className="tab_nav" to="/equatorialshopsalesrecords">
            <div className="mb-3 mclickable_option">
                Sales Records
            </div>
        </Link>
        <Link className="tab_nav" to="/equatorialshopexpensesrecords">
            <div className="mb-3 mclickable_option">
                Expenditure Records
            </div>
        </Link>
        <Link className="tab_nav" to="/accountsettings">
            <div className="mb-3 mclickable_option">
                Settings
            </div>
        </Link>
    </div>
    <Col sm='12' md='2' lg='2' xl='2'>
    </Col>
</Row>
)
}

export default EquatorialShopManagerDashboard