import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import AddToCartBtn from '../action_buttons/add_to_cart_btn/add_to_cart_btn';
import axios from 'axios';
import Cart from '../ cart/cart'
import PaymentModule from '../../payments/payments'
import { Row, Col } from 'react-bootstrap'

const SearchAndAddToCart = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [servicesList, setServicesList] = useState(undefined)
  const [role, setRole] = useState([])
  const [destDept, setDestDept] = useState([])
  const [personnel, setPersonnel] = useState([])
  const [recievedBy, setrecievedBy] = useState('')
  const [RecieverData, setReceiverData] = useState({})
  const branchRef = useRef()
  const deptRef = useRef()
  const roleRef = useRef()

  useEffect(()=>{
    if(branchRef.current){
      setReceiverData({
        branch: branchRef.current.value,
        destDept: deptRef.current.value,
        recievedBy: recievedBy
      })
    }
  },[recievedBy])


  const recievedByInput = event => {
    event.preventDefault()
    setrecievedBy(event.target.value)
  }

  useEffect(() => {
    const fetchAllMaterials = async () => {
      let res = await axios.post('http://82.180.136.230:3005/fetchallshopinventory', {
        token: localStorage.getItem('token')
      });
  
      if (Array.isArray(res.data)) {
        const transformedOptions = res.data.map((item) => ({
          value: item.productId.toString(),
          label: item.productName,
          productData: item // Include the whole item object as productData
        }))
        setOptions(transformedOptions)
      }
    }

    fetchAllMaterials()
  },[servicesList])

  useEffect(() => {
  }, [options]);


  useEffect(()=>{
  },[selectedOption])

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    if (selectedOption) {
      const newItem = {
        id: selectedOption.productData.productId,
        name: selectedOption.label,
        unitCost: selectedOption.productData.unitPrice,
        discount: selectedOption.productData.discount,
        quantity: 1,
        totalCost: selectedOption.productData.unitPrice,
      };
  
      const itemExists = cartItems.find((item) => item.id === newItem.id);
      if (itemExists) {
        const updatedItems = cartItems.map((item) => {
          if (item.id === newItem.id) {
            const updatedQuantity = item.quantity + 1;
            const updatedTotalCost =
              updatedQuantity * item.unitCost * (1 - item.discount / 100);
            return {
              ...item,
              quantity: updatedQuantity,
              totalCost: updatedTotalCost,
            };
          }
          return item;
        });
        setCartItems(updatedItems);
      } else {
        setCartItems((prevItems) => [...prevItems, newItem]);
      }
      setSelectedOption(null);
    }
  }

  const handleCheckout = () => {
    // Perform the checkout logic here, using the cartItems and total
    console.log("Checkout:", cartItems, total);
    // Reset the cartItems and total
    setCartItems([]);
    setTotal(0);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleAddToCart(event);
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [cartItems, selectedOption])


  const fetchDepartmentData = event => {
    event.preventDefault()
    try {
        axios.post('http://82.180.136.230:3005/departmentData', {
            branch: branchRef.current.value

        }).then((res) => {
            if (res.status === 200) {
              setDestDept(res.data)
            } else {
                alert('Ooops! Something went wrong.Contact the technical team.')
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const fetchRoleData = event => {
    event.preventDefault()
    try {
        axios.post('http://82.180.136.230:3005/roleData', {
            department: deptRef.current.value
        }).then((res) => {
            if (res.status === 200) {
                setRole(res.data)
            } else {
                alert('Ooops! Something went wrong.Contact the technical team.')
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const fetchPersonnelData = event => {
    event.preventDefault()
    console.log(roleRef.current.value)
    try {
        axios.post('http://82.180.136.230:3005/personnelData', {
            role: roleRef.current.value
        }).then((res) => {
            if (res.status === 200) {
              setPersonnel(res.data)
            } else {
                alert('Ooops! Something went wrong.Contact the technical team.')
            }
        })
    } catch (error) {
        console.log(error)
    }
}
  return (
    <>
      <Row>
          <Col sm='12' md='8' lg='8' xl='8'>
          <div>
            <h2>Reciever's Data</h2>
            <select
              className="form-select"
              aria-label="Default select example"
              style={{ height: "60px", color: "#8CA6FE", display: "inline-block", width: "25%" }}
              ref={branchRef} onChange={fetchDepartmentData}
              required
            >
              <option selected>(Branch)</option>
              <option value="masanafu">Masanafu</option>
              <option value="equatorial">Equatorial</option>
              <option value="buwama">Buwama</option>
              <option value="namungoona">Namungoona</option>
            </select>
            <select
              className="form-select"
              aria-label="Default select example"
              style={{ height: "60px", color: "#8CA6FE", display: "inline-block", width: "25%" }}
              ref={deptRef} onChange={fetchRoleData}
              required
            >
              <option selected>Department</option>
              {destDept != null && destDept.map(dept => (
                <option key={dept.department} value={dept.department}>{dept.department}</option>
              ))} 
            </select>
            <select
              className="form-select"
              aria-label="Default select example"
              style={{ height: "60px", color: "#8CA6FE", display: "inline-block", width: "25%" }}
              ref={roleRef}
              onChange={fetchPersonnelData}
              required
            >
              <option selected>Role</option>
              {role != null && role.map(role => (
                <option key={role.role} value={role.role}>{role.role}</option>
              ))}
            </select>
            <select
              className="form-select"
              aria-label="Default select example"
              style={{ height: "60px", color: "#8CA6FE", display: "inline-block", width: "25%" }}
              required
              onChange={recievedByInput}
            >
              <option selected>Personnel</option>
              {personnel != null && personnel.map(personnel => (
                <option key={personnel.username} value={personnel.username}>{personnel.username}</option>
              ))}
            </select>
            <h2>Search And Add To External Receipt</h2>
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              options={options}
              isSearchable
              placeholder="Select a product"
            /> 
            <span>
              <AddToCartBtn addToCart={handleAddToCart} />
            </span>
          </div>
              <Cart items={cartItems} setCartItems={setCartItems} total={total} setTotal={setTotal}/>
            </Col>
            <Col sm='12' md='4' lg='4' xl='4'>
               <PaymentModule items={cartItems} total={total} servicesList={servicesList} RecieverData={RecieverData}/>  
            </Col>
      </Row>  
    </>
  );
}

export default SearchAndAddToCart