import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [keyword, setKeyword] = useState(null);
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate("/");
        }
    };
    return (
        <form className="d-flex m-auto" onSubmit={searchHandler}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="search any product..."
                aria-label="Search"
                onChange={(e) => {
                    setKeyword(e.target.value);
                }}
            />
            <button className="btn btn-outline-success" type="submit">
                <i class="bi bi-search"></i>
            </button>
        </form>
    );
};

export default Search;

// <form onSubmit={searchHandler}>
//                 <div className="search-bar">
//                     <input
//                         type="text"
//                         placeholder="search product"
//                         onChange={(e) => {
//                             setKeyword(e.target.value);
//                         }}
//                     />
//                     <button>
//                         <AiOutlineSearch />
//                     </button>
//                 </div>
//             </form>
