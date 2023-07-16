import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineUpload } from "react-icons/ai";

export default function Uploads() {
  const [uploadsData, setUploadsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/files/users/1`)
      .then((response) => setUploadsData(response.data));
  }, [uploadsData, setUploadsData]);

  const handleInputFileUpload = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", event.target[0].files[0]);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/uploads`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col items-center justify-center m-8 md:w-xl sm:w-l ">
      <form
        className="flex justify-between mb-8 w-full"
        onSubmit={handleInputFileUpload}
      >
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 py-2 px-4 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />

        <button
          type="submit"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold ml-2 py-2 px-4 rounded inline-flex items-center"
        >
          <AiOutlineUpload size={20} />
          <span>Envoyer</span>
        </button>
      </form>
      <table className="table-fixed w-xl">
        <thead className="bg-gray-800 text-gray-300 sticky">
          <tr>
            <th className=" w-48 p-4 rounded-tl-lg">Original name</th>
            <th className=" w-48 p-4">File name server</th>
            <th className=" w-48 p-4">Start period</th>
            <th className=" w-48 p-4">End period</th>
            <th className=" w-48 p-4">Creation date</th>
            <th className=" w-48 p-4">Account Number</th>
            <th className=" w-48 p-4 rounded-tr-lg">Size</th>
          </tr>
        </thead>
        <tbody className="last-child:bg-green-100">
          {uploadsData &&
            uploadsData.map((file) => {
              const createdDate = new Date(file.created_date);
              const stringDate = createdDate.toLocaleDateString();
              return (
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
                  <td className="text-center p-4 border-2">
                    {file.end_period}
                  </td>
                  <td className="text-center p-4 border-2">{stringDate}</td>
                  <td className="text-center p-4 border-2">
                    {file.account_nb}
                  </td>
                  <td className="text-center p-4 border-2">{file.size}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
