import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { orders, totalAmount, loading } = useSelector(
        (state) => state.allOrders
    );
    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(allOrders());
    }, [dispatch]);
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <div className="col-12 col-lg-9 col-xl-10">
                    <div class="row">
                        <div class="col-12">
                            <div class="card my-3 me-4 bg-primary-subtle">
                                <div class="card-body">
                                    <h5 class="card-title">Total Amount</h5>
                                    <p class="card-text">
                                        ${totalAmount && totalAmount.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-sm-6 col-lg-4 col-xl-3">
                                <div class="card my-2 bg-success-subtle">
                                    <div class="card-body">
                                        <h5 class="card-title">Products</h5>
                                        <p class="card-text">
                                            Total :{" "}
                                            <span className="ms-2 h6">
                                                {products && products.length}
                                            </span>
                                        </p>
                                        <Link
                                            to="/admin/products"
                                            class="btn btn-primary"
                                        >
                                            View{" "}
                                            <i class="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-4 col-xl-3">
                                <div class="card my-2 bg-warning-subtle">
                                    <div class="card-body">
                                        <h5 class="card-title">Orders</h5>
                                        <p class="card-text">
                                            Total: {orders && orders.length}
                                        </p>
                                        <Link
                                            to="/admin/orders"
                                            class="btn btn-primary"
                                        >
                                            View{" "}
                                            <i class="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-4 col-xl-3">
                                <div class="card my-2 bg-info-subtle">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            Special title treatment
                                        </h5>
                                        <p class="card-text">
                                            With supporting text below as a
                                            natural lead-in to additional
                                            content.
                                        </p>
                                        <a href="#" class="btn btn-primary">
                                            View{" "}
                                            <i class="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-4 col-xl-3">
                                <div class="card my-2 bg-danger-subtle">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            Special title treatment
                                        </h5>
                                        <p class="card-text">
                                            With supporting text below as a
                                            natural lead-in to additional
                                            content.
                                        </p>
                                        <a href="#" class="btn btn-primary">
                                            View{" "}
                                            <i class="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
