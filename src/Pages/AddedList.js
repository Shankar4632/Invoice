import React, { useEffect, useRef } from "react";

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
//import from database
import { dataRef } from "../firebase-config";

//import react router
import { Link, useNavigate } from "react-router-dom";
//import from pdf
import { useReactToPrint } from "react-to-print";

//materialUI imports
import Box from "@mui/material/Box";

import MenuItem from "@mui/material/MenuItem";

import TextField from "@mui/material/TextField";
import { useState } from "react";
import { toast } from "react-toastify";

const AddedList = () => {
  //states or hooks
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  //get data from the db
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const showdropdown = (id) => {
    setSelectedId(id);
    setShow(!show);
  };

  //pdf
  const componentpdf = useRef();
  const generatepdf = useReactToPrint({
    content: () => componentpdf.current,
    documentTitle: "Userdata",
    onafterprint: () => alert("data saved in pdf"),
  });
  // delete
  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete")) {
  //     dataRef
  //       .ref()
  //       .child(`section3message/${id}`)

  //       .remove((err) => {
  //         if (err) {
  //           toast.error(err);
  //         } else {
  //           toast.success("Success");
  //           console.log(id);
  //         }
  //       });
  //   }
  // };
  const handleDelete = (id) => {
    dataRef
      .ref("section3message")
      .child(id)
      .remove()
      .then(() => {
        toast.success("Data deleted successfully.");
      })
      .catch((error) => {
        toast.error("Failed to delete data.");
        console.log(error);
      });
  };

  //data from db
  useEffect(() => {
    dataRef
      .ref()
      .child("section3message")
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setData(Object.values(snapshot.val()));
        } else {
          setData([]);
        }
        setIsLoading(false);
      });
    return () => {
      setData([]);
    };
  }, []);
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

  //loading
  if (isLoading) {
    return (
      <div className="text-center text-3xl text-black">
        Loading<span className="text-yellow-500"> . . .</span>
      </div>
    );
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="mb-3">
      {/* {profileid ? (
        <>
          <div></div>
        </>
      ) : null} */}

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
          type="search"
          placeholder="Search Icons..."
        />
        <button className="flex items-center gap-3 ml-5 border-2 text-blue-900 font-bold rounded-full text-xl px-5 border-blue-900 py-1">
          <CiSliderHorizontal className="font-extrabold" />
          Filter
        </button>
        <button
          className="flex items-center text-xl text-blue-900"
          onClick={generatepdf}
        >
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
        <div className="relative  h-80  overflow-y-hidden hover:overflow-scroll overflow-x-hidden  shadow-md sm:rounded-lg">
          <div ref={componentpdf} className="w-full">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr></tr>
              </thead>
              {Object.keys(data).map((id, index) => {
                return (
                  <tbody key={index} className="relative">
                    <tr className="bg-white relative border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  ">
                      <td className="w-4 p-6">
                        <div className="flex items-center  ">
                          <input
                            id="checkbox-table-1"
                            type="checkbox"
                            className="w-6 h-6  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="checkbox-table-1" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 text-2xl font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {id}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 text-2xl font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data[id].section3messege}
                      </th>
                      {/* <td className="px-6 py-4 text-2xl font-bold text-black">
                        {data[id].inputuser5.invoicenumber}
                      </td>
                      <td className="px-6 py-4 text-lg font-bold">
                        Due-
                        {data[id].inputuser5.invoicedue}
                      </td>
                      <td className="px-6 py-4 text-2xl font-bold text-black">
                        ${data[id].total}
                      </td> */}
                      <td className="px-6 py-4">
                        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          <BsThreeDotsVertical
                            className="mr-8 text-[23px] text-gray-600"
                            onClick={showdropdown}
                          />
                        </Link>
                        {/* <button>Delete</button> */}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
              {show &&
                Object.keys(data).map((selectedId, index) => {
                  return (
                    <>
                      <div
                        key={selectedId}
                        className="absolute top-20 right-28"
                      >
                        <ul className="border rounded-xl cursor-pointer">
                          <li className="px-7 py-3 bg-white ">{selectedId} </li>
                          <li className="px-7 py-3 bg-white ">Send </li>
                          <li className="px-7 py-3 bg-white ">Edit</li>
                          <li className="px-7 py-3 bg-white  ">Copy</li>
                          <li className="px-7 py-3 bg-white  ">
                            Record payment
                          </li>
                          <li
                            className="px-7 py-3 bg-white  "
                            onClick={generatepdf}
                          >
                            Print
                          </li>
                          <li
                            className="px-7 py-3 bg-white  "
                            onClick={generatepdf}
                          >
                            Download PDF
                          </li>
                          <li className="px-7 py-3 bg-white  ">Share Link</li>
                          <li
                            className="px-7 py-3 bg-white  "
                            onClick={() => handleDelete(selectedId)}
                          >
                            Delete{" "}
                          </li>
                          <li className="px-7 py-3 bg-white ">Archive</li>
                        </ul>
                      </div>
                    </>
                  );
                })}

              {/* {Object.keys(data).map((id, index) => {
                return (
                  <>
                    <div key={id} className="absolute top-20 right-28">
                      <ul className="border rounded-xl cursor-pointer">
                        <li className="px-7 py-3 bg-white ">{index} </li>
                        <li className="px-7 py-3 bg-white ">Send </li>
                        <li className="px-7 py-3 bg-white ">Edit</li>
                        <li className="px-7 py-3 bg-white  ">Copy</li>
                        <li className="px-7 py-3 bg-white  ">Record payment</li>
                        <li
                          className="px-7 py-3 bg-white  "
                          onClick={generatepdf}
                        >
                          Print
                        </li>
                        <li
                          className="px-7 py-3 bg-white  "
                          onClick={generatepdf}
                        >
                          Download PDF
                        </li>
                        <li className="px-7 py-3 bg-white  ">Share Link</li>
                        <li
                          className="px-7 py-3 bg-white  "
                          onClick={() => handleDelete(id)}
                        >
                          Delete{" "}
                        </li>
                        <li className="px-7 py-3 bg-white ">Archive</li>
                      </ul>
                    </div>
                  </>
                );
              })} */}
            </table>
          </div>
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
