import { Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import Navbar from '../../../side navbar/sidenav'
import ClientNewSubscriptionForm from './client_new_subscription_form/client_new_subscription_form'
import FindActiveClientSubscriptions from './find_client_subscription/find_client_subscriptions'
import DisplayActiveClientSubscription from './display_active_client_subscriptions/display_active_client_subscriptions'
import RecordClientSubscriptionUsage from './record_subscription_usage/record_client_subscription_usage'

const EquatorialMassageClientServiceSubscription = () => {
    const [clientSubscriptionData, setClientSubscriptionData] = useState([])
    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>

            <div className="col align-self-center" style={{marginTop:'40px'}}>
                <h1 style={{textAlign:'center'}}>Client Service Subscription Management</h1>
                <Row>
                    <Col sm='12' md='3' lg='3' xl='3'>
                        <h3 style={{textAlign:'center'}}>Client Subscription Form</h3>
                        <ClientNewSubscriptionForm />
                    </Col>
                     


                    <Col sm='12' md='9' lg='9' xl='9'>
                        <h3 style={{textAlign:'center'}}>Manage Client Subscription</h3>
                        <FindActiveClientSubscriptions setClientSubscriptionData={setClientSubscriptionData}/>
                        <DisplayActiveClientSubscription clientSubscriptionData={clientSubscriptionData}/>
                        <RecordClientSubscriptionUsage />
                    </Col>
                </Row>
            </div>
            <Col sm='12' md='1' lg='1' xl='1'>
            </Col>
        </Row>
    )
}

export default EquatorialMassageClientServiceSubscription