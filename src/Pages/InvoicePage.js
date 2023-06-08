//Reactjs Library imports
import * as React from "react";
import { useState, useRef, useEffect } from "react";
//materialUI imports
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
//Reacticons
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { RxDividerVertical } from "react-icons/rx";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { BsArrowLeft, BsThreeDotsVertical, BsCamera } from "react-icons/bs";
//Reat Router Dom
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//toast
import { dataRef } from "../firebase-config";
import { toast } from "react-toastify";
// import currencies json
import Currencydata from "../json file/currencies.json";
import days from "../json file/days.json";

const initialState = {
  invoicedue: "",
  invoicenumber: "",
  invoicedate: "",
};
const InvoicePage = () => {
  //hooks or States
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [currency, setCurrency] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [showAddButton, setShowAddButton] = useState(false);
  const [showAddTax, setShowAddTax] = useState(false);
  const [showMemo, setShowMemo] = useState(false);
  const [data, setData] = useState(0);
  const [inputuser, setInputuser] = useState(initialState);
  const [subtotal, setSubtotal] = useState("$0.00");
  const [discount, setDiscount] = useState("");
  const [shipping, setShipping] = useState("");
  const [otherAmount, setOtherAmount] = useState("");
  const [total, setTotal] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  //section-3
  const [input, setInput] = useState({
    section3messege: "",
  });

  //Function Calling
  const { invoicenumber, invoicedate, invoicedue } = inputuser;
  //input file onchange events
  const handleChangesection3 = (event) => {
    const section3messege = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [section3messege]: value }));
  };
  const handleInputInvoice = (event) => {
    const inputValue = event.target.value;
    setInvoiceNumber(inputValue);
  };
  // const handleinputinvoice = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...inputuser, [name]: value });
  // };
  const handleinputinvoice = (event) => {
    const title = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [title]: value }));
  };
  //addiding the value field
  const handleAdd = (section) => {
    const value = prompt("Enter the value:");
    if (value) {
      switch (section) {
        case "discount":
          setDiscount(value);
          break;
        case "shipping":
          setShipping(value);
          break;
        case "otherAmount":
          setOtherAmount(value);
          break;
        default:
          break;
      }
    }
  };
  useEffect(() => {}, [discount]);

  useEffect(() => {}, [shipping]);

  useEffect(() => {}, [otherAmount]);
  const calculateTotal = () => {
    const discountValue = parseFloat(discount) || 0;
    const shippingValue = parseFloat(shipping) || 0;
    const otherAmountValue = parseFloat(otherAmount) || 0;

    return discountValue + shippingValue + otherAmountValue;
  };
  //submit the form
  // const handlesubmit5 = (e) => {
  //   e.preventDefault();
  //   if (!invoicenumber || !invoicedate || !invoicedue) {
  //     toast.error(<div className="">Please enter the values!</div>);
  //   } else {
  //     dataRef
  //       .ref()
  //       .child("dataofusers")
  //       .push(inputuser, (err) => {
  //         if (err) {
  //           toast.error(err);
  //         } else {
  //           toast.success("Successfully added");
  //         }
  //       });
  //   }
  // };

  const handleSubmitsection3 = (e) => {
    e.preventDefault();
    if (!input) {
      toast.error(<div className="">Please enter the values!</div>);
    } else {
      dataRef
        .ref()
        .child("section3")
        .push(input, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Successfully added");
          }
        });
    }
  };
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    // Do something with the selected files
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFields, selectedDescriptionFields } = location.state || {};

  const handleClick = () => {
    setShowAddButton(true);
  };
  const handleClickTax = () => {
    setShowAddTax(true);
  };
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleselectedTemplate = (event) => {
    setSelectedTemplate(event.target.value);
  };
  const handlecurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const hideshow = () => {
    setShowMemo((prevShowMemo) => !prevShowMemo);
  };

  const Tax = [
    {
      value: "No Tax",
      label: "No Tax",
    },
    {
      value: "Tax able",
      label: "Tax able",
    },
  ];

  //Return Statements
  return (
    <div className="mb-3 ">
      <div className="grid grid-cols-2 h-40 ">
        <div className="  ">
          <div className="pt-8 pl-3  flex items-center">
            <button
              onClick={() => {
                navigate("/addedlist");
              }}
            >
              <BsArrowLeft
                className="text-2xl cursor-pointer "
                // onClick={navigate("/")}
              />
            </button>

            <span className="font-bold text-blue-600 text-lg pl-2 ">
              Back to invoice
            </span>
          </div>

          <p className="pl-3 text-[43px] font-semibold mt-1">
            New invoice No. {invoiceNumber}
          </p>
        </div>
        <div className=" flex items-center  justify-end ">
          <div className="flex items-center ">
            <BsThreeDotsVertical className="mr-8 text-[23px] text-gray-600" />

            <BsCamera className="mr-8 text-xl text-gray-600" />
            <button
              className="text-white bg-[#003087] px-9 py-3   mr-5 rounded-full    font-extrabold text-lg"
              type="submit"
              onClick={handleSubmitsection3}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="flex   w-[97%]  mx-auto gap-5  ">
        <div className="w-[75%]">
          <div className="border  h-auto rounded-xl bg-white ">
            {/* section-1 */}
            <form>
              <div className="">
                <div className="  flex justify-end w-full mt-3 pr-4">
                  <Box sx={{ minWidth: 150, marginRight: "20px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="template-select-label">
                        Templete
                      </InputLabel>

                      <Select
                        labelId="template-select-label"
                        id="template-select"
                        value={selectedTemplate}
                        label="Templete"
                        onChange={handleselectedTemplate}
                      >
                        <MenuItem
                          value="template1 "
                          onClick={() => {
                            navigate("/amountsonly");
                          }}
                        >
                          Amounts only
                        </MenuItem>
                        <MenuItem
                          value="template2"
                          onClick={() => {
                            navigate("/hours");
                          }}
                        >
                          Hours
                        </MenuItem>
                        <MenuItem
                          value="template3"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          Quantity{" "}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="currency-select-label">
                        Currency
                      </InputLabel>

                      <Select
                        labelId="currency-select-label"
                        id="currency-select"
                        value={currency}
                        label="Currency"
                        onChange={handlecurrency}
                      >
                        <MenuItem value="">None</MenuItem>
                        {Currencydata.map((codes, index) => (
                          <MenuItem value={codes.code} key={index}>
                            {codes.code}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <hr className="mt-3 w-[97%] mx-auto" />
                <div className="flex items-center p-3 ml-5">
                  <p className="font-bold text-xl">Bill To</p>
                  <button className="rounded-full bg-[#003087] px-3 py-1 text-white font-bold ml-3">
                    invoice single customer
                  </button>
                  <button className="rounded-full border-2 border-[#003087]  px-3 py-1 text-[#003087] font-bold ml-3">
                    invoice multiple customer
                  </button>
                </div>
                <div className="mx-auto w-[97%] ">
                  <input
                    id="outlined-required"
                    className="w-full mt-3 py-4 px-3 border border-gray-500 rounded-md"
                    type="text"
                    placeholder="Email address or name"
                    onClick={handleClick}
                  />
                  {showAddButton && (
                    <button
                      className="mt-3 px-4 py-2 rounded bg-blue-900 text-white font-semibold"
                      onClick={() => {
                        navigate("/addcustomer");
                      }}
                    >
                      Add Customer
                    </button>
                  )}
                </div>
              </div>
            </form>
            {/* section-2 */}
            <form>
              <div className="p-3 ">
                <div className="flex items-center pl-3 pt-20">
                  <p className="font-bold text-xl ml-3">Items</p>
                  <button
                    className=" text-blue-500 text-xl font-bold  rounded-full w-full flex justify-end items-center mr-3"
                    onClick={() => navigate("/customise")}
                  >
                    <MdModeEditOutline className="mr-1" /> Customise
                  </button>
                </div>
                <div className="h-auto  w-[97%] mt-4  border-2 rounded-xl mx-auto  ">
                  <div className="flex items-center mx-auto  w-[97%] mt-3">
                    {selectedFields}
                    {selectedDescriptionFields}
                  </div>
                </div>

                <button
                  className="text-bold ml-4 mt-3 text-blue-600  font-bold flex items-center text-xl "
                  onClick={() => navigate("/additems")}
                >
                  <AiOutlinePlus className="mr-2" /> Add items or Service
                </button>
              </div>
            </form>
            {/* section-3 */}
            <form onSubmit={handleSubmitsection3}>
              <div className="p-3">
                <p className="font-bold text-xl ml-5">Message To Customer</p>
                <div className="relative mb-2" data-te-input-wrapper-init>
                  <textarea
                    className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
                    id="exampleFormControlTextarea1"
                    rows="6"
                    value={input.section3messege}
                    name="section3messege"
                    placeholder="Seller note to customer"
                    onChange={handleChangesection3}
                  >
                    {" "}
                  </textarea>
                  <div className="flex items-center ml-5 ">
                    <button className="text-bold  mt-3 text-blue-600  font-bold flex items-center text-xl ">
                      Add terms and conditions
                    </button>

                    <button className="text-bold  ml-1 mt-3 text-blue-600  font-bold flex items-center text-xl ">
                      <RxDividerVertical className="text-black flex item-center text-xl" />{" "}
                      Add reference number
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {/* section-4 */}

            <div className="  p-3 mt-10 ">
              <div className="flex items-center">
                <p className=" text-[27px]  ml-3 font-semibold w-full">
                  More Options
                </p>
                <button onClick={hideshow}>
                  {" "}
                  {showMemo ? (
                    <IoIosArrowUp className="text-2xl text-gray-500" />
                  ) : (
                    <IoIosArrowDown className="text-2xl text-gray-500" />
                  )}
                </button>
              </div>
              <hr className="mt-3 w-[98%] mx-auto" />
              <div className="  ">
                {showMemo && (
                  <div>
                    <div className="">
                      <p className="text-xl p-3 ml-1 font-bold">Attachments</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="files"
                        id="files"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <button
                        type="button"
                        className="text-[#003087] ml-3 font-bold border-2 border-[#003087] px-4 py-1 rounded-full text-sm"
                        onClick={handleButtonClick}
                      >
                        Upload files
                      </button>
                      <p className="text-sm font-semibold p-3 text-gray-800">
                        JPG GIF PNG PDF | Up to 5 files , 4MB per file
                      </p>
                    </div>
                    <div className=" p-3 mt-10 mb-4">
                      <p className="font-bold text-xl ml-2">Memo To Self</p>
                      <div className=" mb-2">
                        <textarea
                          className="peer block min-h-[auto] placeholder-gray-500  w-[98%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
                          rows="6"
                          placeholder="Memo"
                          value={textareaValue}
                          onChange={handleTextareaChange}
                        >
                          {" "}
                        </textarea>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className=" w-[25%] text-center ">
          <div className="h-[200px] border rounded-xl bg-white">1</div>
          <div className="h-[700px] border rounded-xl bg-white mt-4 pt-8 ">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "90%" },
              }}
              noValidate
              autoComplete="off"
              className="flex items-start pl-4"
              name="invoicenumber"
              value={invoiceNumber.invoiceNumber}
              onChange={handleInputInvoice}
            >
              <TextField
                id="outlined-uncontrolled"
                label="Invoice Number"
                name="invoicenumber"
                value={invoiceNumber}
                onChange={handleInputInvoice}
              />
            </Box>
            <input
              type="date"
              name="invoicedate"
              className="p-4 border flex items-start ml-6 border-gray-300"
            />{" "}
            <select
              id="dropdown-select"
              className="w-[90%] py-4 mt-2 px-3 text-base border border-gray-500 rounded-md box-border"
              onChange={handleinputinvoice}
              name="invoicedue"
              value={initialState.invoicedue}
            >
              <option defaultValue disabled value="">
                ---select Due---
              </option>
              {days.map((days, index) => (
                <option key={index}>{days.value}</option>
              ))}
            </select>
            <div className="mx-auto mt-3 border h-[350px] grid grid-cols-2">
              <div>
                <p className="font-semibold w-full text-lg p-3">Subtotal </p>
                <p className="font-semibold text-lg p-3">Other Discounts </p>
                <p className="font-semibold text-lg p-3">Shipping </p>
                <p className="font-semibold text-lg p-3">Other Amount </p>
                <p className="font-bold text-lg p-3">
                  Total{" "}
                  <span className="text-sm text-blue-500 font-bold">
                    (Tax Excl.)
                  </span>{" "}
                </p>
              </div>
              <div className="">
                <p className="p-3">{subtotal}</p>
                <p className="p-3">
                  {discount ? (
                    discount
                  ) : (
                    <button
                      className=" text-blue-600 rounded-xl text-lg font-bold not-italic cursor-pointer"
                      onClick={() => handleAdd("discount")}
                    >
                      Add
                    </button>
                  )}
                </p>
                <p className="p-4 ">
                  {shipping ? (
                    shipping
                  ) : (
                    <button
                      className=" text-blue-600 rounded-xl text-lg font-bold not-italic cursor-pointer"
                      onClick={() => handleAdd("shipping")}
                    >
                      Add
                    </button>
                  )}
                </p>
                <p className="p-4">
                  {otherAmount ? (
                    otherAmount
                  ) : (
                    <button
                      className=" text-blue-600 rounded-xl text-lg font-bold not-italic cursor-pointer"
                      onClick={() => handleAdd("otherAmount")}
                    >
                      Add
                    </button>
                  )}
                </p>
                <p className="p-3 font-bold">$ {calculateTotal()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
