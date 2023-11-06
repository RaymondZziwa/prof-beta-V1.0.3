import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"

const BuwamaGeneralStoreMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
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
                            Livestock Feeds Stock Taking
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
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default BuwamaGeneralStoreMgtMenu