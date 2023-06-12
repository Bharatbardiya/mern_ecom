import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./components/home/Home";
import ProductDetails from "./components/home/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Notfound from "./layout/Notfound";
import "./styles/app.scss";
import { loadUser } from "./actions/userActions";
import store from "./store";
import Profile from "./components/user/Profile";
import ProtectedRoutes from "./components/route/ProtectedRoutes";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search/:keyword" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/password/reset/:token"
                        element={<NewPassword />}
                    />
                    <Route
                        path="/password/forgot"
                        element={<ForgotPassword />}
                    />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/me" element={<Profile />} exact />
                        <Route
                            path="/me/update"
                            element={<UpdateProfile />}
                            exact
                        />
                        <Route
                            path="/password/update"
                            element={<UpdatePassword />}
                            exact
                        />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route
                            path="/confirm/order"
                            element={<ConfirmOrder />}
                        />
                        <Route path="/payment" element={<Payment />} />
                    </Route>
                    <Route path="*" element={<Notfound />} />
                </Routes>
                <Footer />
            </div>
            <Toaster />
        </Router>
    );
}

export default App;
