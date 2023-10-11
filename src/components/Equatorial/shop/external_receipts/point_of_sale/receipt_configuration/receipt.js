import { Row, Col } from 'react-bootstrap'
const ReceiptConfiguration = ({ cart }) => {
    return (
        <Row>
            <Col sm ='12' md='12' lg='12' xl='12'>
                Client's First Name: Zziwa<br></br>
                Client's Last Name: Ian<br></br>
                Clients's Contact: 0775149572<br></br>
                Payment Method: Airtel Money <br></br>
                Payment Status: Fully paid <br></br>
                Notes: <br></br>

                <h3>Items Sold</h3>
                fsngifsbnivedlnbsint

                served From (Branch): {localStorage.getItem('Branch')}
                Served By: {localStorage.getItem('username')}
            </Col>
       </Row>
    )
}

export default ReceiptConfiguration