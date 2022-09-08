// Styles
import "./AmountForm.css";

// Assets
import Convert from "../../assets/Convert.png";

// Hooks
import { useRef } from "react";

// Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Store
import { currencyActions } from "../../store/index";

const AmountForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const rates = useSelector((state) => state.rates);
  const fromCurrency = useSelector((state) => state.fromCurrency);
  const toCurrency = useSelector((state) => state.toCurrency);

  const fromCurrencyRate = useSelector((state) => state.fromCurrencyRate);
  const toCurrencyRate = useSelector((state) => state.toCurrencyRate);

  const amount = useSelector((state) => state.amount);
  const totalAmounts = useSelector((state) => state.totalAmounts);

  const submitFormHandler = (e) => {
    e.preventDefault();

    dispatch(currencyActions.setAmount(+inputRef.current.value));

    const [fromCurrencyRateObj] = rates.filter(
      (rate) => Object.keys(rate)[0] === fromCurrency
    );

    const [toCurrencyRateObj] = rates.filter(
      (rate) => Object.keys(rate)[0] === toCurrency
    );

    dispatch(
      currencyActions.setCurrencyList(
        rates.filter((rate) => {
          return (
            Object.keys(rate)[0] !== fromCurrency &&
            Object.keys(rate)[0] !== toCurrency
          );
        })
      )
    );

    console.log(totalAmounts);

    const fromValue = amount;
    const toValue = (amount * (toCurrencyRate / fromCurrencyRate)).toFixed(2);

    dispatch(currencyActions.setToCurrencyRate(toCurrencyRateObj[toCurrency]));
    dispatch(
      currencyActions.setFromCurrencyRate(fromCurrencyRateObj[fromCurrency])
    );

    dispatch(
      currencyActions.setTotalAmounts({
        [fromCurrency]: amount,
        [toCurrency]: (amount * (toCurrencyRate / fromCurrencyRate)).toFixed(2),
      })
    );
  };

  return (
    <div className="amount-form">
      <form onSubmit={submitFormHandler}>
        <label htmlFor="amount">Amount</label>
        <div className="change-amount">
          <input ref={inputRef} type="number" id="amount" name="amount" />
          <button className="change">
            <img src={Convert} alt="" />
          </button>
        </div>
      </form>
      <p>
        {amount && (amount * (toCurrencyRate / fromCurrencyRate)).toFixed(2)}{" "}
        {toCurrency}
      </p>
    </div>
  );
};

export default AmountForm;
