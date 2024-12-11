import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch data from CoinGecko API
  const fetchCryptoData = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'inr',
          order: 'market_cap_desc',
          per_page: 20,  // Adjust the number of coins per page
          page: page     // The current page
        },
      });

      setCryptoData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, [page]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Cryptocurrency Prices (INR)</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Coin</th>
            <th scope="col">Current Price (INR)</th>
            <th scope="col">Market Cap (INR)</th>
            <th scope="col">24h Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((coin, index) => (
            <tr key={coin.id}>
              <th scope="row">{(page - 1) * 20 + index + 1}</th>
              <td>
                <img src={coin.image} alt={coin.name} width="25" className="mr-2" />
                {coin.name}
              </td>
              <td>{coin.current_price.toLocaleString()}</td>
              <td>{coin.market_cap.toLocaleString()}</td>
              <td className={coin.price_change_percentage_24h < 0 ? 'text-danger' : 'text-success'}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptoTable;
