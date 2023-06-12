import React, { Fragment, useEffect, useState } from "react";

import Loader from "../../layout/loader";
import MetaData from "../../layout/MetaData";

import toast from "react-hot-toast";
import ReactStars from "react-stars";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductDetails,
    clearErrors,
    newReview,
} from "../../actions/productActions";
import { useParams } from "react-router-dom";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ListReviews from "./ListReviews";

//////////////////////////////
const ProductDetails = () => {
    const [count, setCount] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, error, product } = useSelector(
        (state) => state.productDetails
    );
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { error: reviewError, success } = useSelector(
        (state) => state.newReview
    );
    useEffect(() => {
        dispatch(getProductDetails(id));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            toast.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Reivew posted successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
    }, [dispatch, error, toast, reviewError, success, id]);

    const addToCart = () => {
        dispatch(addItemToCart(id, count));
        toast.success("Item added to Cart");
    };
    const increaseQty = () => {
        if (count >= product?.stock) return;
        setCount(count + 1);
    };
    const decreaseQty = () => {
        if (count <= 1) return;
        setCount(count - 1);
    };

    const reviewHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", id);

        dispatch(newReview(formData));
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={product?.name} />
                    <section className="py-5">
                        <div className="container">
                            <div className="row gx-5">
                                <aside className="col-lg-6 mb-5">
                                    <div
                                        id="carouselExampleIndicators"
                                        className="carousel slide carousel-fade"
                                        data-bs-ride="carousel"
                                    >
                                        <div className="carousel-inner mb-5">
                                            <div className="carousel-item active">
                                                <img
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(88).webp"
                                                    className="d-block w-100"
                                                    alt="..."
                                                />
                                            </div>

                                            {product?.images.map((img, i) => (
                                                <div
                                                    key={i}
                                                    className={`carousel-item ${
                                                        i === 0 ? "active" : ""
                                                    }`}
                                                >
                                                    <img
                                                        src={img.url}
                                                        className="d-block w-100"
                                                        alt="..."
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            className="carousel-control-prev"
                                            type="button"
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide="prev"
                                        >
                                            <span
                                                className="carousel-control-prev-icon"
                                                aria-hidden="true"
                                            ></span>
                                            <span className="visually-hidden">
                                                Previous
                                            </span>
                                        </button>
                                        <button
                                            className="carousel-control-next"
                                            type="button"
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide="next"
                                        >
                                            <span
                                                className="carousel-control-next-icon"
                                                aria-hidden="true"
                                            ></span>
                                            <span className="visually-hidden">
                                                Next
                                            </span>
                                        </button>

                                        <div
                                            className="carousel-indicators"
                                            style={{ marginBottom: "-20px" }}
                                        >
                                            {product?.images.map((img, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide-to={`${i}`}
                                                    className={`${
                                                        i === 0 ? "active" : ""
                                                    }`}
                                                    aria-current={`${
                                                        i === 0
                                                            ? "true"
                                                            : "false"
                                                    }`}
                                                    aria-label={`Slide ${
                                                        i + 1
                                                    }`}
                                                    style={{ width: "100px" }}
                                                >
                                                    <img
                                                        className="d-block w-100 img-fluid"
                                                        src={img.url}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </aside>
                                <main className="col-lg-6">
                                    <div className="ps-lg-3">
                                        <h4 className="title text-dark">
                                            {product?.name}
                                        </h4>
                                        <div className="d-flex flex-row my-3 align-items-center">
                                            <div className=" text-warning mb-1 me-2">
                                                <ReactStars
                                                    count={5}
                                                    value={product?.ratings}
                                                    size={30}
                                                    color2={"#ffd700"}
                                                    edit={false}
                                                    half={true}
                                                />
                                            </div>
                                            <span className="text-muted me-3">
                                                ({product?.numOfReviews}{" "}
                                                Reviews)
                                            </span>
                                            {product?.stock > 0 ? (
                                                <span className="text-success ms-2">
                                                    In stock
                                                </span>
                                            ) : (
                                                <span className="text-danger ms-2">
                                                    Out of stock
                                                </span>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <span className="h5">
                                                ${product?.price}
                                            </span>
                                            <span className="text-muted">
                                                /per Item
                                            </span>
                                        </div>

                                        <p>{product?.description}</p>

                                        <hr />

                                        <div className="row mb-4">
                                            <div className="col-md-4 col-6 mb-3">
                                                <label className="mb-2 d-block">
                                                    Quantity
                                                </label>
                                                <div
                                                    className="input-group mb-3"
                                                    style={{ width: "170px" }}
                                                >
                                                    <button
                                                        className="btn btn-outline-danger border border-secondary px-3"
                                                        type="button"
                                                        id="button-addon1"
                                                        data-mdb-ripple-color="dark"
                                                        onClick={decreaseQty}
                                                    >
                                                        <i className="bi bi-dash"></i>
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="form-control text-center border border-secondary"
                                                        placeholder="14"
                                                        aria-label="Example text with button addon"
                                                        aria-describedby="button-addon1"
                                                        value={count}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="btn btn-outline-success border border-secondary px-3"
                                                        type="button"
                                                        id="button-addon2"
                                                        data-mdb-ripple-color="dark"
                                                        onClick={increaseQty}
                                                    >
                                                        <i className="bi bi-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            href="#!"
                                            className="btn btn-warning shadow-0"
                                            disabled={product?.stock === 0}
                                            onClick={addToCart}
                                        >
                                            Add to cart
                                        </button>

                                        <a
                                            href="#"
                                            className="btn btn-outline-warning ms-4 icon-hover"
                                        >
                                            <i className="bi bi-heart me-2 small"></i>
                                            <span>Save</span>
                                        </a>
                                        {isAuthenticated ? (
                                            <div className="row">
                                                <form
                                                    className="form mt-4 border rounded"
                                                    onSubmit={reviewHandler}
                                                >
                                                    <ReactStars
                                                        count={5}
                                                        size={30}
                                                        color2={"#ffd700"}
                                                        edit={true}
                                                        half={false}
                                                        onChange={(
                                                            newRating
                                                        ) => {
                                                            setRating(
                                                                Number(
                                                                    newRating
                                                                )
                                                            );
                                                        }}
                                                    />
                                                    <div className="mb-2">
                                                        <textarea
                                                            required
                                                            className="form-control"
                                                            style={{
                                                                boxShadow:
                                                                    "none",
                                                                border: "none",
                                                            }}
                                                            id="form4Example3"
                                                            rows="4"
                                                            placeholder="Enter your review..."
                                                            value={comment}
                                                            onChange={(e) => {
                                                                setComment(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        ></textarea>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-block mb-4"
                                                    >
                                                        Submit Your Review
                                                    </button>
                                                </form>
                                            </div>
                                        ) : (
                                            <div className="alert alert-danger py-2 my-4">
                                                Login to post review
                                            </div>
                                        )}
                                    </div>
                                </main>
                            </div>
                            {product.reviews && product.reviews.length > 0 && (
                                <ListReviews reviews={product.reviews} />
                            )}
                        </div>
                    </section>
                </>
            )}
        </Fragment>
    );
};

export default ProductDetails;

/*





*/
