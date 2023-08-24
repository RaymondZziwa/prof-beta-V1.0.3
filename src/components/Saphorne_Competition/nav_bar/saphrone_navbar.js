import './navbar.css'
import sampleDp from '../../../imgs/sampledp.jpg'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const SaphroneNavbar = ({isOpen}) => {
    return(
    <div className={`navbar-saphrone ${isOpen ? 'open' : ''}`}>
      {/* <button className="toggle-button" onClick={toggleNavbar}>
        Toggle Navbar
      </button> */}
      <nav>
        <div className='Profile' style={{textAlign:'center'}}>
            <img src={sampleDp} alt="dp" height='150px' style={{borderRadius:'100px'}}/>
            <p>Zziwa Raymond Ian</p>
        </div>
        <ul className='saphrone-nav'>
          <li><Link to="/saphroneparticipantdashboard">Dashboard</Link></li>
          <li><Link to="/filtersaphroneparticipantdashboard">View Filtered Leaderboard</Link></li>
          <li><Link to="/manageuserprofile">Manage Your Profile</Link></li>
          <li><Link to="/profbioresearchsaphronecompetitionauth">Log Out <FontAwesomeIcon icon={faArrowRightFromBracket}/></Link></li>
        </ul>
      </nav>
    </div>
    )
}
export default SaphroneNavbar