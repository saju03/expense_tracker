/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import RadioBtn from "./UI/RadioBtn";
import DropDown from "./UI/DropDown";
import { useState } from "react";
import Datepicker from "./UI/DatePicker";
import {  db } from "../firebase/config";
import { getAuth } from "firebase/auth";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid'; // Import a UUID generator
import { useDispatch } from "react-redux";
import { addExpense } from "../utils/redux/expenseSlice";
import React from "react";


const AddExpense  = ({ open, setOpen }) => {
  const [selectedType, setSelectedType] = useState ("income");
  const [incomeTypes] = useState (["Salary", "Bonus", "Investment", "Rental", "Income", "Other"]);
  const [expenseTypes] = useState (["Rent", "Food", "Travel", "Cosmetics", "Bills", "Other "]);
  const [err, setErr] = useState ("");
  const dispatch = useDispatch()
  const [expense, setExpense] = useState ({
    spentType: "income",
    category: "",
    amount: 0.0,
    date: new Date(),
  });

  const handleAmountChange = (e ) => {
    setErr('')
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setExpense((prev) => ({ ...prev, amount: value }));
    }
  };

  const handleSubmit = async () => {
    // Validate amount
    const parsedAmount = parseFloat(expense.amount).toFixed(3);

    if (parsedAmount <= 0) {
      setErr("Please enter a valid amount.");
      return;
    }
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        setErr("User not logged in.");
        return; 
      }
  
      const userRef = doc(db, "expense", user.uid);
      const uniqueId = uuidv4();
  
      const expenseData  = {
        uid: uniqueId,
        amount: parsedAmount,
        createdAt: new Date().toISOString(),
        date: expense.date instanceof Date ? expense.date.toISOString() : new Date(expense.date).toISOString(),
        category: expense.category,
        spentType: expense.spentType,
      };
  
      await setDoc(userRef, { expenses: arrayUnion(expenseData) }, { merge: true });
  
      dispatch(addExpense(expenseData));
  
      // Reset the expense state and error message
      setExpense({ ...expense, amount: 0.0 });
      setErr("");
      setOpen(false);
    } catch (error) {
      console.error("Error adding expense: ", error);
      setErr("Error adding expense. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop transition className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen h-3/4">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mx-auto sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    ADD EXPENSE
                  </DialogTitle>
                  <div className="mt-2 mx-auto">
                    <RadioBtn setSelectedType={setSelectedType} />
                  </div>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 text-center">
                Amount
              </label>
              <div className="relative mt-2 rounded-md shadow-sm mx-20">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1 mr-2">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={expense.amount || ""}
                  placeholder="0.00"
                  onChange={handleAmountChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="text-deep-orange-600">{err}</span>
              </div>
            </div>

            <div className="flex flex-col items-center mt-5 space-y-4 h-52">
              <div className="flex justify-center items-center">
                {selectedType === "income" ? (
                  <DropDown
                    selectedType={selectedType}
                    spentTypes={incomeTypes}
                    expense={expense}
                    setExpense={setExpense}
                  />
                ) : (
                  <DropDown
                    selectedType={selectedType}
                    spentTypes={expenseTypes}
                    expense={expense}
                    setExpense={setExpense}
                  />
                )}
              </div>
              <div className="flex justify-center items-center">
                <Datepicker expense={expense} setExpense={setExpense} label={undefined} />
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Add  
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddExpense;
