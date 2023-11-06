import { useHistory } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../../store/auth-context"

const LogInBtn = () => {
    const authCtx = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = () => {
        authCtx.logout();
        history.replace('/Login')
    }
    return (
        <>
            <span style={{fontWeight:"bold",color:"red",cursor:"pointer"}} onClick={logoutHandler}>Log In</span>
        </>
    )
}

export default LogInBtn;