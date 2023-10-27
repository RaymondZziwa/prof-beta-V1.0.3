import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const MasanafuMainShopMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/updatesaledata">
                        <div className="mb-3 mclickable_option">
                            Sale Data Retrieval
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafushopstatementreportsmenu">
                       <div className="mb-3 mclickable_option">
                            View Shop Reports
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/viewmasanafushopexpensesreceipts">
                       <div className="mb-3 mclickable_option">
                            View Expenditure Receipts
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafuexternalreceiptsrecords">
                       <div className="mb-3 mclickable_option">
                            View External Receipts
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafushopinventoryrecords">
                       <div className="mb-3 mclickable_option">
                            View Shop Inventory Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/shopstocktaking">
                       <div className="mb-3 mclickable_option">
                            View Shop Stock Taking
                        </div>
                    </Link>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default MasanafuMainShopMgtMenu