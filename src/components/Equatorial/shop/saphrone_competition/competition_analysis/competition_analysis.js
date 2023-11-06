import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import { Link } from 'react-router-dom'

const SaphroneCompetitionAnalysis = () => {
    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <Col  sm='12' md='8' lg='8' xl='8' style={{marginTop:'60px'}}>
                <h2 style={{textAlign:'center'}}>Competition Analysis</h2>
                <Link className="tab_nav" to="/saphronedailycompetitionanalysis">
                    <div className="mb-3 mclickable_option">
                       Daily Analysis
                    </div>
                </Link>
                <Link className="tab_nav" to="/saphroneweeklycompetitionanalysis">
                    <div className="mb-3 mclickable_option">
                        Weekly Analysis
                    </div>
                </Link>
                <Link className="tab_nav" to="/saphronemonthlycompetitionanalysis">
                    <div className="mb-3 mclickable_option">
                        Monthly Analysis
                    </div>
                </Link>
            </Col>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}
export default SaphroneCompetitionAnalysis