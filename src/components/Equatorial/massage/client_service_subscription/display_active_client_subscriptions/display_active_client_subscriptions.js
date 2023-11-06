import axios from "axios"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import IndividualSubscriptionUsageModal from "./individual_subscription_usage_modal"


const DisplayActiveClientSubscription = ({ clientSubscriptionData }) => {

    const [allSubscriptionUsageRecords, setAllSubscriptionUsageRecords] = useState([])
    const [filteredRecords, setFilteredRecords] = useState([])
    const [subscriptionId, setSubscriptionId] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeModal = () => {
        setFilteredRecords(null);
        setIsModalOpen(false);
    }

    useEffect(()=> {
        const fetchSubscriptionUsageData = async () => {
            let res = await axios.post('http://82.180.136.230:3005/fetchallsubscriptionsusagerecords',{
                token: localStorage.getItem('token')
            })
            if(Array.isArray(res.data)){
                console.log('sas', res.data)
                setAllSubscriptionUsageRecords(res.data)
            }
        }

        fetchSubscriptionUsageData()
    }, [])


    const displayData = (event) => {
        event.preventDefault()
        setSubscriptionId(event.currentTarget.id)

        if(subscriptionId){
            const filteredUsageRecords = allSubscriptionUsageRecords.filter((record) => record.subscriptionId === subscriptionId)
            setFilteredRecords(filteredUsageRecords)

            if(filteredRecords){
                setIsModalOpen(true)
            }
        }
    }

    return(
        <>
            <h3 style={{textAlign:'center'}}>Display Active Client Subscriptions</h3>
            <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Subscription Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Client Names</th>
                                    <th scope="col">Client Contact</th>
                                    <th scope="col">Amount Paid</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col">Notes</th>
                                    <th scope="col">Subscription Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientSubscriptionData ? clientSubscriptionData.map(item => (
                                    <tr>
                                        <td id={item.subscriptionId} onClick={displayData} style={{color:'blue', cursor: 'pointer', textDecoration:'underline'}}>{item.subscriptionId}</td>
                                        <td>{item.subscriptiondate}</td>
                                        <td>{item.clientnames}</td>
                                        <td>{item.clientcontact}</td>
                                        <td>{item.amountPaid}</td>
                                        <td>{item.balance}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.subscriptionstatus}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan='9'>Loading...</td></tr>}
                            </tbody>
            </table>
            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                //contentLabel="Subscription Details"
            >
                <h2 style={{textAlign:'center'}}>Subscription Usage Details</h2>
                <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeModal}>Close</button>
                <IndividualSubscriptionUsageModal filteredRecords={filteredRecords}/>
            </Modal>
        </>
    )
}

export default DisplayActiveClientSubscription