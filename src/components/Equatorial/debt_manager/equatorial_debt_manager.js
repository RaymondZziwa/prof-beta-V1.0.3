import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { Link } from "react-router-dom"


const EquatorialDebtManagerDashboard = () => {
    return(
            <Row>
                <Col sm='12' md='2' lg='2' xl='2'>
                    <Navbar />
                </Col>
                <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/managenonecashtransactions">
                        <div className="mb-3 mclickable_option">
                            None Cash Transactions (NCTs)
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/viewallpartiallypaidshopsales">
                        <div className="mb-3 mclickable_option">
                            View All Partially Paid Sales
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/viewallunpaidshopsales">
                        <div className="mb-3 mclickable_option">
                            View All Unpaid Sales
                        </div>
                    </Link>
                    <Link className="tab_nav" to="#">
                        <div className="mb-3 mclickable_option">
                            Client Projects Upgrade
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/debtmanagerpos">
                        <div className="mb-3 mclickable_option">
                            Point Of Sale
                        </div>
                    </Link>
                    <Link className="tab_nav" to="#">
                        <div className="mb-3 mclickable_option">
                            Register Exhibition Sale
                        </div>
                    </Link>
                    <Link className="tab_nav" to="#">
                        <div className="mb-3 mclickable_option">
                            Exhibition Sale Records
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/equatorialshopstocktaking">
                        <div className="mb-3 mclickable_option">
                            Shop Inventory Stock Taking
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


export default EquatorialDebtManagerDashboard