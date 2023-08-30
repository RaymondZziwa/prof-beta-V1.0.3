import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'

const SaphroneCompetitionAnalysis = () => {
    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
                <h2>Competition Analysis</h2>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}
export default SaphroneCompetitionAnalysis