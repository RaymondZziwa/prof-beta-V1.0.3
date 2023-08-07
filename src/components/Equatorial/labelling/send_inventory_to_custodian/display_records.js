import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'

const EquatorialLabellingInventoryTransferRecords = ({inventoryRecords}) => {
    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div style={{marginTop:'60px'}}>
                <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Quantity In</th>
                                <th scope="col">Units</th>
                                <th scope="col">DeliveredTo</th>
                                <th scope="col">Other Destination Info</th>
                                <th scope="col">Notes</th>
                                <th scope="col">Delivery Note Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!inventoryRecords ? <tr><td colSpan="11" style={{textAlign:'center'}}>Loading.....</td></tr> :
                                inventoryRecords.map(item => (
                                    <tr key={item.restockId}>
                                        <td>{item.date}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.quantitydelivered}</td>
                                        <td>{item.units}</td>
                                        <td>{item.deliveredto}</td>
                                        <td>{item.otherdestinationinfo}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.deliverynotenumber}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'></Col>
        </Row>
    )
}
export default EquatorialLabellingInventoryTransferRecords