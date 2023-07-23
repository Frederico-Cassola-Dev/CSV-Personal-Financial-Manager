import { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
  const [transactionsData, setTransactionsData] = useState([]);
  const [transactionsFileId, setTransactionsFileId] = useState("");

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/transactions/files/${transactionsFileId}`
      )
      .then((response) => setTransactionsData(response.data));
  }, [transactionsFileId]);

  return (
    <div className="flex flex-col items-center justify-center m-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Transactions</h1>
      <select
        name=""
        id=""
        className="mb-4"
        onChange={(e) => setTransactionsFileId(e.target.value)}
      >
        <option value="1">file name 1</option>
        <option value="2">file name 2</option>
        <option value="3">file name 3</option>
        <option value="4">file name 3</option>
      </select>
      <table className="table-fixed">
        <thead className="bg-gray-800 text-gray-300 sticky ">
          <tr>
            <th className=" w-48 p-4 rounded-tl-lg">Banque date</th>
            <th className=" w-72 p-4">Description</th>
            <th className=" w-48 p-4">Valeur</th>
            <th className=" w-48 p-4">Title</th>
            <th className=" w-48 p-4">transaction_date</th>
            <th className=" w-48 p-4">undefined</th>
            <th className=" w-48 p-4">file_id</th>
            <th className=" w-48 p-4 rounded-tr-lg">category_id</th>
          </tr>
        </thead>
        <tbody className="last-child:bg-green-100 ">
          {transactionsData &&
            transactionsData.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-300 hover:text-white hover:font-medium cursor-pointer odd:bg-white even:bg-slate-50"
              >
                <td className="text-center p-4 border-2">
                  {transaction.bank_date}
                </td>
                <td className="text-center p-4 border-2">
                  <div className=" w-lg">{transaction.description}</div>
                </td>
                <td className="text-center p-4 border-2">
                  {transaction.value}
                </td>
                <td className="text-center p-4 border-2">
                  {transaction.title}
                </td>
                <td className="text-center p-4 border-2">
                  {transaction.transaction_date}
                </td>
                <td className="text-center p-4 border-2">
                  {transaction.undefined}
                </td>
                <td className="text-center p-4 border-2">
                  {transaction.file_id}
                </td>
                <td className="text-center p-4 border-2">
                  {transaction.category_id}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
