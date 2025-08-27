import { useEffect, useState } from "react";
import { useParams } from "react-router";
const API_COIN_URL = import.meta.env.VITE_COIN_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const res = await fetch(`${API_COIN_URL}${id}`);
        if (!res.ok) throw new Error("Failed to fetch the data");
        const data = await res.json();
        console.log(data);
        setCoin(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinDetails();
  }, []);
  return <div> Coin details for {id}</div>;
};

export default CoinDetailsPage;
