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
  const [data, setData] = useState({});
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

  // const handleDelete = (key) => {
  //   console.log("Deleting data with key:", key);
  //   dataRef
  //     .ref()
  //     .child("Allsections")
  //     .child(key) // Use the key directly to access the child node
  //     .remove()
  //     .then(() => {
  //       console.log(`Data with key ${key} deleted successfully.`);
  //       console.log("Data after deletion:");
  //       // Update the state by removing the deleted item
  //       setData((prevData) => {
  //         const newData = { ...prevData };
  //         delete newData[key];
  //         return newData;
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("Error deleting data:", error);
  //     });
  // };
  // const handleDelete = (key) => {
  //   if (window.confirm("Are you sure you want to delete ?")) {
  //     dataRef
  //       .ref()
  //       .child(`Allsections/${key}`)
  //       .remove((err) => {
  //         if (err) {
  //           toast.error(err);
  //         } else {
  //           toast.success("Successfully deleted");
  //         }
  //       });
  //   }
  // };
  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      dataRef
        .ref()
        .child(`Allsections/${key}`)
        .remove((err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Successfully deleted");
            setData((prevData) => {
              const newData = { ...prevData };
              delete newData[key];
              return newData;
            });
          }
        });
    }
  };

  //data from db

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await dataRef.ref("Allsections").once("value");
        const fetchedData = snapshot.val();
        setData(fetchedData);
        setIsLoading(false);
        console.log("Fetched Data:", fetchedData);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated Data:", data);
  }, [data]);

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
  const menuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  //loading;
  if (isLoading) {
    return (
      <>
        <div className="flex justify-center text-3xl">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="text-blue-800  ">Loading...</span>
          </div>
        </div>
      </>
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
            {Object.keys(data).map((key, index) => {
              if (selectedKey === key) {
                return (
                  <>
                    <div
                      key={key}
                      className="grid grid-cols-2  text-end  bg-white h-auto"
                    >
                      <div className="flex justify-start items-center ml-20 ">
                        {data[key]?.section6Businessinformation?.imageUrl && (
                          <img
                            src={data[key].section6Businessinformation.imageUrl}
                            alt="Business Logo"
                            style={{ maxWidth: "100%" }}
                          />
                        )}
                      </div>
                      <div className="pr-6">
                        <h1 className="text-[50px] font-semibold ">INVOICE</h1>
                        <p className="text-2xl font-semibold p-1">
                          Company Name :
                          {
                            data[key]?.section6Businessinformation
                              ?.lastDatasection6?.inputbusiness?.email
                          }
                        </p>
                        <p className="text-2xl font-semibold p-1">
                          Address:
                          {
                            data[key]?.section6Businessinformation
                              ?.lastDatasection6?.inputbusiness?.address1
                          }
                          {/* {
                            data[key]?.section6Businessinformation
                              ?.inputbusiness?.address1
                          } */}
                        </p>
                        <p className="text-2xl font-semibold p-1">TIN/PAN </p>
                        <p className="text-2xl font-semibold p-1">
                          Phone No. :
                          {
                            data[key]?.section6Businessinformation
                              ?.lastDatasection6?.inputbusiness?.pin
                          }
                          {/* {
                            data[key]?.section6Businessinformation
                              ?.inputbusiness?.pin
                          } */}
                        </p>
                        <p className="text-2xl font-semibold p-1">
                          Email ID. :
                          {
                            data[key]?.section6Businessinformation
                              ?.lastDatasection6?.inputbusiness?.email
                          }
                          {/* {
                            data[key]?.section6Businessinformation
                              ?.inputbusiness?.email
                          } */}
                        </p>
                        <p className="text-2xl font-semibold p-1">
                          Website :
                          {
                            data[key]?.section6Businessinformation
                              ?.lastDatasection6?.inputbusiness?.website
                          }
                          {/* {
                            data[key]?.section6Businessinformation
                              ?.inputbusiness?.website
                          } */}
                        </p>
                      </div>
                    </div>

                    <div className="h-48 w-[95%] mx-auto bg-gray-200">
                      <div className="grid grid-cols-2  h-full">
                        <div className="  ">
                          <p className="text-2xl font-semibold p-2">
                            Invoice no.
                            {data[key].section5total.inputuser5.invoicenumber}
                          </p>
                          <p className="text-2xl font-semibold p-2">
                            Invoice date.{" "}
                            {data[key].section5total.inputuser5.invoicedate}
                          </p>
                          <p className="text-2xl font-semibold p-2">
                            Reference
                          </p>
                          <p className="text-2xl font-semibold pl-2">
                            Due date.
                            {data[key].section5total.inputuser5.invoicedue}
                          </p>
                        </div>
                        <div className=" font-semibold grid justify-end items-end  ">
                          <div className=" mt-10 text-[45px]">
                            ${data[key].section5total.total}.00
                          </div>
                          <div className=" text-[35px] font-bold">
                            AMOUNT DUE
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" w-[95%] mx-auto">
                      <div className="grid grid-cols-2 mt-5 h-auto">
                        <div className=" ">
                          <p className="text-2xl font-bold p-1">BILL TO</p>

                          <p className="text-2xl  font-semibold  p-1">
                            {data[key].section1.businessname}
                          </p>
                          <p className="text-2xl  font-semibold  p-1">
                            {data[key].section1.firstname}
                          </p>
                          <p className="text-2xl  font-semibold  p-1">
                            {data[key].section1.lastname}
                          </p>
                          <p className="text-2xl  font-semibold p-1 ">
                            Address1 :{data[key].section1.address1}
                          </p>
                          <p className="text-2xl  font-semibold p-1 ">
                            Address2 :{data[key].section1.address2}
                          </p>
                          <p className="text-2xl  font-semibold  p-1">
                            Email Id:-{data[key].section1.email}
                          </p>
                          <p className="text-2xl  font-semibold pl-1  ">
                            Phone No:- {data[key].section1.phone}
                          </p>
                        </div>
                        <div className=" ">
                          <p className="text-2xl font-bold p-1">SEND TO</p>

                          <p className="text-2xl  font-semibold  p-1">
                            {data[key].section1.dbusinessname}
                          </p>
                          <p className="text-2xl  font-semibold  p-1">
                            {data[key].section1.dfirstname}
                          </p>
                          <p className="text-2xl  font-semibold  p-1">
                            {data[key].section1.dlastname}
                          </p>
                          <p className="text-2xl  font-semibold p-1 ">
                            {data[key].section1.daddress1}
                          </p>
                          <p className="text-2xl  font-semibold p-1 ">
                            {data[key].section1.daddress2}
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
                        {data[key].section2.map((key, index) => (
                          <tbody key={key} className="cursor-pointer">
                            <tr className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  ">
                              <td className="px-3 text-2xl font-medium dark:text-gray-400 py-3 ">
                                {index + 1}
                              </td>
                              <td className="px-3 text-2xl font-medium dark:text-gray-400 py-3 ">
                                {key?.ItemName}
                              </td>

                              <td className="px-3 py-2 ">
                                <span> {key?.quantity}</span>
                                <p className="dark:text-gray-400"></p>
                              </td>
                              <td className="px-3 py-2">
                                <p>${key?.price}</p>
                              </td>
                              <td className="px-10 py-2">
                                <p>${key?.amount}</p>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                    <div className="">
                      <div className="grid grid-cols-2 ">
                        <div className=" h-48"></div>
                        <div className=" h-48 ">
                          <p className="text-xl p-2 font-semibold flex justify-end">
                            Subtotal{" "}
                            <span className="pr-10">
                              ${data[key]?.section5total.subtotal}
                            </span>
                          </p>
                          <p className="text-xl p-2 font-semibold border-b-4 border-gray-200 flex justify-end">
                            Shipping{" "}
                            <span className="pr-10">
                              ${data[key]?.section5total.shipping}
                            </span>
                          </p>
                          <p className="font-bold text-2xl p-4 pr-10 flex justify-end border-b-4 border-gray-200">
                            ToTal ${data[key]?.section5total.total}USD
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
        <div className=" flex items-center  justify-end   ">
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
        <div className=" flex items-center gap-5  w-[95%] ">
          <button className=" text-2xl font-bold border text-blue-800 px-5 py-3 ml-24  rounded-full bg-white ">
            Invoices
          </button>
          {/* <button className=" text-xl font-semibold">Estimates</button>
          <button className=" text-xl font-semibold">Recurring series</button> */}
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
        <BsSearch className="absolute  ml-60 w-14 text-xl text-black   " />
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

              {Object.keys(data).map((key, index) => {
                return (
                  <tbody key={key} className="cursor-pointer">
                    <tr className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  ">
                      <td className="w-4 p-6">
                        <div className="flex items-center  ">
                          <input
                            id={`checkbox-table-${key}`}
                            type="checkbox"
                            className="w-6 h-6  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={`checkbox-table-${key}`}
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
                        <div>
                          {" "}
                          {data[key].section5total.inputuser5.invoicedate}
                        </div>
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 text-2xl font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div>
                          {" "}
                          <p>-</p>{" "}
                          <p>
                            {data[key].section5total.inputuser5.invoicenumber}
                          </p>
                        </div>
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 text-2xl font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Due {data[key].section5total.inputuser5.invoicedue}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 text-2xl font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        ${data[key].section5total.total} USD
                      </th>

                      <td className="px-6 py-4">
                        <Link
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleMenuToggle(key)}
                        >
                          <BsThreeDotsVertical className=" text-[23px] text-gray-600" />
                        </Link>
                        {isOpen === key && (
                          <ul
                            className="absolute  right-[65px] mt-2 py-2 w-48 bg-white border dark:bg-gray-800 dark:border-gray-700 rounded shadow-lg"
                            ref={menuRef}
                          >
                            <li className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700">
                              <button>{index + 1}</button>
                            </li>
                            <li className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Link to={`/addedit/${key}`}>Edit</Link>
                            </li>
                            <li className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700">
                              <button onClick={() => handleDelete(key)}>
                                Delete
                              </button>
                            </li>

                            <li
                              key={key}
                              className="px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => handlegeneratepdf(key)}
                            >
                              <button>Download PDF</button>
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
