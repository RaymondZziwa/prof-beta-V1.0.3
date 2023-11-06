import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import AdminNavbar from "../../side navbar/adminnavbar"


const SaffronMgtMenu = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
                    <Link className="tab_nav" to="/saffronleaderboard">
                        <div className="mb-3 mclickable_option">
                            Saffron Leaderboard
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/saffronfilteredleaderboard">
                        <div className="mb-3 mclickable_option">
                            Saffron Filtered Leaderboard
                        </div>
                    </Link>
                    <Link className="tab_nav" to="/saphronecompetitionanalysis">
                        <div className="mb-3 mclickable_option">
                            Saffron Competition Analysis
                        </div>
                    </Link>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'>
        </Col>
    </Row>
    )
}

export default SaffronMgtMenu