import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPrint } from "@fortawesome/free-solid-svg-icons"

const ReportPrintingButton = () => {
    
    const printReport = event => {
        event.preventDefault()
        window.print()
    }
    return(
        <span>
            <button style={{border:'none',backgroundColor:'#E9E9E9'}} onClick={printReport}><FontAwesomeIcon icon={faPrint}/></button>
        </span>
    )
}

export default ReportPrintingButton