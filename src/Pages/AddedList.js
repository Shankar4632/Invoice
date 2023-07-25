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
  const [isOpen, setIsOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [billpdf, setBillpdf] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);

  //get data from the db
  const [data, setData] = useState([]);
  const [values, setValues] = useState([]);
  const navigate = useNavigate();

  //toggle button
  const handleMenuToggle = (id) => {
    setIsOpen((prevId) => (prevId === id ? null : id));
  };

  //pdf
  const componentpdf = useRef();
  const generatepdf = useReactToPrint({
    content: () => componentpdf.current,
    documentTitle: "Userdata",
    onafterprint: () => alert("data saved in pdf"),
  });

  const componentuserpdf = useRef();
  const Downloadpdf = useReactToPrint({
    content: () => componentuserpdf.current,
    documentTitle: "Bill Downloaded ",
    onafterprint: () => alert("data saved in pdf"),
  });

  const handlegeneratepdf = (key) => {
    setSelectedKey(key);
    setBillpdf(true);
    Downloadpdf(true);
  };

  // delete

  const handleDelete = (key) => {
    console.log("Deleting data with key:", key);
    dataRef
      .ref()
      .child("section3")
      .child(key) // Use the key directly to access the child node
      .remove()
      .then(() => {
        console.log(`Data with key ${key} deleted successfully.`);
        console.log("Data after deletion:");
        // Update the state by removing the deleted item
        setData((prevData) => {
          const newData = { ...prevData };
          delete newData[key];
          return newData;
        });
      })
      .catch((error) => {
        console.log("Error deleting data:", error);
      });
  };

  //data from db

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await dataRef.ref().child("section2").once("value");
        const data = snapshot.val();
        if (data !== null) {
          setData(data);
        } else {
          setData({});
          console.log(setData.length);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setData({});
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

  return (
    <div className="mb-3">
      {billpdf && (
        <>
          <div
            className="w-full h-auto  border bg-white "
            ref={componentuserpdf}
          >
            {Object.keys(data).map((id, index) => {
              const item = data[id];
              if (selectedKey === id) {
                return (
                  <>
                    <div className="grid grid-cols-2  text-end  bg-white h-auto">
                      <div className=""></div>
                      <div className="pr-6">
                        <h1 className="text-[50px] font-semibold ">INVOICE</h1>
                        <p className="text-2xl font-semibold p-1">
                          Company Name :XYZ Company
                        </p>
                        <p className="text-2xl font-semibold p-1">Address:</p>
                        <p className="text-2xl font-semibold p-1">TIN/PAN</p>
                        <p className="text-2xl font-semibold p-1">
                          Phone No. :XXXXXXXXXXX
                        </p>
                        <p className="text-2xl font-semibold p-1">
                          Email ID. :XXXXXXXXXXX
                        </p>
                        <p className="text-2xl font-semibold p-1">Website :</p>
                      </div>
                    </div>

                    <div className="h-48 w-[95%] mx-auto bg-gray-200">
                      <div className="grid grid-cols-2  h-full">
                        <div className="  ">
                          <p className="text-2xl font-semibold p-2">
                            Invoice no.
                          </p>
                          <p className="text-2xl font-semibold p-2">
                            Invoice date.
                          </p>
                          <p className="text-2xl font-semibold p-2">
                            Reference
                          </p>
                          <p className="text-2xl font-semibold pl-2">
                            Due date.
                          </p>
                        </div>
                        <div className="text-[35px] font-semibold flex justify-end items-end">
                          <p>AMOUNT DUE</p>
                        </div>
                      </div>
                    </div>
                    <div className=" w-[95%] mx-auto">
                      <div className="grid grid-cols-2 mt-5 h-auto">
                        <div className=" ">
                          <p className="text-2xl font-bold p-1">BILL TO</p>

                          <p className="text-2xl  font-semibold  p-1">
                            Business Name
                          </p>
                          <p className="text-2xl  font-semibold  p-1">
                            Fname Lname
                          </p>
                          <p className="text-2xl  font-semibold p-1 ">
                            Address1 Address2
                          </p>
                          <p className="text-2xl  font-semibold  p-1">
                            Email Id.
                          </p>
                          <p className="text-2xl  font-semibold pl-1  ">
                            Phone No.
                          </p>
                        </div>
                        <div className=" ">
                          <p className="text-2xl font-bold p-1">SEND TO</p>

                          <p className="text-2xl  font-semibold  p-1">
                            Business Name
                          </p>
                          <p className="text-2xl  font-semibold  p-1">
                            Fname Lname
                          </p>
                          <p className="text-2xl  font-semibold p-1 ">
                            Address1 Address2
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[95%] mx-auto mt-5">
                      <table className="w-full p-6 text-xl    text-left whitespace-nowrap">
                        <thead>
                          <tr className="dark:bg-gray-700 border-b-4 border-gray-300">
                            <th className="p-3">No.</th>
                            <th className="p-3">ITMES AND DESCRIPTION</th>
                            <th className="p-3">QTY/HRS</th>
                            <th className="p-3">PRICE</th>
                            <th className="p-3">AMOUNTS$</th>
                          </tr>
                        </thead>
                        <tbody className="border-b dark:bg-gray-900 dark:border-gray-700  ">
                          {item.map((itemData, id) => (
                            <>
                              <tr className="" key={id}>
                                <td className="px-3 text-2xl font-medium dark:text-gray-400  ">
                                  {id + 1}
                                </td>
                                <td className="px-3 text-2xl font-medium dark:text-gray-400  ">
                                  {itemData?.ItemName}
                                </td>

                                <td className="px-3 py-2">
                                  <span>2{itemData?.quantity}</span>
                                  <p className="dark:text-gray-400"></p>
                                </td>
                                <td className="px-3 py-2">
                                  <p>$100{itemData?.price}</p>
                                </td>
                                <td className="px-10 py-2">
                                  <p>$20</p>
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="px-3 text-2xl font-medium dark:text-gray-400"></td>
                                <td className="px-3 py-2">
                                  <p>Description 1</p>
                                </td>
                                <td className="px-3 py-2">
                                  <span></span>
                                  <p className="dark:text-gray-400"></p>
                                </td>
                                <td className="px-3 py-2">
                                  <p></p>
                                </td>
                                <td className="px-3 py-2">
                                  <p></p>
                                </td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="">
                      <div className="grid grid-cols-2 ">
                        <div className=" h-48"></div>
                        <div className=" h-48 ">
                          <p className="text-xl p-2 font-semibold flex justify-end">
                            Subtotal <span className="pr-10">$200</span>
                          </p>
                          <p className="text-xl p-2 font-semibold border-b-4 border-gray-200 flex justify-end">
                            Shipping <span className="pr-10">$20</span>
                          </p>
                          <p className="font-bold text-2xl p-4 pr-10 flex justify-end border-b-4 border-gray-200">
                            ToTal $220 USD
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="grid grid-cols-2">
                        <div className=" h-80">
                          <p className="text-3xl font-bold  p-3">
                            NOTES TO CUSTOMER
                          </p>
                          <p className="text-3xl font-semibold  p-2">
                            sellers note to customer
                          </p>
                          <p className="text-3xl font-bold  p-2">
                            TERMS AND CONDITIONS
                          </p>
                          <p className="text-3xl font-semibold  p-2">
                            Seller's terms And conditions
                          </p>
                          <p className="text-3xl font-bold  p-2">ATTACHMENTS</p>
                          <p className="text-3xl font-semibold  p-2">
                            newnxs-logo.png
                          </p>
                        </div>
                        <div className=" h-80"></div>
                      </div>
                    </div>
                  </>
                );
              }
              return null;
            })}
          </div>
        </>
      )}
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
                navigate("/invoicepage");
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
                console.log("ID:", id);
                const item = data[id];
                return (
                  <tbody key={id} className="cursor-pointer">
                    <tr className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  ">
                      <td className="w-4 p-6">
                        <div className="flex items-center  ">
                          <input
                            id={`checkbox-table-${id}-${index}`}
                            type="checkbox"
                            className="w-6 h-6  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={`checkbox-table-${id}-${index}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 text-2xl font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 text-2xl font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item[0].ItemName}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 text-2xl font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.price}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 text-2xl font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.description}
                      </th>

                      <td className="px-6 py-4">
                        <Link
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleMenuToggle(id)}
                        >
                          <BsThreeDotsVertical className=" text-[23px] text-gray-600" />
                        </Link>
                        {isOpen === id && (
                          <ul className="absolute  right-[65px] mt-2 py-2 w-48 bg-white border dark:bg-gray-800 dark:border-gray-700 rounded shadow-lg">
                            <li className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700">
                              <button>{index + 1}</button>
                            </li>
                            <li className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700">
                              <button>Edit</button>
                            </li>
                            <li className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700">
                              <button onClick={() => handleDelete(id)}>
                                Delete
                              </button>
                            </li>
                            <li className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700 ">
                              <button>Send</button>{" "}
                            </li>

                            <li className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700  ">
                              <button>Copy</button>
                            </li>
                            <li className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700  ">
                              <button>Record payment</button>
                            </li>
                            <li
                              className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700  "
                              onClick={generatepdf}
                            >
                              <button>Print</button>
                            </li>
                            <li
                              key={id}
                              className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => handlegeneratepdf(id)}
                            >
                              <button>Download PDF</button>
                            </li>
                            <li className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700  ">
                              {" "}
                              <button>Share Link</button>{" "}
                            </li>
                          </ul>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
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
