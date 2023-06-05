import React from "react";

import {
  BsFillQuestionCircleFill,
  BsSearch,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { AiFillSetting, AiOutlineDownload } from "react-icons/ai";
import { RiFileList2Fill } from "react-icons/ri";
import { CiSliderHorizontal } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { FaPaypal } from "react-icons/fa";

//import react router
import { Link, useNavigate } from "react-router-dom";

//materialUI imports
import Box from "@mui/material/Box";

import MenuItem from "@mui/material/MenuItem";

import TextField from "@mui/material/TextField";
import { useState } from "react";

const AddedList = () => {
  //states or hooks
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const receipt = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "on receipt",
      label: "on receipt",
    },
    {
      value: "on specific date ",
      label: "on specific date",
    },
    {
      value: "in 10 days ",
      label: "in 10 days",
    },
  ];
  return (
    <div className="mb-3">
      <div className="grid grid-cols-2 h-32  ">
        <div className=" flex items-center pl-10">
          <RiFileList2Fill className="text-[35px] flex items-center  h-full" />
          <p className="pl-3 text-[50px] font-semibold mt-1">Invoicing</p>
        </div>
        <div className=" flex items-center  justify-end  ">
          <div className="flex items-center ">
            <BsFillQuestionCircleFill className="mr-8 text-[23px] text-gray-600" />

            <AiFillSetting className="mr-8 text-2xl text-gray-600" />
            <button
              className="text-white bg-[#003087] px-9 py-3   mr-5 rounded-full    font-extrabold text-xl"
              onClick={() => {
                navigate("/");
              }}
            >
              Create Invoice
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 h-20  ">
        <div className=" flex items-center justify-center gap-10 w-[95%] ">
          <button className=" text-xl font-semibold ">Invoice</button>
          <button className=" text-xl font-semibold">Estimates</button>
          <button className=" text-xl font-semibold">Recurring series</button>
        </div>
        <div></div>
      </div>
      <div className="flex items-center  h-20 w-[90%] mx-auto">
        {" "}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-select-currency"
            select
            label="Search by fields"
            style={{ backgroundColor: "white" }}
          >
            {receipt.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <BsSearch className="absolute  ml-60 text-xl text-black   " />
        <input
          required
          id="outlined-required"
          className="w-[70%]  py-4 px-3 pr
          pl-10 border border-gray-500 rounded-md"
          type="text"
          placeholder="Search Icons..."
        />
        <button className="flex items-center gap-3 ml-5 border-2 text-blue-900 font-bold rounded-full text-xl px-5 border-blue-900 py-1">
          <CiSliderHorizontal className="font-extrabold" />
          Filter
        </button>
        <button className="flex items-center text-xl text-blue-900">
          <AiOutlineDownload className="text-3xl font-bold ml-5" />
        </button>
      </div>
      <div className="flex items-center  h-20 w-[90%] mx-auto">
        <p className="text-2xl  font-bold text-black ">Results Filtered By</p>
        <button className="px-8 py-2 flex items-center  font-bold text-lg text-blue-900 bg-sky-300 rounded-full ml-2">
          Date Range-Past 30 days <RxCross1 className="text-xl ml-3 " />
        </button>
      </div>
      <div className="h-48 w-[90%] mx-auto">
        <div className="relative  h-80  overflow-y-scroll hover:overflow-scroll  shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr></tr>
            </thead>
            <tbody className="">
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  ">
                <td className="w-4 p-6">
                  <div className="flex items-center  ">
                    <input
                      id="checkbox-table-1"
                      type="checkbox"
                      className="w-6 h-6  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <BsThreeDotsVertical
                      className="mr-8 text-[23px] text-gray-600"
                      onClick={() => {
                        setShow(true);
                      }}
                    />
                  </Link>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 mb-10 ">
                <td className="w-4 p-6">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-1"
                      type="checkbox"
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <BsThreeDotsVertical
                      className="mr-8 text-[23px] text-gray-600"
                      onClick={() => {
                        setShow(true);
                      }}
                    />
                  </Link>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-6">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-1"
                      type="checkbox"
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <BsThreeDotsVertical className="mr-8 text-[23px] text-gray-600" />
                  </Link>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-6">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-1"
                      type="checkbox"
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <BsThreeDotsVertical
                      className="mr-8 text-[23px] text-gray-600"
                      onClick={() => {
                        setShow(true);
                      }}
                    />
                  </Link>
                </td>
              </tr>
              {show ? (
                <>
                  <div className="absolute">
                    <ul>
                      <li>Home</li>
                      <li>Home</li>
                      <li>Home</li>
                      <li>Home</li>
                    </ul>
                  </div>
                </>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className=" h-96 mt-4  ">
          <div className="bg-white border-b">
            <div className="w-[80%] mx-auto  h-32 grid grid-cols-2">
              <div className="flex items-center">
                <ul className="flex items-center  w-full gap-16 ">
                  <li className="flex items-center ">
                    <i className="w-full flex justify-center text-blue-600  ">
                      <FaPaypal className="text-[40px]" />
                    </i>
                    <span className="text-blue-900 text-[40px] italic font-extrabold">
                      Pay
                    </span>
                    <span className="text-blue-400 text-[40px] italic font-extrabold">
                      Pal
                    </span>
                  </li>
                  <li className="text-[25px]  ">Help</li>
                  <li className="text-[25px]  ">Contact</li>
                  <li className="text-[25px]  ">Security</li>
                </ul>
              </div>
              <div></div>
            </div>
          </div>
          <div className="bg-white border-b mt-2">
            <div className="w-[80%]  mx-auto h-28 grid grid-cols-2">
              <div className="flex items-center">
                <ul className="flex items-center  w-full gap-16 ">
                  <li className="text-lg font-semibold text-gray-400">
                    1999-2023 PayPal,Inc.All rights reserved
                  </li>
                  <li className="flex items-center text-lg font-semibold ">
                    Privacy{" "}
                  </li>
                  <li className="flex items-center text-lg font-semibold ">
                    cookies{" "}
                  </li>
                  <li className="flex items-center text-lg font-semibold ">
                    Legal{" "}
                  </li>
                </ul>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedList;
