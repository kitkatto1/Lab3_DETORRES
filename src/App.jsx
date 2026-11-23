import { useState } from "react";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  const handleAddToCart = (productTitle) => {
    setCartCount((prevCount) => prevCount + 1);
    setLastAdded(productTitle);
  };

  return (
    <div className="app-container">
      <header className="store-header">
        <h1>CvSU Mini Store</h1>
        <div className="cart-banner">
          {cartCount === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <p>
              Items added to cart: <strong>{cartCount}</strong> (Last added:{" "}
              <strong>{lastAdded}</strong>)
            </p>
          )}
        </div>
      </header>

      <main className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            inStock={product.inStock}
            onAddToCart={handleAddToCart}
          >
            {/* Pass children prop to at least two cards */}
            {product.id === 1 && <span className="badge">Sale</span>}
            {product.id === 2 && <span className="badge new">New</span>}
            {product.id === 5 && <span className="badge new">Bestseller</span>}
          </ProductCard>
        ))}
      </main>
    </div>
  );
}

export default App;