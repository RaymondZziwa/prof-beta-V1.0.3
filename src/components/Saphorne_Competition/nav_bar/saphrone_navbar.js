import './navbar.css'

import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { tokenMgtActions } from '../store/store'

const SaphroneNavbar = ({isOpen}) => {
  const userData = useSelector((state)=> state.tokenmgt.userData)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    localStorage.clear()
    dispatch(tokenMgtActions.logout())
  }
    return(
    <div className={`navbar-saphrone ${isOpen ? 'open' : ''}`}>
      {/* <button className="toggle-button" onClick={toggleNavbar}>
        Toggle Navbar
      </button> */}
      <nav>
        <div className='Profile' style={{textAlign:'center'}}>
            <img src={`http://82.180.136.230:3005/${userData.profilepicture}`} alt="user_profile_picture" height='150px' style={{borderRadius:'100px'}}/>
            <p>{userData.firstName} {userData.lastName}</p>
        </div>
        <ul className='saphrone-nav'>
          <li><Link to="/saphroneparticipantdashboard">Dashboard</Link></li>
          <li><Link to="/filtersaphroneparticipantdashboard">View Filtered Leaderboard</Link></li>
          <li><Link to="/manageuserprofile">Manage Your Profile</Link></li>
          <li><Link to="/profbioresearchsaphronecompetitionauth" onClick={logoutHandler}>Log Out <FontAwesomeIcon icon={faArrowRightFromBracket}/></Link></li>
        </ul>
      </nav>  
    </div>
    )
}
export default SaphroneNavbar