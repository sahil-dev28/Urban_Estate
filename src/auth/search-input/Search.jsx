// import { useState } from "react";
// import "./Search.css";
// import { Search } from "lucide-react";

// const types = ["buy", "rent"];

// export default function SearchBar() {
//   const [query, setQuery] = useState({
//     type: "buy",
//     location: "",
//     minPrice: 0,
//     maxPrice: 0,
//   });

//   const switchType = (value) => {
//     setQuery((prev) => ({ ...prev, type: value }));
//   };

//   return (
//     <div className="searchBar">
//       <div className="type">
//         {types.map((type) => (
//           <button
//             key={type}
//             onClick={() => switchType(type)}
//             className={`${query.type === type ? "active" : ""} type-btn`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>
//       <form className="search-form" action="/search">
//         <input
//           id="location"
//           type="text"
//           placeholder="City Location"
//           name="location"
//         />
//         <input
//           id="minPrice"
//           placeholder="Min Price"
//           name="minPrice"
//           type="number"
//           min={0}
//           max={10000000}
//         />
//         <input
//           id="maxPrice"
//           type="number"
//           placeholder="Max Price"
//           name="maxPrice"
//           min={0}
//           max={10000000}
//         />

//         <Search />
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import { Search } from "lucide-react";

const types = ["buy", "rent"];

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    type: "buy",
    search: "",
    minPrice: "",
    maxPrice: "",
  });

  const switchType = (value) => {
    setQuery((prev) => ({ ...prev, type: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries({ search: query.search, minPrice: query.minPrice, maxPrice: query.maxPrice })
          .filter(([, v]) => v !== ""),
      ),
    ).toString();
    navigate(`/property${params ? `?${params}` : ""}`);
  };

  return (
    <div className="searchBar">
      {/* Type Switch */}
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => switchType(type)}
            className={`type-btn ${query.type === type ? "active" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Form */}
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Enter city (e.g. Mumbai)"
          value={query.search}
          onChange={handleChange}
        />

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleChange}
        />

        <button type="submit" className="search-btn">
          <Search size={18} />
        </button>
      </form>
    </div>
  );
}
