import React, { useState } from "react";
import AddExpense from "./AddExpense";
import useFilteredResults from "../hooks/useFilteredResults";
import ResultBlock from "./UI/ResultBlock";
import { Expense } from "../../interface";


const Table: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const filteredResults = useFilteredResults({},{});



  return (
    <>
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex justify-around">
                  <div className="flex-grow text-left">
                    <span className="font-semibold text-base text-blueGray-700">Records</span>
                  </div>
                  <div className="flex-grow text-left">
                    <span className="font-semibold text-base text-blueGray-700 cursor-pointer">Income 80000</span>
                  </div>
                  <div className="flex-grow text-left">
                    <span className="font-semibold text-base text-blueGray-700 cursor-pointer">Expense 5000</span>
                  </div>
                  <div className="flex-grow text-left">
                    <span className="font-semibold text-base text-blueGray-700 cursor-pointer">Balance 5000</span>
                  </div>
                </div>

                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpen(true)}
                  >
                    + Add
                  </button>
                  <AddExpense open={open} setOpen={setOpen} />
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Date
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Income Type
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Income Amount
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
                    filteredResults?.map((expense:Expense, i:number) => (
                      <ResultBlock key={`resultBlock${i}`} data={expense}  />
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
        </div>
      </section>
    </>
  );
};

export default Table;
