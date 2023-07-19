import { Row, Col, Form } from "react-bootstrap";
import './forms.css'
import Navbar from "../../side navbar/sidenav";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const Saveinventoryrecords = () => {
    const [status, setStatus] = useState({})
    const [itemList, setitemList] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [itemName, setitemName] = useState('')
    const [reason, setreason] = useState('')
    const [additionalInfo, setadditionalInfo] = useState('')
    const [sourceBranch, setsourceBranch] = useState('')
    const [broughtBy, setbroughtBy] = useState('')
    const [destinationBranch, setdestinationBranch] = useState('')
    const [recievedBy, setrecievedBy] = useState('')
    const [quantity, setquantity] = useState('')
    const [actualQuantity, setactualQuantity] = useState('')
    const [damages, setdamages] = useState(0)
    const [mUnit, setmUnit] = useState('')
    const [tCategory, settCategory] = useState('')
    const [outputMUnint, setoutputMUnint] = useState('')
    const expectedOutputRef = useRef()
    const dmgsRef = useRef()

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/itemlist', {
            token: localStorage.getItem("token")
        })
        setitemList(res.data)
        setisLoading(false)
    }

    useEffect(() => {
        fetchItems()
        const interval = setInterval(() => {
            fetchItems()
        }, 2000)


        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (tCategory === 'incoming') {
                setdestinationBranch(localStorage.getItem('branch'))
            } else if (tCategory === 'outgoing') {
                setsourceBranch(localStorage.getItem('branch'))
            }
        }, 1000)


        return () => clearInterval(interval)
    }, [tCategory])

    const categoryInput = event => {
        event.preventDefault()
        settCategory(event.target.value)
    }
    const unitInput = event => {
        event.preventDefault()
        setmUnit(event.target.value)
    }
    const quantityInput = event => {
        event.preventDefault()
        setquantity(event.target.value)
    }
    const actualQuantityInput = event => {
        event.preventDefault()
        setactualQuantity(event.target.value)
    }
    const damagesInput = event => {
        event.preventDefault()
        setdamages(event.target.value)
    }
    const recievedByInput = event => {
        event.preventDefault()
        setrecievedBy(event.target.value)
    }
    const dbranchInput = event => {
        event.preventDefault()
        setdestinationBranch(event.target.value)
    }
    const broughtByInput = event => {
        event.preventDefault()
        setbroughtBy(event.target.value)
    }
    const sourceBranchInput = event => {
        event.preventDefault()
        setsourceBranch(event.target.value)
    }
    const notesInput = event => {
        event.preventDefault()
        setadditionalInfo(event.target.value)
    }
    const reasonInput = event => {
        event.preventDefault()
        setreason(event.target.value)
    }
    const itemNameInput = event => {
        event.preventDefault()
        setitemName(event.target.value)
    }
    const outputMUnintInput = event => {
        event.preventDefault()
        setoutputMUnint(event.target.value)
    }
    const calcDamages = () => {
        let dmgs = quantity - actualQuantity;
        dmgsRef.current.value = dmgs.toFixed(3)
    }

    const saveDataHandler = async event => {
        event.preventDefault()
        calcDamages()
        let str = outputMUnint;
        let matches = str.match(/(\d+)/);
        if (reason === 'manufacturing and packaging') {
            if (mUnit === 'L') {
                const mls = 1000
                let convertedLitres = actualQuantity * mls
                expectedOutputRef.current.value = Math.round(convertedLitres / matches[0])
                let res = await axios.post('http://82.180.136.230:3005/saveinventoryrecord', {
                    branch: localStorage.getItem('branch'),
                    role: localStorage.getItem('role'),
                    department: localStorage.getItem('department'),
                    itemname: itemName,
                    reason: reason,
                    additionalinfo: additionalInfo,
                    sourceBranch: sourceBranch,
                    broughtBy: broughtBy,
                    destinationBranch: destinationBranch,
                    recievedBy: recievedBy,
                    quantity: quantity,
                    actualquantity: actualQuantity,
                    damages: dmgsRef.current.value,
                    expectedOutput: `${expectedOutputRef.current.value} ${outputMUnint}`,
                    mstUnit: mUnit,
                    category: tCategory,
                    authorizedBy: localStorage.getItem("username"),
                    token: localStorage.getItem("token")
                }).then(() => setStatus({ type: 'success' }))
                    .catch((err) => setStatus({ type: 'error', err }))
            } else if (mUnit === 'KG') {
                const grams = 1000
                let convertedKgs = actualQuantity * grams
                expectedOutputRef.current.value = Math.round(convertedKgs / matches[0])
                let res = await axios.post('http://82.180.136.230:3005/saveinventoryrecord', {
                    branch: localStorage.getItem('branch'),
                    role: localStorage.getItem('role'),
                    department: localStorage.getItem('department'),
                    itemname: itemName,
                    reason: reason,
                    additionalinfo: additionalInfo,
                    sourceBranch: sourceBranch,
                    broughtBy: broughtBy,
                    destinationBranch: destinationBranch,
                    recievedBy: recievedBy,
                    quantity: quantity,
                    actualquantity: actualQuantity,
                    damages: dmgsRef.current.value,
                    expectedOutput: `${expectedOutputRef.current.value} ${outputMUnint}`,
                    mstUnit: mUnit,
                    category: tCategory,
                    authorizedBy: localStorage.getItem("username"),
                    token: localStorage.getItem("token")
                }).then(() => setStatus({ type: 'success' }))
                    .catch((err) => setStatus({ type: 'error', err }))
            }
        } else {
            let res = await axios.post('http://82.180.136.230:3005/saveinventoryrecord', {
                branch: localStorage.getItem('branch'),
                role: localStorage.getItem('role'),
                department: localStorage.getItem('department'),
                itemname: itemName,
                reason: reason,
                additionalinfo: additionalInfo,
                sourceBranch: sourceBranch,
                broughtBy: broughtBy,
                destinationBranch: destinationBranch,
                recievedBy: recievedBy,
                quantity: quantity,
                actualquantity: actualQuantity,
                damages: dmgsRef.current.value,
                mstUnit: mUnit,
                category: tCategory,
                authorizedBy: localStorage.getItem("username"),
                token: localStorage.getItem("token")
            }).then(() => setStatus({ type: 'success' }))
              .catch((err) => setStatus({ type: 'error', err }))
        }
    }

    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <Navbar />
                    <div className="container  d-flex align-items-center" style={{ marginTop: '50px' }}>
                        <Form>
                            {status?.type === 'success' && <span style={{ margin: '20px' }} class="alert alert-success" role="alert">Transaction saved</span>}
                            {status?.type === 'error' && <span style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error! Transaction was not saved</span>}
                            <div style={{ marginTop: '20px' }}>
                                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={categoryInput} required>
                                    <option selected>Transaction Category</option>
                                    <option value="incoming">Incoming</option>
                                    <option value="outgoing">Outgoing</option>
                                </select>

                                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={itemNameInput} required>
                                    <option selected>Item Name</option>
                                    {isLoading ? <option>Loading Items From Database</option> :
                                        itemList.map(item => (
                                            <option>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>

                                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={reasonInput} required>
                                    <option selected>Reason</option>
                                    <option value="restocking">Restocking</option>
                                    <option value="manufacturing and packaging">Manufacturing and Packaging</option>
                                    <option value="delivery">Delivery</option>
                                    <option value="another reason">Another reason</option>
                                </select>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={notesInput} required />
                                    <label for="floatingInput">Additional Notes</label>
                                </div>

                                {tCategory === 'incoming' &&

                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={sourceBranchInput} required>
                                        <option selected>Select Source Branch</option>
                                        <option value="external-supplier">External Supplier</option>
                                        <option value="masanafu">Masanafu</option>
                                        <option value="equatorial">Equatorial</option>
                                        <option value="buwama">Buwama</option>
                                        <option value="namungoona">Namungoona</option>
                                    </select>

                                }
                                {tCategory === 'outgoing' &&

                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={sourceBranchInput} required>
                                        <option value={localStorage.getItem('branch')}>{localStorage.getItem('branch')}</option>
                                    </select>

                                }

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={broughtByInput} required />
                                    <label for="floatingInput">Delivered By</label>
                                </div>

                                {tCategory === 'incoming' &&

                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={dbranchInput} required>
                                        
                                        <option value={localStorage.getItem('branch')}>{localStorage.getItem('branch')}</option>
                                    </select>

                                }
                                {tCategory === 'outgoing' &&

                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={dbranchInput} required>
                                        <option selected>Select Destination Branch</option>
                                        <option value="masanafu">Masanafu</option>
                                        <option value="equatorial">Equatorial</option>
                                        <option value="buwama">Buwama</option>
                                        <option value="namungoona">Namungoona</option>
                                    </select>

                                }

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={recievedByInput} required />
                                    <label for="floatingInput">Recieved By</label>
                                </div>


                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={quantityInput} required />
                                    <label for="floatingInput">Quantity</label>
                                </div>


                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={actualQuantityInput} required />
                                    <label for="floatingInput">Actual Quantity</label>
                                </div>


                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} ref={dmgsRef} required readOnly />
                                    <label for="floatingInput">Damages</label>
                                </div>


                                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={unitInput} required>
                                    <option selected>Measurement</option>
                                    <option value="L">Litres</option>
                                    <option value="KG">Kilograms</option>
                                    <option value="MLS">Milliliters</option>
                                    <option value="Pcs">Pcs</option>
                                    <option disabled>---grams packaging sizes---</option>
                                    <option value="10grampcs">10 grams Pcs</option>
                                    <option value="20grampcs">20 grams Pcs</option>
                                    <option value="50grampcs">50 grams Pcs</option>
                                    <option value="100grampcs">100 grams Pcs</option>
                                    <option value="250grampcs">250 grams Pcs</option>
                                    <option value="350grampcs">350 grams Pcs</option>
                                    <option value="400grampcs">400 grams Pcs</option>
                                    <option value="450grampcs">450 grams Pcs</option>
                                    <option value="500grampcs">500 grams Pcs</option>
                                    <option value="700grampcs">700 grams Pcs</option>
                                    <option value="750grampcs">750 grams Pcs</option>
                                    <option disabled>---mls packaging sizes---</option>
                                    <option value="10mlpcs">10 mls Pcs</option>
                                    <option value="20mlpcs">20 mls Pcs</option>
                                    <option value="50mlpcs">50 mls Pcs</option>
                                    <option value="100mlpcs">100 mls Pcs</option>
                                    <option value="250mlpcs">250 mls Pcs</option>
                                    <option value="350mlpcs">350 mls Pcs</option>
                                    <option value="500mlpcs">500 mls Pcs</option>
                                    <option value="550mlpcs">550 mls Pcs</option>
                                    <option value="600mlpcs">600 mls Pcs</option>
                                    <option value="650mlpcs">650 mls Pcs</option>
                                    <option value="700mlpcs">700 mls Pcs</option>
                                    <option value="750mlpcs">750 mls Pcs</option>
                                </select>


                                {reason === 'manufacturing and packaging' &&

                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={outputMUnintInput} required>
                                        <option selected>Output Measurement</option>
                                        {mUnit === 'L' &&
                                            <>
                                                <option disabled>---mls packaging sizes---</option>
                                                <option value="10mlpcs">10 mls Pcs</option>
                                                <option value="20mlpcs">20 mls Pcs</option>
                                                <option value="50mlpcs">50 mls Pcs</option>
                                                <option value="100mlpcs">100 mls Pcs</option>
                                                <option value="250mlpcs">250 mls Pcs</option>
                                                <option value="350mlpcs">350 mls Pcs</option>
                                                <option value="400mlpcs">400 mls Pcs</option>
                                                <option value="450mlpcs">450 mls Pcs</option>
                                                <option value="500mlpcs">500 mls Pcs</option>
                                                <option value="700mlpcs">700 mls Pcs</option>
                                                <option value="750mlpcs">750 mls Pcs</option>
                                            </>
                                        }
                                        {mUnit === 'KG' &&
                                            <>
                                                <option disabled>---grams packaging sizes---</option>
                                                <option value="10grampcs">10 grams Pcs</option>
                                                <option value="20grampcs">20 grams Pcs</option>
                                                <option value="50grampcs">50 grams Pcs</option>
                                                <option value="100grampcs">100 grams Pcs</option>
                                                <option value="180grampcs">180 grams Pcs</option>
                                                <option value="250grampcs">250 grams Pcs</option>
                                                <option value="350grampcs">350 grams Pcs</option>
                                                <option value="400grampcs">400 grams Pcs</option>
                                                <option value="450grampcs">450 grams Pcs</option>
                                                <option value="500grampcs">500 grams Pcs</option>
                                                <option value="700grampcs">700 grams Pcs</option>
                                                <option value="750grampcs">750 grams Pcs</option>
                                            </>
                                        }
                                    </select>

                                }
                                {reason === 'manufacturing and packaging' &&

                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE;" }} ref={expectedOutputRef} readOnly />
                                        <label for="floatingInput">Expected number of packed pieces</label>
                                    </div>

                                }
                                <div className="mb-3" style={{ textAlign: 'center' }}>
                                    <button style={{ width: "50%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }} onClick={saveDataHandler}>SAVE</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Saveinventoryrecords