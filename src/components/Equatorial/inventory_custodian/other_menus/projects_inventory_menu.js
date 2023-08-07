import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { Link } from "react-router-dom";

const ProjectsInventoryMenuForInventoryCustodian = () => {
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>

        <div className="col align-self-center" style={{marginTop:'20px'}}>
        <Link className="tab_nav" to="/equatorialprojectsdepartmentstocktaking">
                    <div className="mb-3 mclickable_option">
                        Stock Taking
                    </div>
                </Link>
                <Link className="tab_nav" to="/equatorialprojectsinventoryrecords">
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
export default ProjectsInventoryMenuForInventoryCustodian