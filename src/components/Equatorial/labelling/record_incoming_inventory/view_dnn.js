import { useEffect, useState } from "react"

const ViewDeliveryNoteNumber = ({DNN_PATH}) => {
    const [DNN_IMAGE, setDNN_IMAGE] = useState(null)
    useEffect(() => {
        const fetchDNN = async  => {
            const DNN_IMAGE = `http://82.180.136.230:3005/${DNN_PATH}`
            if(DNN_IMAGE){
                setDNN_IMAGE(DNN_IMAGE)
            }
        }
        fetchDNN()
      }, [DNN_PATH])
    return (
        <>
            <div className="mb-3">
             {DNN_IMAGE && <img src={DNN_IMAGE} alt="Receipt" className="img-fluid" style={{height:'800px', width:'800px'}}/>}
            </div>
        </>
    )
}
export default ViewDeliveryNoteNumber