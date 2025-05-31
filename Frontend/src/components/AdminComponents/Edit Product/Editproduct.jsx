import React, { useState, useEffect } from 'react';
import "./Editprodcut.css"
import { useParams } from 'react-router-dom';

export default function EditProduct() {
    const [message, setMessage] = useState("");
    const {id}=useParams(); 
    const token=localStorage.getItem("authToken")

    // State for product data
    const [product, setProduct] = useState({
        productID: '',
        product_name: '',
        categoryID: '',
        productImageURL: '',
        productPrice: '',
        productQty: '',
        product_description: ''
    });

    const defaultProduct = {
        productID: '',
        product_name: '',
        categoryID: '',
        productImageURL: '',
        productPrice: '',
        productQty: '',
        product_description: ''
      };

    // State for form submission status
    const [isSubmitting, setIsSubmitting] = useState(false);


    // Mock function to fetch product data
    useEffect(() => {
        if (id != null) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`http://localhost:8081/product/get-product-byID/${id}`,
                        {
                            method:"GET",
                            headers:{
                                "Authorization":`Bearer ${token}`
                            },
                            
                        }
                    );
                    const data = await response.json();
                    if(Array.isArray(data) && data.length > 0){
                        const productObj = data[0];
                        setProduct({
                          ...defaultProduct,
                          ...productObj
                        });
                      } else {
                        console.warn("Unexpected product data:", data);
                      }
                    }
                   catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
            fetchProduct();
        }

    }, [id]);

    const updateProduct = async () => {
        try {
            const respond = await fetch("http://localhost:8081/product/update-product", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(product)
            });
    
            if (respond.ok) {
                alert("Updated Successfully!");
            } else {
                const errorData = await respond.json();
                console.error("Update failed:", errorData);
                alert("Failed to update product.");
            }
        } catch (error) {
            console.error("Error during update:", error);
            alert("An error occurred while updating the product.");
        }
    };
    
    const deleteProduct=async()=>{
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const deleteRespond = await fetch(`http://localhost:8081/product/delete-product-byID/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await deleteRespond.json();
                if (data) {
                    setMessage("Product deleted successfully!");
                    // Optionally navigate to another page here
                }
            } catch (error) {
                setMessage("An error occurred while deleting the product.");
            }
        }
    }

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    // Handle image URL change
    const handleImageChange = (e) => {
        const value = e.target.value;
        setProduct({
            ...product,
            productImageURL: value
        });
    };

    // Handle form submission for update
    const handleUpdate = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        // In a real application, you would send the data to an API
        // For example: updateProduct(product).then(response => { ... });

        // Mock API call
        setTimeout(() => {
            setIsSubmitting(false);
            setMessage('Product updated successfully!');
        }, 1000);
    };

    // Handle delete action
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            // In a real application, you would send a delete request to an API
            // For example: deleteProduct(product.productID).then(response => { ... });

            // Mock API call
            setTimeout(() => {
                setMessage('Product deleted successfully!');
            }, 1000);
        }
    };

    // Handle back button
    const handleBack = () => {
        // In a real application, you would navigate back
        // For example, using React Router: history.push('/products');
        alert('Navigating back to products page');
    };
    const handleCategoryChange = (e) => {
        setProduct({ ...product, categoryID: parseInt(e.target.value) });
    };
    return (
        <div className="container mt-4">
            <div className="row mb-3">
                <div className="col">
                    <h2>Edit Product</h2>
                </div>
            </div>

            {message && (
                <div className="row mb-3">
                    <div className="col">
                        <div className="alert alert-success">{message}</div>
                    </div>
                </div>
            )}

            <form onSubmit={handleUpdate}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="productID" className="form-label">Product ID</label>
                            <input
                                type="number"
                                className="form-control"
                                id="productID"
                                name="productID"
                                value={product.productID}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="product_name" className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="product_name"
                                name="product_name"
                                value={product.product_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label>Product Category:</label>
                            <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

                        <div className="mb-3">
                            <label htmlFor="productPrice" className="form-label">Price</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productPrice"
                                name="productPrice"
                                value={product.productPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="productQty" className="form-label">Quantity</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productQty"
                                name="productQty"
                                value={product.productQty}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="productImageURL" className="form-label">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productImageURL"
                                name="productImageURL"
                                value={product.productImageURL}
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="product_description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="product_description"
                                name="product_description"
                                rows="4"
                                value={product.product_description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {product.productImageURL && (
                            <div className="mb-3">
                                <p>Image Preview:</p>
                                <img
                                    src={product.productImageURL}
                                    alt="Product"
                                    className="img-thumbnail"
                                    style={{ maxHeight: '200px' }}
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/200?text=Image+Not+Found'}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                                onClick={updateProduct}
                            >
                                {isSubmitting ? 'Updating...' : 'Update Product'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={deleteProduct}
                            >
                                Delete Product
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleBack}
                            >
                                Back to Products
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}