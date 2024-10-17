import  { useEffect, useState } from "react";
import { fetchExpense } from "../utils/Helper/helper"; // Adjust the import path
import { useDispatch } from "react-redux";
import { setExpenses } from "../utils/redux/expenseSlice";

 

const useFetchResults = ()  => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getExpense = async () => {
    try {
      const expenses = await fetchExpense()
      dispatch(setExpenses(expenses))
    } catch (error) {
      console.error("Error fetching expenses:", error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getExpense();
  }, []);

  return { loading }
};

export default useFetchResults;
