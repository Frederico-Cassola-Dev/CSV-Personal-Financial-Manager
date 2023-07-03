import { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/transactions`)
      .then((response) => setTransactionsData(response.data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center m-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Transactions</h1>
      <table className="table-fixed">
        <thead className="bg-gray-800 text-gray-300 sticky ">
          <tr>
            <th className=" w-48 p-4 rounded-tl-lg">Banque date</th>
            <th className=" w-48 p-4">Titre</th>
            <th className=" w-48 p-4 rounded-tr-lg">Valeur</th>
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
                  {transaction.title}
                </td>
                <td className="text-center p-4 border-2">
                  {transaction.value}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
