import React, { useEffect, useState } from "react";

  
const App: React.FC= ({spentTypes,expense,setExpense,selectedType}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    setExpense({...expense,category:e.target.value})
  };

  useEffect(()=>{
    setExpense({...expense,category:spentTypes[0],spentType:selectedType})
  },[selectedType])

  return (
    <>
        <select
          className="outline-none focus:outline-none p-2 bg-white rounded-xl w-48"
          value={selectedValue}
          onChange={handleSelectChange} // Correctly bind the event handler
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

export default App;
