import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../side navbar/adminnavbar'
import { Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"
import Modal from "react-modal"
import EditSaleForm from './edit_forms/edit_sale_form'

const EditEquatorialShopSales = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [salesData, setSalesData] = useState([])
    const [status, setStatus] = useState('')
    const [isModalOpen, setIsModalOpen] = useState('')
    const [selectedSale, setSelectedSale] = useState([])

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 5

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(salesData.length / itemsPerPage)

    useEffect(()=>{
        setTimeout(()=>{
            setStatus('')
        },5000)
    },[status])

    const fetchSalesData = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallequatorialshopsales', {
          token: localStorage.getItem('token')
        });
    
        if (Array.isArray(res.data)) {
          setIsLoading(false);
          const sortedRecords = res.data.slice().sort((a, b) => {
              // Assuming saleDate is in the format dd/mm/yyyy
              const partsA = a.saleDate.split('/');
              const partsB = b.saleDate.split('/');
              
              // Convert to Date objects and compare in descending order
              const dateA = new Date(`${partsA[1]}/${partsA[0]}/${partsA[2]}`);
              const dateB = new Date(`${partsB[1]}/${partsB[0]}/${partsB[2]}`);
      
              return dateB - dateA;
          });

          setSalesData(sortedRecords);
        }
      };

    useEffect(() => { 
        fetchSalesData();
    }, [])

    

    const openEditSaleModal =  async (receiptNumber) => {
        console.log(receiptNumber)

        let sortedSale = salesData.filter((sale) => sale.receiptNumber === receiptNumber)
        setSelectedSale(sortedSale)
    }

    useEffect(() => {
        console.log(selectedSale)
        if(selectedSale.length > 0 && selectedSale[0]) {
            setIsModalOpen(true);
        }
    }, [selectedSale]);


    const deleteSale = async (receiptNumber) => {
        let res = await axios.post('http://82.180.136.230:3005/deleteequatorialshopsale',{
            token: localStorage.getItem('token'),
            receiptNumber: receiptNumber
        }).then((res)=>{
            setStatus(res.data.msg)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
                <Row>
                    <Col sm='12' md='1' lg='1' xl='1'>
                        <AdminNavbar />
                    </Col>
                    <Col sm='12' md='10' lg='10' xl='10'>
                    <h2 style={{textAlign:'center', marginTop:'60px'}}>Equatorial Shop Sales Records</h2>
                        <table className="table table-light" style={{ marginTop: '30px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Receipt No.</th>
                                    <th scope="col">Sale Date</th>
                                    <th scope="col">Customer Names</th>
                                    <th scope="col">Customer Contact</th>
                                    <th scope="col">Items Sold</th>
                                    <th scope="col">Total Sale Amount</th>
                                    <th scope="col">Amount Paid</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col">Additional Notes</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isLoading ? salesData.slice(startIndex, endIndex).map(item => (
                                    <tr key={item.receiptNumber}>
                                        <td>{item.receiptNumber}</td>
                                        <td>{item.saleDate}</td>
                                        <td>{item.customerNames}</td>
                                        <td>{item.customerContact}</td>
                                        <td>
                                        <table className="table table-light" style={{ marginTop: '2px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Unit Price (UGX)</th>
                                                        <th scope="col">Discount</th>
                                                        <th scope="col">Total Cost (UGX)</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(item.itemsSold).map(itemordered =>
                                                        <tr>
                                                                <td>{itemordered.name}</td>
                                                                <td>{itemordered.quantity}</td>
                                                                <td>{itemordered.unitCost}</td>
                                                                <td>{itemordered.discount}</td>
                                                                <td>{itemordered.totalCost}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>{item.totalAmount}</td>
                                        <td>{item.totalAmount-item.balance}</td>
                                        <td>{item.balance}</td>
                                        <td>{item.additionalinfo}</td>
                                        <td>
                                            <button onClick={() => openEditSaleModal(item.receiptNumber)}>Edit Sale</button>
                                            <button style={{marginTop:'20px'}} onClick={() => deleteSale(item.receiptNumber)}>Delete Sale</button>
                                        </td>
                                    </tr>
                                ))
                                : <tr><td colSpan='10'>Loading...</td></tr>}
                            </tbody>
                        </table>
                        {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                        <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPage} of {totalPages}</span>
                            <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                        </div>
                    )}
                    {/* Modal */}
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                    >
                        <h2 style={{textAlign:'center'}}>Edit Sale</h2>
                        <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeModal}>Close</button>
                    {selectedSale.length > 0 && <EditSaleForm sale={selectedSale} fetchSalesData={fetchSalesData}/> }
                    </Modal>
                    </Col>
                </Row>
    )
}

export default EditEquatorialShopSales