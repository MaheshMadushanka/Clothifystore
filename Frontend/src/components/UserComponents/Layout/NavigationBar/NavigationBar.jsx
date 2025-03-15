import { useState, useEffect } from "react";
import "./NavigationBar.css";
import logo from "../../../../../public/image/colthifyLogo.png";
import propic from "../../../../../public/image/profile.png";
import { Link } from "react-router-dom";
import ProductDisplay from "../../ProductCard/ProductDisplay";

function NavigationBar() {

  const [show,setshow]=useState(false);
  const [showCart,setshowCart]=useState(false);
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [category, setCategory] = useState("Kid");
  const [products, setProducts] = useState([{
    productID : '',
    product_name : "",
    productImageURL: "",
    productPrice: "",
    product_description: ""
  }]);
  useEffect(() => {
    const updateCart = () => {
      setCart(JSON.parse(localStorage.getItem("product")) || []);
    };
  
    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCart);
  
    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);
  
  const categoryMapping = {
    Men: 3,
    Women: 2,
    Kid: 1,
  };
  useEffect(() => {

    if (category) {
      fetchProductsByCategory(categoryMapping[category] || null);
    }
  }, [category]);

function ClearCart(){
  localStorage.removeItem("product")
  location.reload()

}
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("product")) || []; // Parse and default to an empty array if not found
    setCart(storedCart);
  }, []);

  const fetchProductsByCategory = async (category) => {
    try {
     

      const response = await fetch(
        `http://localhost:8081/product/get-all-product/${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();
      console.log("CAME2      ",products)
      setProducts(Array.isArray(products) ? products : []);
      setshow(true)
      
      
    } catch (error) {
      console.error("Product Fetch Error:", error.message);
    }
  };

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/product/search?query=${query}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      console.log("Search Results:", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Search Error:", error.message);
    }
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const changeCategory = (categoryValue) => {
    setCategory(categoryValue);
    fetchProductsByCategory(categoryValue);
    console.log("Selected Category:", categoryValue);
  };

  useEffect(() => {
    // setUser({
    //   name: "John Doe",
    //   profilePicture: "path-to-profile-picture.jpg",
    // });
  }, []);

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
        <img src={logo} alt="Logo" width="100" height="100" />
      </a>

      <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" id="category">
        {["Men", "Women", "Kid"].map((cat, index) => {
          const categoryValue = 3 - index;
          return (
            <li key={cat}>
              <nav
                href="#"
                className={`nav-link px-2 ${category === categoryValue ? "link-secondary" : "link-body-emphasis"}`}
                onClick={() => changeCategory(categoryValue)}
              >
                <Link to={`/displayProduct/${cat}`}>{cat}</Link>
              </nav>
            </li>
          );
        })}
      </ul>

      <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
        <input
          type="search"
          className="form-control"
          placeholder="Search..."
          aria-label="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>

      {searchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {searchResults.map((result, index) => (
              <li key={result.id || index}>{result.product_name}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="cart-container">
        <button className="cart-button" onClick={() => setshowCart(!showCart)}>
          🛒 Cart ({cart.length}) 
        </button>
        {showCart && (
          <div className="cart-dropdown">
            {cart.length > 0 ? (
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>{item.product_name} - ${item.productPrice}</li>
                  
                ))}
                <button onClick={ClearCart}>Clear Cart</button>
              </ul>
            ) : (
              <p>Cart is empty</p>
            )}
          </div>
        )}
      </div>

      <div className="dropdown text-end">
        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={user?.profilePicture || propic} width="32" height="32" className="rounded-circle" />
        </a>
        <ul className="dropdown-menu text-small">
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
      {show ? (<ProductDisplay products={products} />) : (<p></p>)}
      
    </div>
  );
}

export default NavigationBar;
