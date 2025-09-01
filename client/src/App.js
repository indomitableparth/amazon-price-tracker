// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [name, setName] = useState("");
//   const [url, setUrl] = useState("");
//   const [desiredPrice, setDesiredPrice] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(""), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/products");
//       setProducts(res.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !url || !desiredPrice || !email) return;

//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/products", {
//         name,
//         url,
//         desiredPrice,
//         email,
//       });

//       setProducts([...products, res.data]);
//       setName("");
//       setUrl("");
//       setDesiredPrice("");
//       setEmail("");
//       setMessage("✅ Product is being tracked now!");
//     } catch (err) {
//       console.error("Failed to add product:", err.message);
//       setMessage("❌ Failed to track product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${id}`);
//       setProducts(products.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error("Delete error:", err.message);
//       setMessage("❌ Failed to delete product");
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     try {
//       await axios.put("http://localhost:5000/api/products/refresh");
//       await fetchProducts();
//       setMessage("🔁 Prices refreshed!");
//     } catch (err) {
//       console.error("Refresh error:", err.message);
//       setMessage("❌ Failed to refresh prices");
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">📉 AmazonPrice-Tracker</h1>

//       {message && (
//         <div
//           className={`text-center font-medium text-lg mb-6 px-4 py-3 rounded-lg ${
//             message.includes("❌")
//               ? "bg-red-100 text-red-600 border border-red-300"
//               : "bg-green-100 text-green-600 border border-green-300"
//           } animate-fade`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-3 mb-6">
//         <input
//           className="p-3 border border-gray-300 rounded-lg w-[220px]"
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           className="p-3 border border-gray-300 rounded-lg w-[220px]"
//           type="text"
//           placeholder="Product URL"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           required
//         />
//         <input
//           className="p-3 border border-gray-300 rounded-lg w-[220px]"
//           type="number"
//           placeholder="Target Price"
//           value={desiredPrice}
//           onChange={(e) => setDesiredPrice(e.target.value)}
//           required
//         />
//         <input
//           className="p-3 border border-gray-300 rounded-lg w-[220px]"
//           type="email"
//           placeholder="Your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition hover:bg-blue-700 ${
//             loading && "opacity-50 cursor-not-allowed"
//           }`}
//         >
//           {loading ? "Tracking..." : "Track Product"}
//         </button>
//       </form>

//       <div className="text-center mb-6">
//         <button
//           onClick={handleRefresh}
//           disabled={refreshing}
//           className={`bg-sky-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-600 transition ${
//             refreshing && "opacity-50 cursor-not-allowed"
//           }`}
//         >
//           {refreshing ? "Refreshing..." : "🔁 Refresh All Prices"}
//         </button>
//       </div>

//       <div className="flex flex-col gap-6">
//         {products.map((product) => (
//           <div key={product._id} className="relative bg-white p-6 rounded-2xl shadow-md">
//             <button
//               onClick={() => handleDelete(product._id)}
//               className="absolute top-4 right-4 text-red-500 text-xl hover:text-red-600"
//             >
//               &times;
//             </button>
//             <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//             <img src={product.imageUrl} alt={product.name} className="w-36 h-auto mb-4" />
//             <p className="text-gray-700 mb-1">Target Price: ₹<strong>{product.desiredPrice}</strong></p>
//             <p className="text-gray-700 mb-1">Current Price: ₹<strong>{product.currentPrice}</strong></p>
//             {product.predictedDrop && (
//             <p className="text-sm mt-2 text-amber-600 font-semibold bg-amber-100 inline-block px-3 py-1 rounded-full">
//             📉 Likely to drop soon!
//             </p>
//             )}
//             <p className="text-gray-700 mb-3">
//               Last Checked:{" "}
//               <strong>
//                 {product.lastChecked ? new Date(product.lastChecked).toLocaleString() : "N/A"}
//               </strong>
//             </p>
//             <a
//               href={product.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline font-medium"
//             >
//               View Product
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [desiredPrice, setDesiredPrice] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !url || !desiredPrice || !email) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/products", {
        name,
        url,
        desiredPrice,
        email,
      });

      setProducts([...products, res.data]);
      setName("");
      setUrl("");
      setDesiredPrice("");
      setEmail("");
      setMessage("✅ Product is being tracked now!");
    } catch (err) {
      console.error("Failed to add product:", err.message);
      setMessage("❌ Failed to track product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err.message);
      setMessage("❌ Failed to delete product");
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await axios.put("http://localhost:5000/api/products/refresh");
      await fetchProducts();
      setMessage("🔁 Prices refreshed!");
    } catch (err) {
      console.error("Refresh error:", err.message);
      setMessage("❌ Failed to refresh prices");
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">📉 AmazonPrice-Tracker</h1>

      {message && (
        <div
          className={`text-center font-medium text-lg mb-6 px-4 py-3 rounded-lg ${
            message.includes("❌")
              ? "bg-red-100 text-red-600 border border-red-300"
              : "bg-green-100 text-green-600 border border-green-300"
          } animate-fade`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-3 mb-6">
        <input
          className="p-3 border border-gray-300 rounded-lg w-[220px]"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="p-3 border border-gray-300 rounded-lg w-[220px]"
          type="text"
          placeholder="Product URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          className="p-3 border border-gray-300 rounded-lg w-[220px]"
          type="number"
          placeholder="Target Price"
          value={desiredPrice}
          onChange={(e) => setDesiredPrice(e.target.value)}
          required
        />
        <input
          className="p-3 border border-gray-300 rounded-lg w-[220px]"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition hover:bg-blue-700 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Tracking..." : "Track Product"}
        </button>
      </form>

      <div className="text-center mb-6">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={`bg-sky-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-600 transition ${
            refreshing && "opacity-50 cursor-not-allowed"
          }`}
        >
          {refreshing ? "Refreshing..." : "🔁 Refresh All Prices"}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <div key={product._id} className="relative bg-white p-6 rounded-2xl shadow-md">
            <button
              onClick={() => handleDelete(product._id)}
              className="absolute top-4 right-4 text-red-500 text-xl hover:text-red-600"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} className="w-36 h-auto mb-4" />
            <p className="text-gray-700 mb-1">Target Price: ₹<strong>{product.desiredPrice}</strong></p>
            <p className="text-gray-700 mb-1">Current Price: ₹<strong>{product.currentPrice}</strong></p>

            {/* 🧠 Prediction Message (NEW) */}
            {product.predictedDrop !== undefined && (
              <p
                className={`text-sm mt-3 px-4 py-2 rounded-full font-semibold inline-block ${
                  product.predictedDrop
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                    : 'bg-green-100 text-green-700 border border-green-300'
                }`}
              >
                {product.predictedDrop
                  ? '📉 Likely to drop — better to wait!'
                  : '✅ Price is stable — safe to buy!'}
              </p>
            )}

            <p className="text-gray-700 mb-3">
              Last Checked:{" "}
              <strong>
                {product.lastChecked ? new Date(product.lastChecked).toLocaleString() : "N/A"}
              </strong>
            </p>
            {product.saleAdvice && (
              <p className="text-blue-600 font-semibold mt-2">{product.saleAdvice}</p>
            )}
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-medium"
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
