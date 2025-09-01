import React, { useState } from 'react';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    desiredPrice: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      alert('Product added!');
      console.log(data);
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Product</h2>
      <input name="name" placeholder="Product Name" onChange={handleChange} required />
      <input name="url" placeholder="Product URL" onChange={handleChange} required />
      <input name="desiredPrice" type="number" placeholder="Desired Price" onChange={handleChange} required />
      <button type="submit">Track Price</button>
    </form>
  );
};

export default ProductForm;
