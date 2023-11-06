import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const BuwamaChickenMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
        <Link className="tab_nav" to="/buwamaallfeedingrecords">
                        <div className="mb-3 mclickable_option">
                            Chicken Feeding Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/buwamachickenfeedsinventoryrecords">
                        <div className="mb-3 mclickable_option">
                            Chicken Feeds Inventory Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/buwamachickenfeedsstocktaking">
                        <div className="mb-3 mclickable_option">
                            Chicken Feeds Stock Taking
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/buwamachickenmedicineinventoryrecords">
                        <div className="mb-3 mclickable_option">
                            Chicken Medicine Inventory Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/buwamachickenmedicinestocktaking">
                        <div className="mb-3 mclickable_option">
                            Chicken Medicine Stock Taking
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/buwamachickenbatchrecords">
                        <div className="mb-3 mclickable_option">
                            Batch Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/buwamachickenfarmstatementreport">
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

export default BuwamaChickenMgtMenu