import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const PriceChart = ({ productId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}/history`);
        const formattedData = res.data.map((item) => ({
          date: new Date(item.date).toLocaleDateString(),
          price: item.price,
        }));
        setData(formattedData);
      } catch (err) {
        console.error("Failed to fetch price history:", err);
      }
    };

    fetchPriceHistory();
  }, [productId]);

  if (!data.length) return null;

  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis dataKey="price" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#007bff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
