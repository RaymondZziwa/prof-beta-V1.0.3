import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

const DisplayLabellingDailyOutputRecords = ({records}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(records.length / itemsPerPage)

    return(
        <div style={{marginTop:'60px'}}>
        <table className="table table-light">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity Labelled</th>
                        <th scope="col">Units</th>
                        <th scope="col">Recorded By</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Delivery Note Number</th>
                    </tr>
                </thead>
                <tbody>
                    {records ? (
                            records
                                .slice(startIndex, endIndex)
                                .map((item, index) => {
                                const globalIndex = startIndex + index + 1; // Calculate the global index

                                return (
                                    <tr key={item.id}>
                                        <td>{item.date}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.units}</td>
                                        <td>{item.recordedby}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.deliverynotenumber}</td>
                                    </tr>
                                );
                                })
                            ) : (
                            <tr>
                                <td colSpan={4}>Loading...</td>
                            </tr>
                    )}
                </tbody>
            </table>
            {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                        <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPage} of {totalPages}</span>
                            <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                        </div>
            )}
    </div>
    )
}
export default DisplayLabellingDailyOutputRecords