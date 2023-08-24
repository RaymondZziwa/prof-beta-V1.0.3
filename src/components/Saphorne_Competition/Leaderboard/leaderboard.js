import sampleDp from '../../../imgs/sampledp.jpg'
import '../Dashboard/leaderboard.css'

const SaphroneLeaderboard = () => {
    return(
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
                    <tr>
                    <th scope="row">1</th>
                    <td >
                        <img src={sampleDp} alt="dp" height='60px' style={{borderRadius:'100px'}}/> Mark
                    </td>
                    <td>450</td>
                    <td>450</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td><img src={sampleDp} alt="dp" height='60px' style={{borderRadius:'100px'}}/> Jacob</td>
                    <td>320</td>
                    <td>450</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td><img src={sampleDp} alt="dp" height='60px' style={{borderRadius:'100px'}}/> Larry</td>
                    <td>315</td>
                    <td>450</td>
                    </tr>
                </tbody>
            </table>
    )
}
export default SaphroneLeaderboard