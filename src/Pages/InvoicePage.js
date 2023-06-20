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
import { IoIosArrowUp, IoIosArrowDown, IoMdMail } from "react-icons/io";
import { BsArrowLeft, BsThreeDotsVertical, BsCamera } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

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
  invoicedate: "",
  invoicenumber: "",
};
const InvoicePage = () => {
  //hooks or States
  const [currency, setCurrency] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [showAddButton, setShowAddButton] = useState(false);
  const [showMemo, setShowMemo] = useState(false);
  const [showMemosection4, setShowMemosection4] = useState(false);
  const [subtotal, setSubtotal] = useState("$0.00");
  const [discount, setDiscount] = useState("");
  const [shipping, setShipping] = useState("");
  const [otherAmount, setOtherAmount] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [businesspopup, setBusinessPopup] = useState(false);
  const [customisepopup, setCustomisePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [lastData, setLastData] = useState(null);
  //states for customise  items
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [fields, setFields] = useState(["Item Name", "Quantity", "Price"]);
  const [fields1, setField1] = useState([]);
  const [fields2, setField2] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);
  const [selecteddescriptionFields, setSelecteddescriptionFields] = useState(
    []
  );
  const [selectedtaxFields, setSelectedtaxFields] = useState([]);
  const [selecteditemFields, setSelecteditemFields] = useState([]);
  const [customiseui, setCustomiseui] = useState(true);

  //section-3
  const [input, setInput] = useState({
    section3messege: "",
  });
  //section-5
  const [inputuser5, setInputuser5] = useState(initialState);
  //Function Calling
  ////////////////////////  input file onchange events  ///////////////////////
  //section-3
  const handleChangesection3 = (event) => {
    const section3messege = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [section3messege]: value }));
  };
  const handleInputInvoice = (event) => {
    const inputValue = event.target.value;
    setInvoiceNumber(inputValue);
  };
  //section-5

  const handleChangesection5 = (e) => {
    const { name, value } = e.target;
    setInputuser5({ ...inputuser5, [name]: value });
  };

  ///////////////////  addiding the value field onsubmit events  ///////////////////
  const handlesubmit = (e) => {
    e.preventDefault();
    handleSubmitsection3(e);
    handleSubmitsection5(e);
  };
  //section-3
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
  //section-5
  const handleSubmitsection5 = (e) => {
    e.preventDefault();
    if (!inputuser5) {
      toast.error(<div className="">Please enter the values!</div>);
    } else {
      const total = calculateTotal(); // Calculate the total value
      const section5Data = {
        inputuser5: inputuser5,
        total: total,
      };

      dataRef
        .ref()
        .child("section5")
        .push(section5Data, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Successfully added");
          }
        });
    }
  };

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

  const fileInputRef = useRef(null);
  //handle click

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFields1, selectedDescriptionFields } = location.state || {};

  const handleClick = (e) => {
    e.preventDefault();
    setShowAddButton(true);
    setLastData(lastData);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handlecurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleselectedTemplate = (event) => {
    setSelectedTemplate(event.target.value);
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Add or remove the field based on checkbox selection
    if (checked) {
      setFields((prevFields) => [...prevFields, value]);
    } else {
      setFields((prevFields) => prevFields.filter((field) => field !== value));
    }
  };
  const handleCheckboxChangedescription = (e) => {
    const { value, checked } = e.target;

    // Add or remove the field based on checkbox selection
    if (checked) {
      setField1((prevField1) => [...prevField1, value]);
    } else {
      setField1((prevField1) =>
        prevField1.filter((fields1) => fields1 !== value)
      );
    }
  };
  const handleCheckboxChangetax = (e) => {
    const { value, checked } = e.target;

    // Add or remove the field based on checkbox selection
    if (checked) {
      setField2((prevField2) => [...prevField2, value]);
    } else {
      setField2((prevField2) =>
        prevField2.filter((fields2) => fields2 !== value)
      );
    }
  };

  // Handle save button click
  const handleSaveClick = () => {
    setSelectedFields(fields);
    setSelecteddescriptionFields(fields1);
    setSelectedtaxFields(fields2);

    setCustomisePopup(false);
  };
  // Render the form fields
  const renderFields = () => {
    return fields.map((field) => (
      <div key={field}>
        <TextField
          id="outlined-search"
          type="text"
          label={field}
          style={{
            marginRight: "10px",
            width: "100%",
          }}
          name={field}
        />
      </div>
    ));
  };
  const renderFieldsdescription = () => {
    return fields1.map((fields1) => (
      <div key={fields1}>
        <textarea
          className="peer block min-h-[auto] mb-3 w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
          id="exampleFormControlTextarea1"
          rows="4"
          type="text"
          placeholder="Description(optional)"
          name={fields1}
        >
          {" "}
        </textarea>
      </div>
    ));
  };
  const renderFieldstax = () => {
    return fields2.map((fields2) => (
      <div key={fields2}>
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
            label="Select"
            defaultValue="select"
            name={fields2}
          >
            {taxes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </div>
    ));
  };

  // Render the selected fields below the form
  const renderSelectedFields = () => {
    return selectedFields.map((field) => (
      <div key={field}>
        <TextField
          id="outlined-search"
          type="text"
          label={field}
          style={{
            marginRight: "20px",
            width: "100%",
          }}
          name={field}
          className="gap-3"
        />
      </div>
    ));
  };
  const renderSelecteddescriptionFields = () => {
    return selecteddescriptionFields.map((field) => (
      <div key={field}>
        <textarea
          className="peer block min-h-[auto] mb-3 w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
          id="exampleFormControlTextarea1"
          rows="4"
          type="text"
          placeholder="Description(optional)"
          name={fields1}
          value={fields1}
          readOnly
        >
          {" "}
        </textarea>
      </div>
    ));
  };
  const renderSelectedtaxFields = () => {
    return selectedtaxFields.map((field) => (
      <div key={field}>
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
            label="Select"
            defaultValue="select"
            className=""
            name={fields2}
            value={fields2}
          >
            {taxes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </div>
    ));
  };

  const taxes = [
    {
      value: "No Tax",
      label: "No Tax",
    },
    {
      value: "Tax able",
      label: "Tax able",
    },
  ];

  /////////////////    hide and show on button click    ////////////////
  const hideshow = () => {
    setShowMemo((prevShowMemo) => !prevShowMemo);
  };
  const hideshowsection4 = () => {
    setShowMemosection4((prevshowMemosection4) => !prevshowMemosection4);
  };
  const handlecustomiseui = () => {
    setCustomiseui(false);
    handleSaveClick();
  };
  useEffect(() => {
    dataRef
      .ref()
      .child("CustomerList")
      .on("value", (snapshot) => {
        const snapshotValue = snapshot.val();
        if (snapshotValue !== null) {
          const dataKeys = Object.keys(snapshotValue);
          const lastKey = dataKeys[dataKeys.length - 1];
          setLastData(snapshotValue[lastKey]);
        } else {
          setLastData(null);
        }
        setIsLoading(false);
      });

    return () => {
      setLastData(null);
    };
  }, []);
  //current data to fetch

  //loading
  if (isLoading) {
    return (
      // <div className="text-center text-3xl text-black">
      //   Loading<span className="text-yellow-500"> . . .</span>
      // </div>
      <div className=" shadow  rounded-md p-4 w-full gap-5 flex h-screen ">
        <div className="animate-pulse flex space-x-4 w-[70%]  mt-48">
          <div className="flex-1 space-y-6 py-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-4  bg-gray-300 rounded"></div>
              <div className="h-4  bg-gray-300 rounded"></div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-4   bg-gray-300 rounded col-span-2"></div>
                <div className="h-4   bg-gray-300 rounded col-span-2"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-4  bg-gray-300 rounded"></div>
                <div className="h-4  bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className=" mt-96 space-y-3 ">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-4  bg-gray-300 rounded"></div>
              <div className="h-4  bg-gray-300 rounded"></div>
              <div className="h-4  bg-gray-300 rounded"></div>
              <div className="h-4  bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <div className="animate-pulse flex  w-[30%]  mt-48">
          <div className="flex-1 space-y-6 py-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-4  bg-gray-300 rounded"></div>
              <div className="h-4  bg-gray-300 rounded"></div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-4   bg-gray-300 rounded col-span-2"></div>
                <div className="h-4   bg-gray-300 rounded col-span-2"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-4  bg-gray-300 rounded"></div>
                <div className="h-4  bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className=" mt-96 space-y-3 ">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (lastData.length === 0) {
    return <div>No data available</div>;
  }

  //Return Statements
  return (
    <div className="mb-3 ">
      {businesspopup ? (
        <>
          <div className="w-full  mx-auto  overflow-y-hidden fixed z-20  bg-gray-200   ">
            <div className="w-[900px] bg-white border opacity-100 relative  h-screen">
              <div className="flex items-center relative  mt-4 ">
                <i className="w-full flex justify-center text-blue-600  ">
                  <FaPaypal className="text-3xl" />
                </i>
                <i
                  className="flex  justify-end pr-3 cursor-pointer"
                  onClick={() => setBusinessPopup(false)}
                >
                  <RxCross1 className="text-xl" />
                </i>
              </div>
              <p className="text-center text-[48px] mt-3 font-semibold">
                {" "}
                Business <br /> information{" "}
              </p>
              <div className="w-[70%] border mx-auto ">
                {" "}
                <div className="grid grid-cols-2 w-full  mt-3 text-center">
                  <div className="">
                    {" "}
                    <input
                      id="outlined-search"
                      name="firstname"
                      type="search"
                      className=" w-[95%]  border border-gray-400 rounded-md py-5 px-3 placeholder-black focus:border-blue-400"
                      placeholder="First name"
                    />
                  </div>
                  <div className="">
                    {" "}
                    <input
                      id="outlined-search"
                      name="lastname"
                      type="search"
                      className=" w-[95%]  border border-gray-400 rounded-md py-5 px-3 placeholder-black"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div className="flex  justify-center mt-3">
                  <input
                    id="outlined-search"
                    name="lastname"
                    type="search"
                    className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
                    placeholder="Business name"
                  />
                </div>
                <div className="flex  justify-center mt-3">
                  <input
                    id="outlined-search"
                    name="lastname"
                    type="text"
                    className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
                    placeholder="Website"
                  />
                </div>
                <div className="flex  justify-center mt-3">
                  <input
                    id="outlined-search"
                    name="lastname"
                    type="text"
                    className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
                    placeholder="TIN / PIN"
                  />
                </div>
                <div className="flex  justify-center mt-3">
                  <input
                    id="outlined-search"
                    name="lastname"
                    type="text"
                    className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
                    placeholder="Additional information"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {customisepopup ? (
        <>
          <div className=" overflow-y-hidden  w-full h-full flex justify-center fixed z-20  bg-gray-200   ">
            <div className="bg-white h-auto  w-[70%] mx-auto  relative border">
              <div className="flex items-center relative  mt-4">
                <i className="w-full flex justify-center text-blue-600  ">
                  <FaPaypal className="text-3xl" />
                </i>
                <i
                  className="flex  justify-end pr-3 cursor-pointer"
                  onClick={() => setCustomisePopup(false)}
                >
                  <RxCross1 className="text-xl" />
                </i>
              </div>
              <p className="text-center text-3xl mt-3 font-semibold">
                {" "}
                Customise items
              </p>

              <form>
                <p className=" mt-3 pl-8 text-lg font-bold  mb-2">Preview</p>
                <Box sx={{ width: "40%", paddingLeft: "30px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="template-select-label">
                      Choose Type
                    </InputLabel>

                    <Select
                      labelId="template-select-label"
                      id="template-select"
                      value={selectedTemplate}
                      label="Choose Type"
                      onChange={handleselectedTemplate}
                    >
                      <MenuItem value="template1">Amounts only</MenuItem>
                      <MenuItem value="template2">Hours</MenuItem>
                      <MenuItem value="template3">Quantity</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <div className="h-auto w-[95%] mx-auto mt-3 border-2 border-gray-300 rounded-xl">
                  <div className="p-3   ">
                    <div className="   flex items-center ">
                      <div className="flex gap-4">
                        {renderFields()}
                        {renderFieldstax()}
                      </div>
                    </div>
                    <div>{renderFieldsdescription()}</div>
                  </div>
                </div>
                <div className="w-[97%] p-5  mx-auto mt-5">
                  <p className="text-lg font-semibold text-gray-700">
                    Choose item field
                  </p>
                  <div>
                    <input
                      type="checkbox"
                      value="Discount"
                      className="mt-5 h-5 w-5 "
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor="Item"
                      className="text-lg font-semibold text-gray-700"
                    >
                      {" "}
                      Discount
                    </label>
                    <br />
                    <input
                      type="checkbox"
                      value="Tax"
                      className="mt-5 h-5 w-5 "
                      onChange={handleCheckboxChangetax}
                    />
                    <label
                      htmlFor="Item"
                      className="text-lg font-semibold text-gray-700"
                    >
                      {" "}
                      Tax
                    </label>
                    <br />
                    <input
                      type="checkbox"
                      value="date"
                      className="mt-5 h-5 w-5 "
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor="Item"
                      className="text-lg font-semibold text-gray-700"
                    >
                      {" "}
                      Date
                    </label>
                    <br />
                    <input
                      type="checkbox"
                      value="description"
                      className="mt-5 h-5 w-5 "
                      onChange={handleCheckboxChangedescription}
                    />
                    <label
                      htmlFor="Item"
                      className="text-lg font-semibold text-gray-700"
                    >
                      {" "}
                      description
                    </label>
                  </div>
                </div>{" "}
              </form>
              <div className="text-center pb-10">
                <button
                  className="px-8 py-3 rounded-3xl  bg-blue-900 text-white font-bold mx-auto "
                  type="submit"
                  onClick={handlecustomiseui}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className="grid grid-cols-2 h-40 ">
        <div className="  ">
          <div className="pt-8 pl-3  flex items-center">
            <button
              onClick={() => {
                navigate("/addedlist");
              }}
            >
              <BsArrowLeft className="text-2xl cursor-pointer " />
            </button>

            <span
              className="font-bold text-blue-600 text-lg pl-2 cursor-pointer "
              onClick={() => {
                navigate("/addedlist");
              }}
            >
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
              onClick={handlesubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="flex   w-[97%]  mx-auto gap-5  ">
        <div className="w-[75%]">
          <div className="border  h-auto rounded-xl bg-white ">
            {/*===================================   section-1  =============================== */}
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
                    value={lastData && lastData.email}
                  />
                  {showAddButton && (
                    <>
                      {lastData && (
                        <button className="px-4 py-2 bg-white text-blue-700 rounded-full border mt-2 flex items-center gap-2 ">
                          {lastData.email} <RxCross1 />
                        </button>
                      )}
                      <button
                        className="mt-3 px-4 py-2 rounded bg-blue-900 text-white font-semibold"
                        onClick={() => {
                          navigate("/addcustomer");
                        }}
                      >
                        Add Customer
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
            {/*==================================  section-2  =============================== */}
            <form>
              <div className="p-3 ">
                <div className="flex items-center pl-3 pt-20">
                  <p className="font-bold text-xl ml-3">Items</p>
                  <button
                    className=" text-blue-500 text-xl font-bold  rounded-full w-full flex justify-end items-center mr-3"
                    onClick={(event) => {
                      event.preventDefault();
                      setCustomisePopup(true);
                    }}
                  >
                    <MdModeEditOutline className="mr-1" /> Customise
                  </button>
                </div>

                <div className="h-auto  w-[97%] mt-4  border-2 rounded-xl mx-auto  ">
                  {customiseui ? (
                    <Customiseui1 />
                  ) : (
                    <div className="p-3   ">
                      <div className="   flex items-center gap-5 ">
                        {renderSelectedFields()}
                        {renderSelectedtaxFields()}
                      </div>
                      <div> {renderSelecteddescriptionFields()}</div>
                    </div>
                  )}
                </div>

                <button className="text-bold ml-4 mt-3 text-blue-600  font-bold flex items-center text-xl ">
                  <AiOutlinePlus className="mr-2" /> Add items or Service
                </button>
              </div>
            </form>

            {/*  ==============================  section-3  ============================= */}
            <form onSubmit={handleSubmitsection3}>
              <div className="p-3">
                <p className="font-bold text-xl ml-5">Message To Customer</p>
                <div className=" mb-2" data-te-input-wrapper-init>
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
            {/*===================================  section-4  =================================*/}

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

        <div className=" w-[25%]  text-center ">
          <form onSubmit={handleSubmitsection5}>
            <div className="h-[200px] border rounded-xl bg-white">
              <div className="flex items-center h-20   w-full">
                <div>
                  <input
                    type="file"
                    placeholder="Add logo"
                    className="px-3 py-4"
                  />
                </div>
                <div>
                  <button
                    className=" flex justify-end  ml-10 "
                    onClick={hideshowsection4}
                  >
                    {" "}
                    {showMemosection4 ? (
                      <IoIosArrowUp className="text-2xl  text-gray-500" />
                    ) : (
                      <IoIosArrowDown className="text-2xl  text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                {lastData && (
                  <div className="text-2xl text-black flex items-center pl-2 gap-3">
                    <span>
                      <IoMdMail className="text-blue-900" />
                    </span>
                    <span className="text-[20px]">{lastData.email}</span>
                  </div>
                )}
                {showMemosection4 && (
                  <div className="flex items-center mt-5  h-full     ">
                    <button className="text-blue-600 w-full text-lg  font-bold">
                      Add Logo |
                    </button>
                    <button
                      className="text-blue-600 w-full    text-lg font-bold"
                      onClick={() => setBusinessPopup(true)}
                    >
                      Edit Business Information
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="h-[700px] border rounded-xl bg-white mt-4 pt-8 ">
              <Box
                component=""
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
                  type="number"
                  id="outlined-uncontrolled"
                  label="Invoice Number"
                  name="invoicenumber"
                  value={invoiceNumber}
                  onChange={handleChangesection5}
                />
              </Box>
              <input
                type="date"
                name="invoicedate"
                className="p-4 border flex items-start ml-6 border-gray-300"
                onChange={handleChangesection5}
              />{" "}
              <select
                id="dropdown-select"
                className="w-[90%] py-4 mt-2 px-3 text-base border border-gray-500 rounded-md box-border"
                onChange={handleChangesection5}
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
          </form>
        </div>
      </div>
    </div>
  );
};
const Customiseui1 = () => {
  const [textareaValue, setTextareaValue] = useState("");

  const currencies = [
    {
      value: "No Tax",
      label: "No Tax",
    },
    {
      value: "Tax able",
      label: "Tax able",
    },
  ];
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center mx-auto  w-[97%] mt-3 ">
        <TextField
          id="outlined-search"
          label="Item Name"
          type="text"
          style={{
            marginLeft: "",
            width: "25%",
          }}
        />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "70%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-uncontrolled"
            label="Quantity"
            defaultValue="1"
          />
        </Box>
        <TextField
          id="outlined-search"
          label="Price"
          type="search"
          style={{
            marginLeft: "",
            width: "25%",
          }}
        />
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
            label="Select"
            defaultValue="select"
            className=""
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </div>
      <textarea
        className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mb-4 mt-5 text-black px-3 py-[0.32rem]"
        id="exampleFormControlTextarea1"
        rows="5"
        placeholder="Description(optional)"
        value={textareaValue}
        onChange={handleTextareaChange}
      ></textarea>
    </div>
  );
};

export default InvoicePage;
