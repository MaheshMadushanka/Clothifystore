import React, { useState } from 'react';
import "./addProduct.css"

const AddProduct = () => {


  const [load, setload] = useState(false)
  const [product, setProduct] = useState({
    product_name: '',
    categoryID: 1,
    productImageURL: '',
    productPrice: '',
    productQty: '',
    product_description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return
      setload(true)
      const data = new FormData();
      data.append("file", file)
      data.append("upload_preset", "Clothifystore")
      data.append("cloud_name", "dvqjf3iyq")//4BLC265SozOmiYhWn3h3avbLJ88  196452594447521

      const res = await fetch("https://api.cloudinary.com/v1_1/dvqjf3iyq/image/upload", {
        method: "POST",
        body: data
      });

      const ImageUrl = await res.json();
      setload(false)
      console.log(ImageUrl)

      setProduct({ ...product, productImageURL: ImageUrl.secure_url });

    }

    catch (error) {
      console.log("Error uploading image:", error);
    }

  };

  const handleCategoryChange = (e) => {
    setProduct({ ...product, categoryID: parseInt(e.target.value) });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/product/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Keep as JSON, not FormData
        },
        body: JSON.stringify({
          product_name: product.product_name,
          categoryID: product.categoryID,
          productPrice: product.productPrice,
          productQty: product.productQty,
          product_description: product.product_description,
          productImageURL: product.productImageURL
        }),
      });

      if (response.ok) {
        alert("Product added successfully");
        setProduct({
          product_name: '',
          categoryID: 1,
          productImageURL: '',
          productPrice: '',
          productQty: '',
          product_description: ''
        });
      } else {
        console.error('Failed to add product:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Product Name:
            <input
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Product Category:</label>
          <div style={{ marginTop: '5px' }}>
            <label style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="categoryID"
                value={1}
                checked={product.categoryID === 1}
                onChange={handleCategoryChange}
              />
              Kid
            </label>
            <label style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="categoryID"
                value={2}
                checked={product.categoryID === 2}
                onChange={handleCategoryChange}
              />
              Women
            </label>
            <label>
              <input
                type="radio"
                name="categoryID"
                value={3}
                checked={product.categoryID === 3}
                onChange={handleCategoryChange}
              />
              Men
            </label>
          </div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Product Image:
            <input
              type="file"
              name="productImageURL"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'block', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Price:
            <input
              type="number"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Quantity:
            <input
              type="number"
              name="productQty"
              value={product.productQty}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Description:
            <textarea
              name="product_description"
              value={product.product_description}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            ></textarea>
          </label>
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {load ? "Photo is Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
