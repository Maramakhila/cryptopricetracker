import React from "react";
import { useSelector } from "react-redux";
import { formatNumber } from "../utils";
import { Sparklines, SparklinesLine } from "react-sparklines";
import "./CryptoTable.css";

const CryptoTable = () => {
  const { cryptoData, status, error } = useSelector((state) => state.crypto);

  if (status === "loading") return <div className="text-center p-4">Loading...</div>;
  if (status === "failed") return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  if (!cryptoData?.length) return <div className="text-center p-4">No data available</div>;

  return (
    <div className="table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th className="rank">#</th>
            <th className="name">Name</th>
            <th className="price">Price</th>
            <th className="change">1h %</th>
            <th className="change">24h %</th>
            <th className="change">7d %</th>
            <th className="market-cap">Market Cap</th>
            <th className="volume">Volume (24h)</th>
            <th className="supply">Circulating Supply</th>
            <th className="chart">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((coin, index) => (
            <tr key={coin.id}>
              <td className="rank">{index + 1}</td>
              <td className="name">
                <div className="coin-info">
                  <img src={coin.image} alt={coin.name} className="coin-logo" />
                  <span className="coin-name">{coin.name} ({coin.symbol.toUpperCase()})</span>
                </div>
              </td>
              <td className="price">${coin.current_price.toLocaleString()}</td>
              <td className={`change ${coin.price_change_percentage_1h_in_currency >= 0 ? 'positive' : 'negative'}`}>
                {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
              </td>
              <td className={`change ${coin.price_change_percentage_24h_in_currency >= 0 ? 'positive' : 'negative'}`}>
                {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
              </td>
              <td className={`change ${coin.price_change_percentage_7d_in_currency >= 0 ? 'positive' : 'negative'}`}>
                {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
              </td>
              <td className="market-cap">${formatNumber(coin.market_cap)}</td>
              <td className="volume">${formatNumber(coin.total_volume)}</td>
              <td className="supply">
                {formatNumber(coin.circulating_supply)} {coin.symbol.toUpperCase()}
                {coin.id === 'bitcoin' && <div className="supply-line">...... {formatNumber(coin.total_supply)} {coin.symbol.toUpperCase()}</div>}
              </td>
              <td className="chart">
                {coin.sparkline_in_7d?.price ? (
                  <Sparklines data={coin.sparkline_in_7d.price} width={120} height={40}>
                    <SparklinesLine 
                      style={{ strokeWidth: 2 }} 
                      color={coin.price_change_percentage_7d_in_currency >= 0 ? '#16c784' : '#ea3943'} 
                    />
                  </Sparklines>
                ) : (
                  <div className="chart-placeholder">......</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;