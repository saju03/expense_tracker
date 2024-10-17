import React, { useEffect, useState } from "react";




const DropDown  = ({ spentTypes, expense, setExpense, selectedType }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    setExpense({ ...expense, category: newValue }); // Update the expense state
  };

  useEffect(() => {
    if (spentTypes.length > 0) {
      setSelectedValue(spentTypes[0]); // Set default selected value
      setExpense({ ...expense, category: spentTypes[0], spentType: selectedType }); // Initialize expense state
    }
  }, [selectedType, spentTypes]); // Ensure this runs when spentTypes changes

  return (
    <>
      <select
        className="outline-none focus:outline-none p-2 bg-white rounded-xl w-48"
        value={selectedValue}
        onChange={handleSelectChange} 
      >
        {spentTypes.map((item, i) => (
          <option value={item} key={i}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropDown;
