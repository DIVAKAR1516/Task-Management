import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white border-end-0">
        🔍
      </span>
      <input
        type="text"
        className="form-control border-start-0"
        placeholder="Search tasks by title or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ borderLeft: "0" }}
      />
    </div>
  );
}

export default SearchBar;