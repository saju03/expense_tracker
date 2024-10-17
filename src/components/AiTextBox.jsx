import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { GenAIRes } from '../GenerativeAI/GenAI';
import { Spinner } from './UI/Spinner';

export const AiTextBox = () => {
    const [loading, setLoading] = useState (false);
    const [displayedText, setDisplayedText] = useState("Ask AI to how to manage your expenses and income more efficient");

    const data = useSelector((store) => store.expense);

    const displayWordByWord = (text ) => {
      setDisplayedText(() => "");
      setLoading(() => false);
      const words = text.split(" ");
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayedText((prevText) => `${prevText} ${words[index]}`);
        index++;
        if (index >= words.length - 1) {
          clearInterval(intervalId);
        }
      }, 120);
    };
  
    const getAIResult = async () => {
      setLoading(() => true);
      const aiResponse = await GenAIRes({ data });
      displayWordByWord(aiResponse);
    };
  
  return (
     <div className=" flex p-1 mb-5">
    <div className="bg-[#d8eff6] h-44 w-10/12 overflow-y-auto p-2 rounded-md ">
      {loading ? (
        <div className="flex justify-center items-center my-auto">
          <Spinner />
        </div>
      ) : (
        <span>{displayedText}</span>
      )}
    </div>
    <div className="flex h-32 w-2/12 justify-center">
      <button className={`bg-[#4e7ff4] m-auto p-1 px-7 rounded-md text-white ${loading ? 'disabled':''}`} onClick={() =>{
        if(data.length ==0) alert('add some data')
        if(loading || data.length == 0) return 
        getAIResult()}}>
        Ask
      </button>
    </div>
  </div>
  )
}
