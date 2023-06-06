import React, { Fragment, useEffect } from "react";

import Loader from "../../layout/loader";
import MetaData from "../../layout/MetaData";

import toast from "react-hot-toast";
import ReactStars from "react-stars";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log(id);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  // console.log(loading, error, product);
  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // console.log("loading ", loading);
    // console.log("product", product);
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product?.name} />
          <div className="product-details">
            <div className="images">
              <img src={product?.images[0]?.url} alt="product-image" />
            </div>
            <div className="details">
              <h1 className="title">{product?.name}</h1>
              <hr />
              <div className="rating">
                <ReactStars
                  count={5}
                  value={product?.ratings}
                  size={30}
                  color2={"#ffd700"}
                  edit={false}
                  half={true}
                />
                <span id="no_of_reviews">({product?.numOfReviews})</span>
              </div>
              <hr />
              <div className="price-buttons">
                <div className="price">{product?.price}</div>
                <div className="buttons">
                  <div>
                    <button className="neg">-</button>
                    <span>{product?.stock}</span>
                    <button className="pos">+</button>
                  </div>
                  <div>
                    <button className="cart-btn">Add to Cart</button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="status">
                Status : {product?.stock > 0 ? "In Stock" : "out of Stock"}
              </div>
              <div className="discription">
                <h1>Discription</h1>
                <p>{product?.description}</p>
              </div>
              <div className="review">
                <button>Submit Your Review</button>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default ProductDetails;
