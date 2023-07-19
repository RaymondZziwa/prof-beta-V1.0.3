import React from 'react';
import { useEffect } from 'react';

const OrderSummaryTable = ({ materials, orderQuantity }) => {

  useEffect(()=>{
    console.log('materials', materials)
    console.log('orderQuantity', orderQuantity)
  })
  const totals = materials.map(material => {
    const totalQuantity = material.itemQuantity * orderQuantity;
    const totalCost = totalQuantity * material.unitPrice;
    return { ...material, totalQuantity, totalCost };
  });

  const grandTotal = totals.reduce((acc, material) => acc + material.totalCost, 0);

  return (
    <table className="table table-light">
      <thead>
        <tr>
          <th>Material</th>
          <th>Quantity per Unit</th>
          <th>Unit Cost (UGX)</th>
          <th>Total Quantity</th>
          <th>Total Cost (UGX)</th>
        </tr>
      </thead>
      <tbody>
        {totals.map(material => (
          <tr key={material.itemName}>
            <td>{material.itemName}</td>
            <td>{material.itemQuantity}</td>
            <td>{material.unitPrice}</td>
            <td>{Math.ceil(material.totalQuantity)}</td>
            <td>{Math.floor(material.totalCost)}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="4" className="text-end fw-bold">Grand Total:</td>
          <td>{grandTotal}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderSummaryTable;
