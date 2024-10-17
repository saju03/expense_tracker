import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useFilteredResults: React.FC = () => {
  const results = useSelector((store) => store.expense);
  const [filteredResults, setFilteredResults] = useState(results);

  useEffect(() => {
    // todo set the filter state to reset when result changes
    
    setFilteredResults(results);
  }, [results]);

  return filteredResults; 
};

export default useFilteredResults;
