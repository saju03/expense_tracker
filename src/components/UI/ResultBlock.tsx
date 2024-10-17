import React from "react";
import { Expense } from "../../../interface";
import { formatDate } from "../../utils/Helper/helper";
import credit from "../../assets/money_credit.png";
import debit from "../../assets/debitted-amount.png";
const ResultBlock: React.FC<Expense> = ({ data }) => {
  return (
    <tr>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
        {formatDate(data.date)}
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
        {data.spentType.toUpperCase()}
      </td>
      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {data.category.toUpperCase()}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center">
        <img src={data.spentType == "income" ? credit : debit} alt="" loading="lazy" className="w-4 mr-2" />
        {data.amount}
      </td>
 
    </tr>
  );
};

export default ResultBlock;
