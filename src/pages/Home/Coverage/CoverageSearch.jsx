import React from "react";

const CoverageSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search district (e.g., Dhaka)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full max-w-md"
      />
    </div>
  );
};

export default CoverageSearch;
