import { Search } from "lucide-react";
import "./Filter.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState({
    search: searchParams.get("search") || "",
    furnishStatus: searchParams.get("furnishStatus") || "",
    status: searchParams.get("status") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "",
  });

  useEffect(() => {
    setQuery({
      search: searchParams.get("search") || "",
      furnishStatus: searchParams.get("furnishStatus") || "",
      status: searchParams.get("status") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "",
    });
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const cleanedQuery = Object.fromEntries(
      Object.entries(query).filter(([, value]) => value !== ""),
    );
    setSearchParams(cleanedQuery);
  };

  return (
    <form className="filter" onSubmit={handleFilter}>
      <h1>
        Search results for{" "}
        <b>{searchParams.get("search") || "all locations"}</b>
      </h1>

      {/* Top Search */}
      <div className="filter-top">
        <div className="filter-item full">
          <label>Search</label>
          <input
            type="text"
            name="search"
            placeholder="Search location or property..."
            value={query.search}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="filter-divider" />

      {/* Filters */}
      <div className="filter-bottom">
        <div className="filter-item">
          <label>Furniture</label>
          <select
            name="furnishStatus"
            value={query.furnishStatus}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="furnished">Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Status</label>
          <select name="status" value={query.status} onChange={handleChange}>
            <option value="">Any</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Min Price</label>
          <input
            type="number"
            name="minPrice"
            placeholder="₹0"
            value={query.minPrice}
            onChange={handleChange}
          />
        </div>

        <div className="filter-item">
          <label>Max Price</label>
          <input
            type="number"
            name="maxPrice"
            placeholder="₹10,00,000"
            value={query.maxPrice}
            onChange={handleChange}
          />
        </div>

        <div className="filter-item">
          <label>Sort By</label>
          <select name="sort" value={query.sort} onChange={handleChange}>
            <option value="">Default</option>
            <option value="lowest">Price ↑</option>
            <option value="highest">Price ↓</option>
            <option value="oldest">Oldest</option>
            <option value="latest">Newest</option>
          </select>
        </div>

        <button type="submit" className="filter-btn" aria-label="Apply filters">
          <Search size={18} />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}

export default Filter;
