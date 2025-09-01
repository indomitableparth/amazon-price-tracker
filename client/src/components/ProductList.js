import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h2>📦 Tracked Products</h2>
      {products.length === 0 ? (
        <p>No products being tracked yet.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                View Product
              </a>
              <p>Desired Price: ₹{product.desiredPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
