import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const EquatorialProjectsMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/equatorialprojectsinventoryrecords">
                        <div className="mb-3 mclickable_option">
                            Projects Inventory Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialprojectsdepartmentstocktaking">
                        <div className="mb-3 mclickable_option">
                            Stock Taking
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialprojectsreceiptspaymentstatus">
                        <div className="mb-3 mclickable_option">
                            Projects Receipt Payment Status
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialissuedexternalreceiptsrecords">
                        <div className="mb-3 mclickable_option">
                            View Issued External Receipts
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialtodayscheduledprojectsclientpayments">
                        <div className="mb-3 mclickable_option">
                            Today's Projects Payments
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialprojectssalesrecords">
                        <div className="mb-3 mclickable_option">
                            Projects Sales Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialprojectsreportsmenu">
                        <div className="mb-3 mclickable_option">
                            Projects Department Reports
                        </div>
                    </Link>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default EquatorialProjectsMgtMenu