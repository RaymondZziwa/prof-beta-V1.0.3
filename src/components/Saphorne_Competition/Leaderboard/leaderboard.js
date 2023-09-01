const SaphroneLeaderboard = ({participantData}) => {
    return (
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
                {participantData.map((record, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                            <img src={`http://82.180.136.230:3005/${record.profilepicture}`} alt="dp" height='60px' style={{ borderRadius: '100px' }} /> {record.firstName} {record.lastName}
                        </td>
                        <td>{record.merchandisesold}</td>
                        <td>{record.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SaphroneLeaderboard;
