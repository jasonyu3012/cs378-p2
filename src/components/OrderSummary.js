import React from 'react';

const OrderSummary = ({ menuItems, quantities, onClose }) => {
  // Calculate the total items ordered
  const totalItems = Object.values(quantities).reduce((total, quantity) => total + quantity, 0);

  return (
    <div className="order-summary-popup">
      <h2>Order Summary</h2>
      {totalItems > 0 ? (
        <ul>
          {menuItems.map(item => {
            const quantity = quantities[item.id];
            return quantity > 0 ? (
              <li key={item.id}>{item.title}: {quantity}</li>
            ) : null;
          })}
        </ul>
      ) : (
        <p>Nothing has been added to the cart.</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default OrderSummary;