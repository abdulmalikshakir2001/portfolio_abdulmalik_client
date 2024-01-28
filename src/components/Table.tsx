"use client";
import { fetchApi } from "@/utility_functions/fetchApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import axios from "axios";
import Button from "./Button";
// import { useRouter } from 'next/navigation'
interface IContact {
  createdAt: string;
  email: string;
  message: string;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
const Table = () => {
  // const router = useRouter();

  const [reRender, setReRender] = useState(false);
  // data table start
  const [data, setData] = useState<IContact[]> ([]);
  const [page, setPage] = useState(1);
  const [totalContacts,setTotalContact] = useState(0)
  const limit = 10;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `/api/contact/paginationContact?page=${page}&limit=${limit}`
      );
      setData(result.data.result);
      setTotalContact(result.data.totalContacts)
      console.log(result);
    };
    fetchData();
  }, [page, reRender]);
  // data table end

  // fetching contacts
  let deleteData = (contactId:string|number) => {
    fetchApi("/api/contact/deleteContact", "POST", { contactId }).then(
      (data) => {
        setReRender(true);
      }
    );
  };
  useEffect(() => {
    setReRender(false);
  }, [data]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 md:px-2 md:py-1">
              Name
            </th>
            <th scope="col" className="px-6 py-3 md:px-2 md:py-1">
              Email
            </th>
            <th scope="col" className="px-6 py-3 md:px-2 md:py-1">
              Message
            </th>
            <th scope="col" className="px-6 py-3 md:px-2 md:py-1">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr
                key={item._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white md:px-2 md:py-1"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4 md:px-2 md:py-1">{item.email}</td>
                <td className="px-6 py-4 md:px-2 md:py-1">{item.message}</td>
                <td className="px-6 py-4 md:px-2 md:py-1">
                  <button
                    className="font-medium text-red-500 dark:text-red-500 hover:underline"
                    onClick={() => deleteData(item._id)}
                  >
                    <RiDeleteBin2Fill />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* data table start  */}
         <div>
          <Button
            handleClick={() => setPage(page - 1)}
            disabled={page === 1}
            text="Previous"
          />
          <span className="ms-2">
            <Button handleClick={() => setPage(page + 1)} text="Next"  disabled={page * limit >= totalContacts} />
          </span>
        </div>


      {/* data table end */}
    </div>
  );
};

export default Table;
