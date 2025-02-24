import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../Context/CoinContext";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Marketplace
        </h1>
        <p>
          Welcome to the Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Veritatis obcaecati exercitationem
        </p>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            placeholder={"Search Crypto..."}
            onChange={inputHandler}
            value={input}
            list="coinlist"
            required
          />
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name}/>
            ))}
          </datalist>

          <button>Search</button>
        </form>
        <div className="crypto-table">
          <div className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{ textAlign: "center" }}>24H Change</p>
            <p className="market-cap">Market Cap</p>
          </div>
          {displayCoin.slice(0, 10).map((item, index) => {
            return (
              <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                <p>{item.market_cap_rank}</p>
                <div>
                  <img src={item.image} alt="" />
                  <p>{item.name + " - " + item.symbol}</p>
                </div>
                <p>
                  {currency.symbol +
                    item.current_price.toFixed(2).toLocaleString()}
                </p>
                <p
                  className={
                    item.price_change_24h < 0 ? "negative" : "positive"
                  }
                >
                  {item.price_change_24h.toFixed(2)}
                </p>
                <p className="market-cap">
                  {currency.symbol + item.market_cap.toLocaleString()}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
