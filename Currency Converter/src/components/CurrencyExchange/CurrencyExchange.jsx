// Stlyes
import "./CurrencyExchange.css";

// Assets
import Change from "../../assets/Change.png";

import { useSelector, useDispatch } from "react-redux";
import { currencyActions } from "../../store/index";

const CurrencyExchange = () => {
  const dispatch = useDispatch();

  const currencies = useSelector((state) => state.currencies);
  const fromCurrency = useSelector((state) => state.fromCurrency);
  const toCurrency = useSelector((state) => state.toCurrency);
  const amount = useSelector((state) => state.amount);

  const fromCurrencyChangeHandler = (e) => {
    dispatch(currencyActions.fromCurrencyChangeHandler(e.target.value));
  };

  const toCurrencyChangeHandler = (e) => {
    dispatch(currencyActions.toCurrencyChangeHandler(e.target.value));
  };

  const changeCurrencyHandler = (e) => {
    e.preventDefault();

    dispatch(currencyActions.fromCurrencyChangeHandler(toCurrency));
    dispatch(currencyActions.toCurrencyChangeHandler(fromCurrency));
  };

  return (
    <div className="currency-exchange">
      <form onSubmit={changeCurrencyHandler}>
        <select value={fromCurrency} onChange={fromCurrencyChangeHandler}>
          {currencies.map((cur, index) => (
            <option key={index} value={cur}>
              {cur}
            </option>
          ))}
        </select>
        <div className="vector">
          <button type="submit">
            <img src={Change} alt="" />
          </button>
        </div>
        <select value={toCurrency} onChange={toCurrencyChangeHandler}>
          {currencies.map((cur, index) => (
            <option key={index} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default CurrencyExchange;
