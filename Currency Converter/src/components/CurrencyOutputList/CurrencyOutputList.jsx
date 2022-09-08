import { useDispatch, useSelector } from "react-redux";

import { currencyActions } from "../../store";

import "./CurrencyOutputList.css";

const CurrencyOutputList = () => {
  const currencyList = useSelector((state) => state.currencyList);
  const fromCurrencyRate = useSelector((state) => state.fromCurrencyRate);
  const totalAmounts = useSelector((state) => state.totalAmounts);

  const amount = useSelector((state) => state.amount);

  return (
    <ul className="currency__outputList">
      {currencyList.map((item, index) => {
        return (
          <li key={index}>
            <div className="list-left">
              <span className="list-icon">
                <img
                  src={require(`../../assets/${Object.keys(item)[0]}.png`)}
                  alt=""
                />
              </span>
              <span className="list-content">{Object.keys(item)[0]}</span>
            </div>
            <div className="list-right">
              <span className="list-amount">
                {((amount * Object.values(item)[0]) / fromCurrencyRate).toFixed(
                  2
                )}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CurrencyOutputList;
