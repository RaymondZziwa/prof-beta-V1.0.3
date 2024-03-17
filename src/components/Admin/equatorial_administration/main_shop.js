import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const EquatorialMainShopMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/managenctsbydebtmanager">
                        <div className="mb-3 mclickable_option">
                            Manage NCTs
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialshopsalesdataretrieval">
                        <div className="mb-3 mclickable_option">
                            Sale Data Retrieval
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/fetchclientassociatedreceipts">
                        <div className="mb-3 mclickable_option">
                            Fetch Client Associated Receipts
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/managesuppliers">
                        <div className="mb-3 mclickable_option">
                            Manage Suppliers
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/managecheques">
                       <div className="mb-3 mclickable_option">
                            Cheque Management
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialshopreports">
                       <div className="mb-3 mclickable_option">
                            View Shop Reports
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/viewequatorialexpenditurereceipts">
                       <div className="mb-3 mclickable_option">
                            View Expenditure Receipts
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafuexternalreceiptsrecords">
                       <div className="mb-3 mclickable_option">
                            View External Receipts
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialshopinventoryrecords">
                       <div className="mb-3 mclickable_option">
                            View Shop Inventory Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialshopstocktaking">
                       <div className="mb-3 mclickable_option">
                            View Shop Stock Taking
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/manageequatorialshopexpenditures">
                       <div className="mb-3 mclickable_option">
                            Edit Expenditure Dates
                        </div>
                    </Link>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default EquatorialMainShopMgtMenu