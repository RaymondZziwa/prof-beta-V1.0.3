import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

const SaphroneLeaderboard = ({participantData}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(participantData.length / itemsPerPage)

    return (
        <>
            <table className='leaderboard-table'>
            <thead>
                <tr>
                    <th scope="col">Rankings</th>
                    <th scope="col">Participant</th>
                    <th scope="col">Quantity Sold</th>
                    <th scope="col">Points</th>
                </tr>
            </thead>
            <tbody>  
                {participantData ? (
                participantData
                    .slice(startIndex, endIndex)
                    .map((record, index) => {
                    const globalIndex = startIndex + index + 1; // Calculate the global index

                    return (
                        <tr key={globalIndex}>
                        <th scope="row">{globalIndex}</th>
                        <td>
                            <img
                            src={`http://82.180.136.230:3005/${record.profilepicture}`}
                            alt="dp"
                            height="60px"
                            style={{ borderRadius: '100px' }}
                            />{' '}
                            {record.firstName} {record.lastName}
                        </td>
                        <td>{record.merchandisesold}</td>
                        <td>{record.points}</td>
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
                    <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'white',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                <span style={{ margin: '0 10px', color:'white' }}>Page {currentPage} of {totalPages}</span>
                    <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'white',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                </div>
            )}
        </>
    );
};

export default SaphroneLeaderboard;
