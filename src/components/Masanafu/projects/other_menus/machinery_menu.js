import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";

const MachineryMenu = () => {
    return (
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
            <Link className="tab_nav" to="/registerequipment">
                    <div className="mb-3 mclickable_option">
                        Register Equipment
                    </div>
                </Link>
                <Link className="tab_nav" to="/registerproject">
                    <div className="mb-3 mclickable_option">
                        Register Project
                    </div>
                </Link>
                <Link className="tab_nav" to="/managemachinerydata">
                    <div className="mb-3 mclickable_option">
                        Add / Edit Machninery Data
                    </div>
                </Link>
                <Link className="tab_nav" to="/materialcalculator">
                    <div className="mb-3 mclickable_option">
                        Material Calculator
                    </div>
                </Link>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}

export default MachineryMenu