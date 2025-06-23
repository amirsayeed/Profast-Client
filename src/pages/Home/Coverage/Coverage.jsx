import React, { useState } from "react";
import CoverageSearch from "./CoverageSearch";
import CoverageMap from "./CoverageMap";
import { useLoaderData } from "react-router";

const CoveragePage = () => {
  const coverageData = useLoaderData();
  const [search, setSearch] = useState("");

  const filteredData = coverageData.filter((item) =>
    item.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">We are available in 64 districts</h2>
      <CoverageSearch search={search} setSearch={setSearch} />
      <CoverageMap data={filteredData} search={search} />
    </div>
  );
};

export default CoveragePage;
