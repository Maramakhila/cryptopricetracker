import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCryptoData, simulatePriceChanges } from "./features/crypto/cryptoSlice";
import CryptoTable from "./components/CryptoTable";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCryptoData());
      
      // Start price simulation after initial load
      const simulationInterval = setInterval(() => {
        dispatch(simulatePriceChanges());
      }, 2000);

      return () => clearInterval(simulationInterval);
    };

    fetchData();
    
    // Refresh actual data every 60 seconds
    const refreshInterval = setInterval(fetchData, 60000);
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, [dispatch]);

  return (
    <div className="app-container">
      <h1 className="app-title">Crypto Tracker</h1>
      <CryptoTable />
    </div>
  );
}

export default App;