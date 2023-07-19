import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import { Link } from "react-router-dom";

const FeedsInventoryMenu = () => {
    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="/registerchickenfeeds">
                <div className="mb-3 mclickable_option">
                    Register Chicken Feeds Inventory
                </div>
            </Link>
            <Link className="tab_nav" to="/masanafuchickenfeedsrestockingform">
                <div className="mb-3 mclickable_option">
                    Restock
                </div>
            </Link>
            <Link className="tab_nav" to="/recordbatchfeedingrecord">
                <div className="mb-3 mclickable_option">
                    Record Feeds Taken Out
                </div>
            </Link>
            <Link className="tab_nav" to="/allfeedingrecords">
                <div className="mb-3 mclickable_option">
                    All Feeding Records
                </div>
            </Link>
            <Link className="tab_nav" to="/masanafuchickenfeedsstocktaking">
                <div className="mb-3 mclickable_option">
                    Stock Taking
                </div>
            </Link>
            <Link className="tab_nav" to="/masanafuchickenfeedsinventoryrecords">
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

export default FeedsInventoryMenu