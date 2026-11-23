import { useState, useEffect } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

// Badges passed as children (keyed by product id)
const badges = {
  1: "New",
  4: "Sale",
};

function App() {
  // ---- Lab 3 cart state ----
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // ---- Lab 4 state ----
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

    // Debounce: update debouncedSearch 300ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer); // cleanup
  }, [searchText]);

  const handleAddToCart = (title) => {
    setCartCount((prev) => prev + 1);
    setLastAdded(title);
  };

  const handleClear = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  };

  // ---- Derived list: calculated during render, not stored in state ----
  const filteredProducts = [...products] // copy, so the original is never mutated
    .filter((p) =>
      p.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
    )
    .filter((p) => category === "All" || p.category === category)
    .sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      if (sortOrder === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="app">
      <h1>CvSU Mini Store</h1>

      <p className="cart-message">
        {cartCount === 0
          ? "Your cart is empty."
          : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}
      </p>

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={handleClear}
      />

      <p className="result-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            inStock={product.inStock}
            onAddToCart={handleAddToCart}
          >
            {badges[product.id] && (
              <span className="badge">{badges[product.id]}</span>
            )}
          </ProductCard>
        ))}
      </div>
    </div>
  );
}

export default App;