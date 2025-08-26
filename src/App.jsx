import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";
import SortBySelector from "./components/SortBySelector";
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  const onLimitChange = (e) => {
    setLimit(Number(e.target.value));
  };

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const onSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter) ||
        coin.symbol.toLowerCase().includes(filter)
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;

        default:
          break;
      }
    });

  return (
    <div>
      <h1>🚀 Crypto Dash </h1>

      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={onFilterChange} />
        <LimitSelector limit={limit} onLimitChange={onLimitChange} />
        <SortBySelector sortBy={sortBy} onSortByChange={onSortByChange} />
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length == 0 ? (
            <p>No matching coins</p>
          ) : (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          )}
        </main>
      )}
    </div>
  );
};

export default App;
