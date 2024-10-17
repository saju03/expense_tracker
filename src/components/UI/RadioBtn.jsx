import React, { Dispatch, SetStateAction } from 'react'

const RadioBtn = ({setSelectedType}) => {


  return (
    <>
    <div id="firstFilter" className="filter-switch">
      <input defaultChecked  id="option1" name="options" type="radio" onClick={()=>setSelectedType('income')} />
      <label className="option" htmlFor="option1">
        Income
      </label>
      <input id="option2" name="options" type="radio" onClick={()=>setSelectedType('expense')} />
      <label className="option" htmlFor="option2">
       Expense
      </label>
      <span className="background" />
    </div>
  </>
  
  )
}

export default RadioBtn