import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from "react-bootstrap"
import { useEffect, useState } from 'react'
import NewClientProjectsForm from './new_projects_form/new_projects_form'
import DisplayClientOrders from './display_client_orders/display_client_orders'

const ClientProjectsUpgrade = () => {
    const [status, setStatus] = useState('')

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
      }, [status])

    return(
        <>
            <Row>
                    <Col sm='12' md='3' lg='3' xl='3'>
                        <h4 style={{textAlign:'center', marginTop:'80px'}}> New Project Order</h4>
                        {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                        {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                        <NewClientProjectsForm setStatus={setStatus}/>
                    </Col>
                    <Col sm='12' md='9' lg='9' xl='9'>
                        <h2 style={{textAlign:'center', marginTop:'60px'}}>Client Projects Orders</h2>
                        <DisplayClientOrders />
                    </Col>
                    <Col sm='12' md='1' lg='1' xl='1' style={{backgroundColor:'pink'}}>
                        <Navbar />
                    </Col>
                </Row>
        </>
    )
}
export default ClientProjectsUpgrade