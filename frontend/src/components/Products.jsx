import React from "react";
import ReactStars from "react-stars";
import { useSelector } from "react-redux";

const Products = () => {
  const { products, loading, error, productCount } = useSelector(
    (state) => state.Products
  );
  // console.log(products);
  // console.log(loading);
  // console.log(error);
  // console.log(productCount);

  return (
    <div className="products">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        products.map((product, i) => {
          return (
            <ProductCard
              key={product.id}
              imgSrc={product.images[0].url}
              title={product.name}
              rating={product.ratings}
              noOfReview={product.numOfReviews}
              price={product.price}
            />
          );
        })
      )}
      <ProductCard
        imgSrc="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
        title={"128GB Solid Storage Memory card - SanDisk Ultra"}
        rating={4.5}
        noOfReview={5}
        price={45.67}
      />
    </div>
  );
};

const ProductCard = ({ key, imgSrc, title, rating, noOfReview, price }) => {
  return (
    <div className="product-card">
      <img className="" src={imgSrc} />
      <div className="product-details">
        <h5 className="product-title">
          <a href="">{title}</a>
        </h5>
        <div className="product-rating">
          <ReactStars
            count={5}
            value={Number(rating)}
            size={30}
            color2={"#ffd700"}
            edit={false}
            half={true}
          />
          <span id="no_of_reviews">({noOfReview} Reviews)</span>
        </div>
        <p className="product-price">${price}</p>
        <a href="#" className="product-btn">
          View Details
        </a>
      </div>
    </div>
  );
};

export default Products;
