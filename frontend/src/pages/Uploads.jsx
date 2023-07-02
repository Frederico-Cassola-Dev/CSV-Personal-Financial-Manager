import { useState, useEffect } from "react";
import axios from "axios";

export default function Uploads() {
  const [uploadsData, setUploadsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/files`)
      .then((response) => setUploadsData(response.data));
  }, []);

  return (
    <div className="flex items-center justify-center m-8">
      <table className="table-fixed">
        <thead className="bg-gray-800 text-gray-300 sticky ">
          <tr>
            <th className=" w-48 p-4 rounded-tl-lg">Original name</th>
            <th className=" w-48 p-4">File name server</th>
            <th className=" w-48 p-4">Start period</th>
            <th className=" w-48 p-4">End period</th>
            <th className=" w-48 p-4">Creation date</th>
            <th className=" w-48 p-4 rounded-tr-lg">Size</th>
          </tr>
        </thead>
        <tbody className="last-child:bg-green-100 ">
          {uploadsData &&
            uploadsData.map((file) => (
              <tr
                key={file.id}
                className="hover:bg-gray-300 hover:text-white hover:font-medium cursor-pointer odd:bg-white even:bg-slate-50"
              >
                <td className="text-center p-4 border-2">
                  {file.original_name}
                </td>
                <td className="text-center p-4 border-2">
                  {file.filename_server}
                </td>
                <td className="text-center p-4 border-2">
                  {file.start_period}
                </td>
                <td className="text-center p-4 border-2">{file.end_period}</td>
                <td className="text-center p-4 border-2">
                  {file.created_date}
                </td>
                <td className="text-center p-4 border-2">{file.size}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
