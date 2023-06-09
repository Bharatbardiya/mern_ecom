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
import Notfound from "./layout/Notfound";
import "./styles/app.scss";
import { loadUser } from "./actions/userActions";
import store from "./store";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    });

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search/:keyword" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Notfound />} />
                </Routes>
                <Footer />
            </div>
            <Toaster />
        </Router>
    );
}

export default App;
