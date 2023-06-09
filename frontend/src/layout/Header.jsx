import React, { Fragment } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { logout } from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch();

    const { user, loading, error } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
        if (error) {
            toast.error(error);
        } else {
            toast.success("Logout Sccessfully");
        }
    };
    return (
        <Fragment>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container-fluid">
                    <a
                        className="navbar-brand"
                        href="#"
                        style={{ fontSize: "1.8rem", fontWeight: "bold" }}
                    >
                        ShopNow
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <Search />
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <span className="h5">Cart</span>
                                    <i className="h5 ms-1 bi bi-cart-check"></i>
                                </Link>
                            </li>
                            {user ? (
                                <li className="nav-item dropdown ms-2">
                                    <Link
                                        className="nav-link dropdown-toggle border rounded"
                                        to="/me"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            style={{
                                                height: "30px",
                                                marginRight: "3px",
                                                borderRadius: "50%",
                                            }}
                                            src={user?.avatar?.url}
                                            alt={user?.name}
                                        />
                                        <span>{user?.name}</span>
                                    </Link>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <li>
                                            {user && user.role !== "admin" ? (
                                                <Link
                                                    to="/orders/me"
                                                    className="dropdown-item"
                                                    href="#"
                                                >
                                                    My Order
                                                </Link>
                                            ) : (
                                                <Link
                                                    to="/dashboard"
                                                    className="dropdown-item"
                                                    href="#"
                                                >
                                                    Dashboard
                                                </Link>
                                            )}
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/me"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item text-danger"
                                                to="/"
                                                onClick={logoutHandler}
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                !loading && (
                                    <li className="nav-item custom-login-btn">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
};

export default Header;
