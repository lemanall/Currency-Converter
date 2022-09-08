import { configureStore, createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    amount: "",
    currencies: ["AZN", "EUR", "USD", "TRY", "RUB", "GEL"],
    totalAmounts: {
      AZN: "",
      EUR: "",
      USD: "",
      TRY: "",
      RUB: "",
      GEL: "",
    },

    fromCurrency: "AZN",
    fromCurrencyRate: "",

    toCurrency: "EUR",
    toCurrencyRate: "",

    rates: [],
    currencyList: [],
  },
  reducers: {
    fromCurrencyChangeHandler: (state, action) => {
      state.fromCurrency = action.payload;
    },

    toCurrencyChangeHandler: (state, action) => {
      state.toCurrency = action.payload;
    },

    setAmount: (state, action) => {
      state.amount = action.payload;
    },

    setRates: (state, action) => {
      state.rates = action.payload;
    },

    setToCurrencyRate: (state, action) => {
      state.toCurrencyRate = action.payload;
    },

    setFromCurrencyRate: (state, action) => {
      state.fromCurrencyRate = action.payload;
    },

    setTotalAmounts: (state, action) => {
      state.totalAmounts = { ...state.totalAmounts, ...action.payload };
    },

    setCurrencyList: (state, action) => {
      state.currencyList = action.payload;
    },
  },
});

const store = configureStore({
  reducer: currencySlice.reducer,
});

export const currencyActions = currencySlice.actions;

export default store;
