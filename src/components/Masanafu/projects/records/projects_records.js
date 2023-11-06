import { Row, Col } from "react-bootstrap";
import Navbar from "../../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";

const ProjectsRecords = () => {
    const [recordsList, setRecordsList] = useState()
    const [isRecordsListLoading, setIsRecordsListLoading] = useState(true)

    const fetchProjectsRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallprojectsrecords', {
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setIsRecordsListLoading(false)
            setRecordsList(res.data) 
        }

        console.log(res.data)
    }

    useEffect(() => {
        fetchProjectsRecords()
    },[])
    return (
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                        <table className="table table-dark" style={{ marginTop: '100px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Delivery Date</th>
                                    <th scope="col">Item Ordered</th>
                                    <th scope="col">Ordered Items Not Delivered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isRecordsListLoading ? recordsList.map(item => (
                                    <tr>
                                        <td>{item.orderid}</td>
                                        <td>{item.deliverydate}</td>
                                        <td>
                                        <table className="table table-dark" style={{ marginTop: '2px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Units Of Measurement</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(item.itemsordered).map(itemordered =>
                                                        <tr>
                                                            <td>{itemordered.itemName}</td>
                                                            <td>{itemordered.itemQuantity}</td>
                                                            <td>{itemordered.mUnits}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>{item.orderedquantitynotdelivered}</td>
                                    </tr>
                                ))
                                : <tr><td>xx</td></tr>}
                            </tbody>
                        </table>
                    </Col>
                    <Col sm='12' md='2' lg='2' xl='2'>
                        <Navbar />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProjectsRecords