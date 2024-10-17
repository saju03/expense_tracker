/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { finalFilter, getTotal } from "../utils/Helper/helper";

const useFilteredResults = () => {
  const results = useSelector((store) => store.expense);
  const [filteredResults, setFilteredResults] = useState(results);
  const [filterValues,setFilterValues] = useState({
    dateRange:[],
    spentType:[],
    category:[]
  })
  const [values,setValues] = useState({
    totalExpense:0,
    totalIncome:0,
    balance:0
  })


  useEffect(()=>{
    const filteredRes =  results.filter((item )=>{
    return  finalFilter(filterValues,item)
    })
    setFilteredResults(()=>filteredRes)
  },[filterValues])


  useEffect(() => {
    setFilteredResults(results);
    const totalIncome = getTotal('spentType','income',results)
    const totalExpense = getTotal('spentType','expense',results)
    setValues({...values,totalIncome:totalIncome,totalExpense:totalExpense,balance:totalIncome-totalExpense})
  }, [results]);

  return {filteredResults,filterValues,setFilterValues,values,results}; 
};

export default useFilteredResults;
