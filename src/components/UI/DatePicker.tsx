import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  label?: string;
}

const Datepicker: React.FC<Props> = ({ label, expense, setExpense }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const handleChange = (date:Date|null) => {
    setStartDate(date)
    setExpense({...expense,date:date})
  };
  return (
    <div className="flex flex-col">
      {label && <label className="mb-2 text-sm font-semibold">{label}</label>}
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => {
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
