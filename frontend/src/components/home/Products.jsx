import React from "react";
import ReactStars from "react-stars";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../../layout/loader";

const Products = () => {
    const { products, loading, error, productCount } = useSelector(
        (state) => state.products
    );
    // console.log(products);
    // console.log(loading);
    // console.log(error);
    // console.log(productCount);

    return (
        <div className="products">
            {loading ? (
                <Loader />
            ) : (
                products?.map((product, i) => {
                    return (
                        <ProductCard
                            id={product._id}
                            key={product._id}
                            imgSrc={product.images[0].url}
                            title={product.name}
                            rating={product.ratings}
                            noOfReview={product.numOfReviews}
                            price={product.price}
                        />
                    );
                })
            )}
        </div>
    );
};

const ProductCard = ({ id, imgSrc, title, rating, noOfReview, price }) => {
    return (
        <div className="product-card">
            <img className="" src={imgSrc} />
            <div className="product-details">
                <h5 className="product-title">
                    <Link to={`/product/${id}`}>{title}</Link>
                </h5>
                <div className="product-rating">
                    <ReactStars
                        count={5}
                        value={Number(rating)}
                        size={20}
                        color2={"#ffd700"}
                        edit={false}
                        half={true}
                    />
                    <span id="no_of_reviews">({noOfReview} Reviews)</span>
                </div>
                <p className="product-price">${price}</p>
                <Link to={`/product/${id}`} className="product-btn">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default Products;
