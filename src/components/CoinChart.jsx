import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_COIN_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);
const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `${API_URL}${coinId}/market_chart?vs_currency=usd&days=7`
        );
        if (!res.ok) throw new Error("Failed to fetch the data");
        const data = await res.json();
        console.log(data);
        setChartData(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, [coinId]);
  return <div>Hello coin chart</div>;
};

export default CoinChart;
