import React, { useEffect, useState } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Products</th>
            <th>Total Amount</th>
            <th>Delivery Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.user.name}</td>
              <td>
                {order.products.map(product => (
                  <div key={product.name}>{product.name} (x{product.quantity})</div>
                ))}
              </td>
              <td>{order.totalAmount}</td>
              <td>{order.deliveryAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
