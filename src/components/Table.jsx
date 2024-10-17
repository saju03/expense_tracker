/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import AddExpense from "./AddExpense";
import useFilteredResults from "../hooks/useFilteredResults";
import ResultBlock from "./UI/ResultBlock";
 import FilterBlock from "./FilterBlock";
import { AiTextBox } from "./AiTextBox";

const Table  = () => {
  const [open, setOpen] = useState (false);


  const { filteredResults, filterValues, setFilterValues, values } = useFilteredResults({}, {});

  const handleFilterSelect = (key , value ) => {
    setFilterValues((prevState ) => {
      const currentValues = prevState[key] || [];

      if (currentValues.includes(value)) {
        return {
          ...prevState,
          [key]: currentValues.filter((v ) => v !== value),
        };
      } else {
        return {
          ...prevState,
          [key]: [...currentValues, value],
        };
      }
    });
  };


  return (
    <>
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <section className="py-1 bg-blueGray-50 flex">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-11">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex justify-around">
                  <div className="flex-grow text-left">
                    <span className="font-semibold text-base text-blueGray-700">Records</span>
                  </div>
                  <div className="flex-grow text-left">
                    <span
                      className={`font-semibold text-base text-blueGray-700 cursor-pointer ${
                        filterValues.spentType.includes("income") ? "bg-[#e3e7ef] rounded-md p-2" : ""
                      }`}
                      onClick={() => handleFilterSelect("spentType", "income")}
                    >
                      <span>Income</span> <span className="text-sm text-green-600">$ {values.totalIncome}</span>
                    </span>
                  </div>
                  <div className="flex-grow text-left">
                    <span
                      className={`font-semibold text-base text-blueGray-700 cursor-pointer ${
                        filterValues.spentType.includes("expense") ? "bg-[#e3e7ef] rounded-md p-2" : ""
                      }`}
                      onClick={() => handleFilterSelect("spentType", "expense")}
                    >
                      <span>Expense</span> <span className="text-sm text-orange-600">$ {values.totalExpense}</span>{" "}
                    </span>
                  </div>
                  <div className="flex-grow text-left">
                    <span className="font-semibold text-base text-blueGray-700 cursor-pointer">
                      <span>Balance</span> <span className="text-sm text-blue-600">$ {values.balance}</span>{" "}
                    </span>
                  </div>
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpen(true)}
                  >
                    + Add
                  </button>
                </div>

                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <AddExpense open={open} setOpen={setOpen} />
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto  max-h-96 overflow-y-scroll ">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Date
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      type
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      category
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Amount
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredResults?.length > 0 ? (
                    filteredResults?.map((expense , i ) => (
                      <ResultBlock key={`resultBlock${i}`} data={expense} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500">
                        No expense or income to show. Try adding something.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
         <AiTextBox/>
        </div>
        <FilterBlock setFilterValues={setFilterValues} filterValues={filterValues} />
      </section>
    </>
  );
};

export default Table;
