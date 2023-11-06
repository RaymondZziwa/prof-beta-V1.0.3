import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from '../../side navbar/sidenav'

const BuwamaGeneralStoreMenu = () => {
    return (
        <Row>
            <Col sm='12' md='1' lg='1' xl='1'>
                <Navbar />
            </Col>
            <Col sm='12' md='9' lg='9' xl='9' style={{marginTop:'60px'}}>
            <Link className="tab_nav" to="/buwamaregisteritem">
                    <div className="mb-3 mclickable_option">
                        Register Items
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamageneralstorerestockform">
                    <div className="mb-3 mclickable_option">
                        Restock Form
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamageneralstoreoutgoingform">
                    <div className="mb-3 mclickable_option">
                        Outgoing Form
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamageneralstoreincomingrecords">
                    <div className="mb-3 mclickable_option">
                        Restock Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamalgeneralstoreoutgoingrecords">
                    <div className="mb-3 mclickable_option">
                        Outgoing Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamaseedlingstocktaking">
                    <div className="mb-3 mclickable_option">
                        Seedlings Stock Taking
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamalivestockfeedsstocktaking">
                    <div className="mb-3 mclickable_option">
                        livestock Feeds Stock Taking
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamalivestockmedicinestocktaking">
                    <div className="mb-3 mclickable_option">
                        Livestock Medicine Stock Taking
                    </div>
                </Link>
                <Link className="tab_nav" to="/buwamaequipmentstocktaking">
                    <div className="mb-3 mclickable_option">
                       Equipment Stock Taking
                    </div>
                </Link>
            </Col>
            <Col sm='12' md='1' lg='1' xl='1'>
            </Col>
        </Row>
    )
}

export default BuwamaGeneralStoreMenu