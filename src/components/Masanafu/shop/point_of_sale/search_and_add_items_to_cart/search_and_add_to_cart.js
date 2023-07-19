import React, { useState, useEffect } from 'react';
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
  const [total, setTotal] = useState(0);

  const fetchAllMaterials = async () => {
    let res = await axios.post('http://82.180.136.230:3005/fetchallshopinventory', {
      token: localStorage.getItem('token')
    });

    if (Array.isArray(res.data)) {
      const transformedOptions = res.data.map((item) => ({
        value: item.productId.toString(),
        label: item.productName,
        productData: item // Include the whole item object as productData
      }));
      setOptions(transformedOptions);
    }
  };

  useEffect(() => {
    fetchAllMaterials();
  }, []);

  useEffect(() => {
    console.log('ops', options)
  }, [options]);


  useEffect(()=>{
    console.log('so', selectedOption)
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

  useEffect(()=>{
    console.log('cart', cartItems)
  },[cartItems])

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


  return (
    <>
      <Row>
          <Col sm='12' md='9' lg='9' xl='9'>
          <div>
            <h2>Search And Add Product To Cart</h2>
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              options={options}
              isSearchable
              placeholder="Select a product"
            /> 
            <span>
              <AddToCartBtn addToCart={handleAddToCart}/>
            </span>
          </div>
              <Cart items={cartItems} setCartItems={setCartItems} total={total} setTotal={setTotal}/>
            </Col>
            <Col sm='12' md='3' lg='3' xl='3'>
               <PaymentModule items={cartItems} total={total} />  
            </Col>
      </Row>  
    </>
  );
}

export default SearchAndAddToCart