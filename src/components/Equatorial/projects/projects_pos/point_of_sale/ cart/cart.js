import { useState, useEffect } from "react";

const Cart = ({items, setCartItems, total, setTotal}) => {

  const deleteHandler = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
  };

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value);
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        const totalCost = newQuantity * item.unitCost * (1 - item.discount / 100);
        return { ...item, quantity: newQuantity, totalCost };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleDiscountChange = (itemId, event) => {
    const newDiscount = parseInt(event.target.value);
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        const totalCost = item.quantity * item.unitCost * (1 - newDiscount / 100);
        return { ...item, discount: newDiscount, totalCost };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of items) {
      total += item.quantity * item.unitCost * (1 - item.discount / 100);
    }
    return total;
  };

  useEffect(() => {
    console.log('cartitems', items);
  }, [items]);

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  useEffect(() => {
    setCartItems(items);
  }, [items, setCartItems]);

  useEffect(() => {
    let calculatedTotal = 0;
    for (const item of items) {
      calculatedTotal += item.quantity * item.unitCost * (1 - item.discount / 100);
    }
    setTotal(calculatedTotal);
  }, [items, setTotal]);

  return (
    <>
    <h3 style={{ textAlign: "center" }}>Cart</h3>
    <table className="table table-light">
      <thead>
        <tr>
          <th>Item Id</th>
          <th>Item Name</th>
          <th>Quantity per Item</th>
          <th>Unit Cost (UGX)</th>
          <th>Discount (%)</th>
          <th>Total Quantity</th>
          <th>Total Cost (UGX)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan="8" style={{ textAlign: "center" }}>
              There are no items in the cart.
            </td>
          </tr>
        ) : (
          items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => handleQuantityChange(item.id, event)}
                />
              </td>
              <td>{item.unitCost}</td>
              <td>
              <input
                type="number"
                className="form-control"
                min="0"
                max="100"
                value={item.discount}
                onChange={(event) => handleDiscountChange(item.id, event)}
              />
              </td>
              <td>{item.quantity}</td>
              <td>{item.totalCost}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHandler(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
      {items.length > 0 && (
        <tfoot>
          <tr>
            <td colSpan="6" style={{ textAlign: "right" }}>
              Grand Total: UGX
            </td>
            <td>{calculateTotal()}</td>
            <td></td>
          </tr>
        </tfoot>
      )}
    </table>
  </>         
    )
}

export default Cart