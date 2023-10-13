import { useState } from "react";
import './App.css'

function App() {
  const [coins, setCoins] = useState([]);
  const [coinsText, setCoinsText] = useState("");
  const [amount, setAmount] = useState("");
  const [coinChange, setCoinChange] = useState([]);
  const [totalCoins, setTotalCoins] = useState(0)

  const handleCoinsChange = (value) => {
    const normalizedValue = value.replace(/[^0-9,]/g, '').split(",").map((el) => +el.trim());
    const set = new Set(normalizedValue)
    setCoins(Array.from(set));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    fetch("http://localhost:3000/coinchange", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Allow-Access-Control-Origin": "*"
      },
      body: JSON.stringify({ coins, amount }),
    })
      .then((response) => { if(response.ok) return response.json() })
      .then((data) => {
        const entries = Object.entries(data.coinsUsed)
        setTotalCoins(data.result)
        setCoinChange(entries)
      });
  };

  return (
    <main>
      <h1>Coin Change</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Ingresa el monto
          <input
            type="number"
            onChange={(ev) => setAmount(+ev.target.value)}
            value={amount}
            placeholder="0"
            required
          />
        </label>

        <label>
          Ingresa las monedas disponibles separadas por comas
          <input
            type="text"
            placeholder="1, 2, 3"
            onChange={(ev) => {
              handleCoinsChange(ev.target.value);
              setCoinsText(ev.target.value);
            }}
            value={coinsText}
            required
          />
        </label>

        <button type="submit">
          Pedir cambio
        </button>
      </form>
      {
        totalCoins === -1 &&
        <b>
          No se puede dar cambio con las monedas disponibles
        </b>
      }
      {
        coinChange.length > 0 &&
        <div className="result">
          <h2>Se necesitan:</h2>
          <ul>
            {coinChange.map(([coin, quantity], index) => (
              <li key={index}>
                * {quantity} monedas de ${coin}
              </li>
            ))}
          </ul>
          <p className="result-text">Para un total de {totalCoins} moneda{totalCoins > 1 && 's'}</p>
        </div>
      }
    </main>
  );
}

export default App;
