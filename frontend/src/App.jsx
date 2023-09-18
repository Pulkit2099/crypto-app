import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css";

function App() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    axios.get('https://crypto-backend-1zu9.onrender.com/api/crypto')
      .then(response => {
        setCryptoData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Crypto Info</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Volume</th>
            <th>Base Unit</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.last}</td>
              <td>{item.buy}</td>
              <td>{item.sell}</td>
              <td>{item.volume}</td>
              <td>{item.base_unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
