import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import DisplayDnnRecords from './display_records/display_table'

const TrackDnns = () => {
    const [generalStoreRestockRecords, setGeneralStoreRestockRecords] = useState([])
    const [labellingStoreRestockRecords, setLabellingStoreRestockRecords] = useState([])
    const [tableData, setTableData] = useState([]);
    const [areInventoryRecordsLoading, setAreInventoryRecordsLoading] = useState(true)
    const [inventoryRecords, setInventoryRecords] = useState([])

    const fetchShopInventoryRecords = async () => {
      let res = await axios.post('http://82.180.136.230:3005/fetchallequatorialgeneralstoreinventroyrestockrecords',{
          token: localStorage.getItem('token'),
          branch: localStorage.getItem('branch')
      })
      if(Array.isArray(res.data)){
          setAreInventoryRecordsLoading(false);
          setInventoryRecords(res.data);

         // setInventoryRecords(res.data)
      }
  }


    const fetchGeneralStoreInventoryRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallequatorialcustodianrecievedrecords',{
            token:localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setGeneralStoreRestockRecords(res.data)
        }
    }

    const fetchLabellingStoreInventoryRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchlabellingdepartmentinventoryrestockingrecords',{
            token:localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setLabellingStoreRestockRecords(res.data)
        }
    }

    useEffect(()=>{
        fetchGeneralStoreInventoryRecords()
        fetchLabellingStoreInventoryRecords()
        fetchShopInventoryRecords()
    },[])

    useEffect(()=>{
        // Process your data here and set the result in tableData state using for loops
    const combinedData = [];

    for (let i = 0; i < generalStoreRestockRecords.length; i++) {
      for (let j = 0; j < labellingStoreRestockRecords.length; j++) {
        if (
          generalStoreRestockRecords[i].itemid === labellingStoreRestockRecords[j].itemId &&
          generalStoreRestockRecords[i].deliverynotenumber === labellingStoreRestockRecords[j].deliverynotenumber
        ) {
         // Check if the record already exists in combinedData
         const existingRecordIndex = combinedData.findIndex(
            (record) =>
              record.itemid === generalStoreRestockRecords[i].itemid &&
              record.deliverynotenumber === generalStoreRestockRecords[i].deliverynotenumber
          )

          if (existingRecordIndex !== -1) {
            // If the record already exists, add the quantity
            combinedData[existingRecordIndex].quantitySubmittedToCustodian +=
              generalStoreRestockRecords[i].quantityin;

            //updating discrepancy
            combinedData[existingRecordIndex].discrepancy = combinedData[existingRecordIndex].quantityin - combinedData[existingRecordIndex].quantitySubmittedToCustodian
          }else{
            const quantitySubmittedToCustodian = generalStoreRestockRecords[i].quantityin;
            const quantityin = labellingStoreRestockRecords[j].quantity
            const discrepancy = quantityin-quantitySubmittedToCustodian

          combinedData.push({
            deliverynotenumber: generalStoreRestockRecords[i].deliverynotenumber,
            itemid: generalStoreRestockRecords[i].itemid,
            itemName: labellingStoreRestockRecords[j].productName,
            quantitySubmittedToCustodian,
            units: labellingStoreRestockRecords[j].units,
            quantityin,
            discrepancy,
            deliverynoteimage: labellingStoreRestockRecords[j].deliverynoteimage
          });
          }
        }
      }
    }

    setTableData(combinedData)
    },[generalStoreRestockRecords, labellingStoreRestockRecords])

    return (
        <Row>
        <Col sm='12' md='1' lg='1' xl='1'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'40px'}}>
            <h1 style={{textAlign:'center'}}>Track Delivery Note Numbers</h1>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <DisplayDnnRecords labellingStoreRestockRecords={tableData}/>
                </Col>
            </Row>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'></Col>
    </Row>
    )
}
export default TrackDnns