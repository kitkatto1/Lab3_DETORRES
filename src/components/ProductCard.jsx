import "./ProductCard.css";

function ProductCard({ title, price, category = "General", inStock, onAddToCart, children }) {
  // Format number with commas and 2 decimal places (e.g., ₱1,299.00)
  const formattedPrice = `₱${price.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <div className={`product-card ${!inStock ? "out-of-stock" : ""}`}>
      {/* Render optional children badge if provided */}
      {children && <div className="badge-container">{children}</div>}

      <span className="product-category">{category}</span>
      <h3 className="product-title">{title}</h3>
      <p className="product-price">{formattedPrice}</p>

      <div className="product-footer">
        <span className={`stock-label ${inStock ? "in-stock-text" : "out-of-stock-text"}`}>
          {inStock ? "In Stock" : "Out of Stock"}
        </span>

        <button
          className="add-btn"
          disabled={!inStock}
          onClick={() => onAddToCart(title)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;