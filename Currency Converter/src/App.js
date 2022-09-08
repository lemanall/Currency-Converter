// Hooks
import { useEffect } from "react";

// Components
import AmountForm from "./components/AmountForm/AmountForm.jsx";
import CurrencyExchange from "./components/CurrencyExchange/CurrencyExchange.jsx";
import CurrencyOutputList from "./components/CurrencyOutputList/CurrencyOutputList.jsx";

// Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Store
import { currencyActions } from "./store/index.js";

// Api URL
const BASE_URL =
  "https://api.exchangerate.host/latest?apikey=VCQelc8mc0Lokcn3szjDCvtRD8uyBQRK";

function App() {
  const dispatch = useDispatch();

  const currencies = useSelector((state) => state.currencies);
  const rates = useSelector((state) => state.rates);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(BASE_URL);

      const data = await response.json();

      const rates = data.rates;
      let ratesArr = [];

      for (let item in rates) {
        ratesArr.push({ [item]: rates[item] });
      }

      const updatedRatesArr = ratesArr.filter((rate) => {
        return currencies.includes(Object.keys(rate)[0]);
      });

      dispatch(currencyActions.setRates(updatedRatesArr));
    };

    fetchData();
  }, [currencies, dispatch]);

  return (
    <div className="container">
      <CurrencyExchange />
      <AmountForm />
      <CurrencyOutputList />
    </div>
  );
}

export default App;
