import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFoundPage from "./pages/notFound";
import CoinDetailsPage from "./pages/coinDetails";
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

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              error={error}
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              limit={limit}
              setLimit={setLimit}
              loading={loading}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="coin-details/:id" element={<CoinDetailsPage />} />
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
