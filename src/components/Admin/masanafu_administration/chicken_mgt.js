import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const MasanafuChickenMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
        <Link className="tab_nav" to="/allfeedingrecords">
                        <div className="mb-3 mclickable_option">
                            Chicken Feeding Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafuchickenfeedsinventoryrecords">
                        <div className="mb-3 mclickable_option">
                            Chicken Feeds Inventory Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafuchickenfeedsstocktaking">
                        <div className="mb-3 mclickable_option">
                            Chicken Feeds Stock Taking
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafuchickenmedicineinventoryrecords">
                        <div className="mb-3 mclickable_option">
                            Chicken Medicine Inventory Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/masanafuchickenmedicinestocktaking">
                        <div className="mb-3 mclickable_option">
                            Chicken Medicine Stock Taking
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/chickenbatchrecords">
                        <div className="mb-3 mclickable_option">
                            Batch Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/chickenfarmstatementreport">
                        <div className="mb-3 mclickable_option">
                            Reports
                        </div>
                    </Link>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default MasanafuChickenMgtMenu