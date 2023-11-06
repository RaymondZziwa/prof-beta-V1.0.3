import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Navbar from '../../../../side navbar/sidenav';

const ChickenBatchRecords = () => {
  const [isLoading, setIsLoading] = useState([]);
  const [chickenBatches, setChickenBatches] = useState([]);
  const [areRecordsLoading, setAreRecordsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [fetchedFeeds, setFetchedFeeds] = useState([]);
  const [isFetchedFeedsLoading, setIsFetchedFeedsLoading] = useState(true);

  const [areEggRecordsLoading, setAreEggRecordsLoading] = useState(true);
  const [eggRecords, setEggRecords] = useState([]);

  const [fcr, setFcr] = useState([]);

  const fetchFCRRecords = async () => {
    const res = await axios.post('http://82.180.136.230:3005/fetchallbatchfcrdata', {
      token: localStorage.getItem("token")
    });
    if (Array.isArray(res.data)) {
      console.log('fcr', res.data);
      setFcr(res.data);
    }
  };

  const [isFetchedMedicinesLoading, setIsFetchedMedicinesLoading] = useState(true);
  const [fetchedMedicines, setFetchedMedicines] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);

  const fetchHealthRecords = async () => {
    const res = await axios.post('http://82.180.136.230:3005/fetchallchickenhealthrecords', {
      token: localStorage.getItem("token")
    });
    console.log('fff', res.data);
    if (Array.isArray(res.data)) {
      setHealthRecords(res.data);
    }
  };

  const fetchAllMedicines = async () => {
    let res = await axios.post('http://82.180.136.230:3005/fetchallchickenmedicines', {
      token: localStorage.getItem('token')
    });

    if (Array.isArray(res.data)) {
      setIsFetchedMedicinesLoading(false);
      setFetchedMedicines(res.data);
    }
    console.log(res.data);
  };

  useEffect(() => {
    fetchHealthRecords();
    fetchAllMedicines();
    fetchFCRRecords();
  }, []);

  const fetchAllFeeds = async () => {
    let res = await axios.post('http://82.180.136.230:3005/fetchallchickenfeeds', {
      token: localStorage.getItem('token')
    });

    if (Array.isArray(res.data)) {
      setIsFetchedFeedsLoading(false);
      setFetchedFeeds(res.data);
    }
    console.log(res.data);
  };

  useEffect(() => {
    fetchAllFeeds();
  }, []);

  const fetchBatchData = async () => {
    const res = await axios.post('http://82.180.136.230:3005/fetchallbatchdata', {
      token: localStorage.getItem('token')
    });
    if (Array.isArray(res.data)) {
      setIsLoading(false);
      setChickenBatches(res.data);
    }
  };

  const fetchFeedingRecords = async () => {
    const res = await axios.post('http://82.180.136.230:3005/fetchallfeedingrecords', {
      token: localStorage.getItem('token')
    });
    if (Array.isArray(res.data)) {
      setRecords(res.data);
      setAreRecordsLoading(false);
    }
  };

  const fetchEggProductionRecords = async () => {
    const res = await axios.post('http://82.180.136.230:3005/fetchalleggproduction', {
      token: localStorage.getItem('token')
    });
    if (Array.isArray(res.data)) {
      setEggRecords(res.data);
      setAreEggRecordsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedingRecords();
    fetchEggProductionRecords();
    fetchBatchData();
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

  return (
    <Row>
      <Col sm="12" md="1" lg="1" xl="1">
        <Navbar />
      </Col>
      <div className="col align-self-center" style={{ marginTop: '60px' }}>
        <h1 style={{ textAlign: 'center' }}>Batch Data Records</h1>
        <table className="table table-light">
          <thead>
            <tr>
              <th scope="col">Batch Registration Date</th>
              <th scope="col">Batch Number</th>
              <th scope="col">Number Of Chicken</th>
              <th scope="col">Chicken Unit Price</th>
              <th scope="col">Total Spent On Bird Purchase (UGX)</th>
              <th scope="col">Total Spent On Feeds (UGX)</th>
              <th scope="col">Total Spent On Medicine (UGX)</th>
              <th scope="col">Total Eggs Produced</th>
              <th scope="col">Notes</th>
              <th scope="col">Batch Status</th>
              <th scope="col">Alive Chicken</th>
              <th scope="col">Chicken Lost</th>
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
            ) : (
              chickenBatches.map((item) => {
                const eggRecordsForBatch = eggRecords.filter((record) => record.batchnumber === item.batchnumber);
                const totalEggsProduced = eggRecordsForBatch.reduce((sum, record) => sum + record.totaleggscollected, 0);
                const totalFeedCost = calculateTotalFeedCost(item.batchnumber);
                const totalMedicineCost = calculateTotalMedicineCost(item.batchnumber);
                const fcrForBatch = getFCRForBatch(item.batchnumber);

                return (
                  <tr key={item.batchnumber}>
                    <td>{item.date}</td>
                    <td>{item.batchnumber}</td>
                    <td>{item.numberofchicken}</td>
                    <td>{item.chickenunitprice}</td>
                    <td>{item.totalspent}</td>
                    <td>{totalFeedCost}</td>
                    <td>{totalMedicineCost}</td>
                    <td>{totalEggsProduced}</td>
                    <td>{item.notes}</td>
                    <td>{item.status}</td>
                    <td>{item.chickenalive}</td>
                    <td>{item.chickendead}</td>
                    <td>{fcrForBatch}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Col sm="12" md="1" lg="1" xl="1"></Col>
    </Row>
  );
};

export default ChickenBatchRecords;
