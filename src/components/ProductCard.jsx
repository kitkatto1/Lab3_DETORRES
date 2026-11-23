function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children,
}) {
  const formattedPrice = price.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  return (
    <div className={`product-card ${inStock ? "" : "out-of-stock"}`}>
      {children && <div className="card-badge-slot">{children}</div>}

      <span className="card-category">{category}</span>
      <h3 className="card-title">{title}</h3>
      <p className="card-price">{formattedPrice}</p>

      <div className="card-footer">
        <span className={`stock-label ${inStock ? "in" : "out"}`}>
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
        <button
          type="button"
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