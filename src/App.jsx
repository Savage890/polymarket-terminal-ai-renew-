import { useEffect, useState } from "react";
import MarketCard from "./components/MarketCard";
import { motion } from "framer-motion";
import axios from "axios";

export default function App() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstVisit, setFirstVisit] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("seenSplash");
    if (!seen) {
      setFirstVisit(true);
      setTimeout(() => {
        localStorage.setItem("seenSplash", "true");
        setFirstVisit(false);
      }, 2500);
    } else {
      setFirstVisit(false);
    }
  }, []);

  async function fetchMarkets() {
    try {
      const res = await axios.get("/api/markets");
      setMarkets(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMarkets();
    const timer = setInterval(fetchMarkets, 120000);
    return () => clearInterval(timer);
  }, []);

  if (firstVisit) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0b0d17] to-[#1b1034] text-purple-300 flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="text-6xl mb-4"
        >
          🔮
        </motion.div>
        <h1 className="text-2xl font-bold">Polymarket Terminal</h1>
        <p className="text-sm mt-1">AI Predictor Initializing...</p>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0b0d17] text-purple-300">
        Loading markets...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0d17] to-[#1b1034] text-white p-5">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-400">Polymarket Terminal</h1>
        <p className="text-sm text-purple-200">AI Predictor</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((m) => (
          <MarketCard key={m.id} market={m} />
        ))}
      </div>
    </div>
  );
}
