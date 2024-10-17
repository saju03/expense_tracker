import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Datepicker = ({ label, expense, setExpense }) => {
  const [startDate, setStartDate] = useState(new Date());
  const handleChange = (date) => {
    setStartDate(date)
    setExpense({...expense,date:date})
  };
  return (
    <div className="flex flex-col">
      {label && <label className="mb-2 text-sm font-semibold">{label}</label>}
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          handleChange(date);
        }}
        dateFormat="MMMM d, yyyy"
        className="border rounded-md p-2 "
        placeholderText="Select a date"
        onKeyDown={(e) => {
          e.preventDefault();
        }}
      />
    </div>
  );
};

export default Datepicker;
