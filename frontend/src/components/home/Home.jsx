import React, { Fragment, useEffect } from "react";
import Products from "./Products.jsx";
import MetaData from "../../layout/MetaData.jsx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions.js";

const Home = () => {
  const dispatch = useDispatch();
  // const { error } = useSelector((state) => state.products);

  useEffect(() => {
    // if (error) {
    //   return toast.error(error);
    // }
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title={"Buy Best Products"} />
      <div className="home">
        <h1
          style={{
            borderBottom: "2px solid green",
            display: "inline-block",
            margin: "30px",
          }}
        >
          Latest Product{" "}
        </h1>
        <Products />
      </div>
    </Fragment>
  );
};

export default Home;
