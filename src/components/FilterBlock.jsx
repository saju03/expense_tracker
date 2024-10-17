import { useState } from "react";

export default function FilterBlock({ setFilterValues, filterValues }) {
  const incomeTypes = ["Salary", "Bonus", "Investment", "Rental", "Income", "Other"];

  const expenseTypes = ["Rent", "Food", "Travel", "Cosmetics", "Bills", "Other "];
  const handleCategoryFilter = (key , value ) => {
    setFilterValues((prevFilterValues ) => {
      const currentValues = prevFilterValues[key] || [];

      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item ) => item !== value)
        : [...currentValues, value];

      return {
        ...prevFilterValues,
        [key]: updatedValues,
      };
    });
  };

  const [dateRange, setDateRange] = useState({ from: "", to: "", val: "" });

  const handleDateFilter = (days ) => {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - days);

    const newDateRange = {
      from: from.toISOString().split("T")[0],
      to: to.toISOString().split("T")[0],
      val: days,
    };

    const existingRangeIndex = filterValues.dateRange.findIndex((range ) => range.val === days);

    if (existingRangeIndex > -1) {
      const updatedDateRanges = filterValues.dateRange.filter((range ) => range.val !== days);

      setFilterValues({
        ...filterValues,
        dateRange: updatedDateRanges,
      });
    } else {
      setFilterValues({
        ...filterValues,
        dateRange: [newDateRange],
      });
    }

    setDateRange(existingRangeIndex > -1 ? { from: "", to: "" } : newDateRange);
  };

  return (
    <>
      <div className="w-full xl:w-3/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="min-h-96 py-5">
            <div className="flex justify-center ">
              <span className="font-bold text-blue-gray-700">FILTER</span>
            </div>
            <div className="flex justify-around bg-gray-100">
              <span
                className={` m-2 p-2 rounded-lg text-sm w-24 text-center ${
                  filterValues.dateRange[0]?.val == 0 ? "bg-light-blue-700  text-white" : "bg-blue-gray-200"
                } text-gray-800 cursor-pointer`}
                onClick={() => handleDateFilter(0)}
              >
                Today
              </span>
              <span
                className={` m-2 p-2 rounded-lg text-sm w-24 text-center ${
                  filterValues.dateRange[0]?.val == 7 ? "bg-light-blue-700  text-white" : "bg-blue-gray-200"
                } text-gray-800 cursor-pointer`}
                onClick={() => handleDateFilter(7)}
              >
                Last 7 Days
              </span>
              <span
                className={` m-2 p-2 rounded-lg text-sm w-24 text-center ${
                  filterValues.dateRange[0]?.val == 30 ? "bg-light-blue-700  text-white" : "bg-blue-gray-200"
                } text-gray-800 cursor-pointer`}
                onClick={() => handleDateFilter(30)}
              >
                Last 30 Days
              </span>
            </div>
            <div>
              <div className="flex justify-center py-2">
                <span className="font-bold text-blue-gray-700 text-sm">Expense Category</span>
              </div>
              <div>
                <div className="flex justify-around bg-gray-100">
                  {expenseTypes.slice(0, 3).map((item, index) => (
                    <span
                      onClick={() => handleCategoryFilter("category", item)}
                      key={`expense1-${index}`}
                      className={` m-2 p-2 rounded-lg text-sm w-24 text-center ${
                        filterValues.category.includes(item) ? "bg-light-blue-700 text-white" : "bg-blue-gray-200"
                      } text-gray-800 cursor-pointer`}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex justify-around bg-gray-100">
                  {expenseTypes.slice(3).map((item, index) => (
                    <span
                      onClick={() => handleCategoryFilter("category", item)}
                      key={`expense2-${index}`}
                      className={` m-2 p-2 rounded-lg text-sm w-24 text-center ${
                        filterValues.category.includes(item) ? "bg-light-blue-700  text-white" : "bg-blue-gray-200"
                      } text-gray-800 cursor-pointer`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-center py-2">
                <span className="font-bold text-sm text-blue-gray-700">Income Category</span>
              </div>
              <div>
                <div className="flex justify-around bg-gray-100">
                  {incomeTypes.slice(0, 3).map((item, index) => (
                    <span
                      onClick={() => handleCategoryFilter("category", item)}
                      key={`expense1-${index}`}
                      className={` m-2 p-2 rounded-lg text-sm w-24 text-center ${
                        filterValues.category.includes(item) ? "bg-light-blue-700  text-white" : "bg-blue-gray-200"
                      } text-gray-800 cursor-pointer`}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex justify-around bg-gray-100">
                  {incomeTypes.slice(3).map((item, index) => (
                    <span
                      onClick={() => handleCategoryFilter("category", item)}
                      key={`expense2-${index}`}
                      className={` m-2 p-2 rounded-lg text-sm w-24 text-center ${
                        filterValues.category.includes(item) ? "bg-light-blue-700  text-white" : "bg-blue-gray-200"
                      } text-gray-800 cursor-pointer`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
