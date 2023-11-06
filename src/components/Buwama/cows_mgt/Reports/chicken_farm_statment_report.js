import { Row, Col } from 'react-bootstrap';
import Navbar from '../../../side navbar/sidenav';
import ReportPrintingButton from '../../../Equatorial/shop/reports/reports_generic_components/support_components/report_printing button';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BuwamaCattleFarmStatementReport = () => {
  const [isLoading, setIsLoading] = useState([]);
  const [chickenBatches, setChickenBatches] = useState([]);
  const [areRecordsLoading, setAreRecordsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [fetchedFeeds, setFetchedFeeds] = useState([]);
  const [isFetchedFeedsLoading, setIsFetchedFeedsLoading] = useState(true);

  const [areEggRecordsLoading, setAreEggRecordsLoading] = useState(true);
  const [eggRecords, setEggRecords] = useState([]);
  const [fetchedMedicines, setFetchedMedicines] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);

  const fetchHealthRecords = async () => {
    const res = await axios.post('http://82.180.136.230:3005/buwamafetchalllivestockhealthrecords', {
      token: localStorage.getItem("token")
    });
    console.log('fff', res.data);
    if (Array.isArray(res.data)) {
      setHealthRecords(res.data);
    }
  };

  const fetchAllMedicines = async () => {
    let res = await axios.post('http://82.180.136.230:3005/fetchallbuwamalivestockmedicines', {
      token: localStorage.getItem('token')
    });

    if (Array.isArray(res.data)) {
      setFetchedMedicines(res.data);
    }
    console.log(res.data);
  };

  useEffect(() => {
    fetchHealthRecords();
    fetchAllMedicines();
    //fetchFCRRecords();
  }, []);

  const [fcr, setFcr] = useState([]);

  const [batchNumber, setBatchNumber] = useState('');

  const batchNumberHandler = (event) => {
    event.preventDefault();
    const inputBatchNumber = event.target.value;
    setBatchNumber(inputBatchNumber);
  };

  useEffect(() => {
    const fetchFCRRecords = async () => {
      const res = await axios.post('http://82.180.136.230:3005/buwamafetchalllivestockbatchfcrdata', {
        token: localStorage.getItem('token'),
      });
      if (Array.isArray(res.data)) {
        console.log('fcr', res.data);
        setFcr(res.data);
      }
    };

    const fetchBatchData = async () => {
      const res = await axios.post('http://82.180.136.230:3005/buwamafetchalllivestockbatchdata', {
        token: localStorage.getItem('token'),
      });
      if (Array.isArray(res.data)) {
        setIsLoading(false);
        setChickenBatches(res.data);
      }
    };

    const fetchFeedingRecords = async () => {
      const res = await axios.post('http://82.180.136.230:3005/buwamafetchallfeedingrecords', {
        token: localStorage.getItem('token'),
      });
      if (Array.isArray(res.data)) {
        setRecords(res.data);
        setAreRecordsLoading(false);
      }
    };

    const fetchEggProductionRecords = async () => {
      const res = await axios.post('http://82.180.136.230:3005/buwamafetchallmilkproduction', {
        token: localStorage.getItem('token'),
      });
      if (Array.isArray(res.data)) {
        setEggRecords(res.data);
        setAreEggRecordsLoading(false);
      }
    };

    const fetchAllFeeds = async () => {
      let res = await axios.post('http://82.180.136.230:3005/fetchallchickenfeeds', {
        token: localStorage.getItem('token'),
      });

      if (Array.isArray(res.data)) {
        setIsFetchedFeedsLoading(false);
        setFetchedFeeds(res.data);
      }
      console.log(res.data);
    };

    fetchBatchData();
    fetchFeedingRecords();
    fetchEggProductionRecords();
    fetchFCRRecords();
    fetchAllFeeds();
  }, []);

  const calculateTotalFeedCost = (batchNumber) => {
    const feedingRecordsForBatch = records.filter((record) => record.batchnumber === batchNumber);
    let totalCost = 0;
    feedingRecordsForBatch.forEach((record) => {
      const feedData = fetchedFeeds.find((feed) => feed.productId === record.feedsid);
      if (feedData) {
        const feedUnitPrice = feedData.unitPrice;
        const feedAmount = record.feedsquantity;
        const feedCost = feedUnitPrice * feedAmount;
        totalCost += feedCost;
      }
    });
    return totalCost;
  };

  const calculateTotalMedicineCost = (batchNumber) => {
    const healthRecordsForBatch = healthRecords.filter((record) => record.batchnumber === batchNumber);
    let totalCost = 0;
    healthRecordsForBatch.forEach((record) => {
      const medicineData = fetchedMedicines.find((medicine) => medicine.productId === record.medicinename);
      if (medicineData) {
        const medicineUnitPrice = medicineData.unitPrice;
        const medicineAmount = record.medicinequantityused;
        const medicineCost = medicineUnitPrice * medicineAmount;
        totalCost += medicineCost;
      }
    });
    return totalCost;
  };

  const getFCRForBatch = (batchNumber) => {
    const fcrRecord = fcr.find((record) => record.batchnumber === batchNumber);
    return fcrRecord ? fcrRecord.fcrvalue : '';
  };

  const filteredBatches = chickenBatches.filter((item) => item.batchnumber === batchNumber);

  return (
    <div>
      <Row>
        <Col sm="12" md="1" lg="1" xl="1">
          <Navbar />
        </Col>
      </Row>
      <Row>
        <h1 style={{ textAlign: 'center', color: 'black', marginTop: '60px' }}>
          Buwama Livestock Batch Statement Report{' '}
          <span style={{ float: 'right', marginRight: '10px' }}>
            <ReportPrintingButton />
          </span>
        </h1>
        <p style={{ textAlign: 'center', color: 'black', marginTop: '5px', fontSize: '20px' }}>
          As On: {new Date().toLocaleString()}
        </p>
        <Col sm="12" md="12" lg="12" xl="12">
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingInput"
                placeholder="Order-Id"
                style={{ color: '#8CA6FE' }}
                required
                onChange={batchNumberHandler}
              />
              <label htmlFor="floatingInput">Search By Batch Number</label>
            </div>
          </div>
          <h1 style={{ textAlign: 'center' }}>Batch Report</h1>
          <table className="table table-light">
            <thead>
              <tr>
              <th scope="col">Batch Registration Date</th>
                <th scope="col">Batch Number</th>
                <th scope="col">Animal Name</th>
                <th scope="col">Number Of Livestock</th>
                <th scope="col">Unit Price (UGX)</th>
                <th scope="col">Total Spent On  Purchase (UGX)</th>
                <th scope="col">Total Spent On Feeds (UGX)</th>
                <th scope="col">Total Spent On Medicine (UGX)</th>
                <th scope="col">Total Milk (L) Produced</th>
                <th scope="col">Notes</th>
                <th scope="col">Batch Status</th>
                <th scope="col">Alive Livestock</th>
                <th scope="col">Livestock Lost</th>
                <th scope="col">Batch FCR</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="14" style={{ textAlign: 'center' }}>
                    Loading.....
                  </td>
                </tr>
              ) : filteredBatches.length > 0 ? (
                filteredBatches.map((item) => {
                  const eggRecordsForBatch = eggRecords.filter((record) => record.batchnumber === item.batchnumber);
                  const totalEggsProduced = eggRecordsForBatch.reduce((sum, record) => sum + record.totalLitrescollected, 0);
                  const totalFeedCost = calculateTotalFeedCost(item.batchnumber);
                  const totalMedicineCost = calculateTotalMedicineCost(item.batchnumber);
                  const fcrForBatch = getFCRForBatch(item.batchnumber);

                  return (
                    <tr key={item.batchnumber}>
                      <td>{item.date}</td>
                      <td>{item.batchnumber}</td>
                      <td>{item.animalName}</td>
                      <td>{item.numberofanimals}</td>
                      <td>{item.unitprice}</td>
                      <td>{item.totalspent}</td>
                      <td>{totalFeedCost}</td>
                      <td>{totalMedicineCost}</td>
                      <td>{totalEggsProduced}</td>
                      <td>{item.notes}</td>
                      <td>{item.status}</td>
                      <td>{item.animalsalive}</td>
                      <td>{item.animalsdead}</td>
                      <td>{fcrForBatch}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="14" style={{ textAlign: 'center' }}>
                    No records found for the batch number: {batchNumber}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default BuwamaCattleFarmStatementReport
