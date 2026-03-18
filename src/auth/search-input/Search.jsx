import { useState } from "react";

import "./Search.css";
import search from "../../assets/search.png";

const types = ["buy", "rent"];

export default function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (value) => {
    setQuery((prev) => ({ ...prev, type: value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`${query.type === type ? "active" : ""} type-btn`}
          >
            {type}
          </button>
        ))}
      </div>
      <form className="search-form" action="/search">
        <input
          id="location"
          type="text"
          placeholder="City Location"
          name="location"
        />
        <input
          id="minPrice"
          placeholder="Min Price"
          name="minPrice"
          type="number"
          min={0}
          max={10000000}
        />
        <input
          id="maxPrice"
          type="number"
          placeholder="Max Price"
          name="minPrice"
          min={0}
          max={10000000}
        />
        <button className="search-btn">
          <img src={search} />
        </button>
      </form>
    </div>
  );
}
