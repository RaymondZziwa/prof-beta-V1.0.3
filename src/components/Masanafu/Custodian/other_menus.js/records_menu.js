import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";

const CustodianRecordsMenu = () => {
    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
                <Link className="tab_nav" to="/farmrequestsrecords">
                    <div className="mb-3 mclickable_option">
                        Farm Requests Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/projectsrequestsrecords">
                    <div className="mb-3 mclickable_option">
                        Projects Requests Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/rawmaterialrequestsrecords">
                    <div className="mb-3 mclickable_option">
                    Production Raw Material Requests Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/productionrecords">
                    <div className="mb-3 mclickable_option">
                    Production Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/exhibtionrecords">
                    <div className="mb-3 mclickable_option">
                    Exhibition Records
                    </div>
                </Link>
                <Link className="tab_nav" to="/orderrecords">
                    <div className="mb-3 mclickable_option">
                    Orders Records
                    </div>
                </Link>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}

export default CustodianRecordsMenu