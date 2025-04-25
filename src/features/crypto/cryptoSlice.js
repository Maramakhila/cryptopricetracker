import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cryptoData: [],
  status: "idle",
  error: null,
};

export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets", 
      {
        params: {
          vs_currency: "usd",
          ids: "bitcoin,ethereum,tether,ripple,binancecoin,solana",
          order: "market_cap_desc",
          per_page: 6,
          sparkline: true,
          price_change_percentage: "1h,24h,7d",
        },
      }
    );
    return response.data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    simulatePriceChanges: (state) => {
      state.cryptoData = state.cryptoData.map(coin => ({
        ...coin,
        price_change_percentage_1h_in_currency: 
          coin.price_change_percentage_1h_in_currency + (Math.random() * 0.2 - 0.1),
        price_change_percentage_24h_in_currency: 
          coin.price_change_percentage_24h_in_currency + (Math.random() * 0.3 - 0.15),
        price_change_percentage_7d_in_currency: 
          coin.price_change_percentage_7d_in_currency + (Math.random() * 0.5 - 0.25)
      }));
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cryptoData = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { simulatePriceChanges, clearError } = cryptoSlice.actions;
export default cryptoSlice.reducer;