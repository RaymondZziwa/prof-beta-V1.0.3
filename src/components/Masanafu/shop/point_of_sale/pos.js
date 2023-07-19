import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import SearchAndAddToCart from "./search_and_add_items_to_cart/search_and_add_to_cart"
import { useState } from 'react'
const POS = () => {
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (itemToAdd) => {
      // Check if the item is already in the cart
      const existingItem = cartItems.find((item) => item.id === itemToAdd.id);
  
      if (existingItem) {
        // If the item already exists, update its quantity and total cost
        const updatedItems = cartItems.map((item) => {
          if (item.id === itemToAdd.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
              totalCost: item.totalCost + itemToAdd.unitCost
            };
          }
          return item;
        });
        setCartItems(updatedItems);
      } else {
        // If the item is new, add it to the cart
        setCartItems([...cartItems, itemToAdd]);
      }
    };
    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'40px'}}>
            <h1 style={{textAlign:'center'}}>Point Of Sale</h1>
            <Row>
                <Col sm='12' md='10' lg='10' xl='10'>
                    <SearchAndAddToCart onAddToCart={handleAddToCart} cartItems={cartItems}/>
                </Col> 
            </Row>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'></Col>
    </Row>
    )
}

export default POS