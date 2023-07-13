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
import { FaPaypal, FaRegAddressCard } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { CgWebsite } from "react-icons/cg";

//Reat Router Dom
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//toast
import { dataRef } from "../firebase-config";
import { toast } from "react-toastify";
// import currencies json
import Currencydata from "../json file/currencies.json";
import days from "../json file/days.json";
import { useReducer } from "react";

const initialState = {
  items: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

const Usereducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
  const [showDiscountField, setShowDiscountField] = useState(false);
  const [showShippingField, setShowShippingField] = useState(false);
  const [showOtherAmountField, setShowOtherAmountField] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [businesspopup, setBusinessPopup] = useState(false);
  const [customisepopup, setCustomisePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastData, setLastData] = useState(null);

  //states for customise  items
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [fields, setFields] = useState(["ItemName", "Quantity", "Price"]);
  const [fields1, setField1] = useState(["description"]);
  const [fields2, setField2] = useState([]);
  const [fields3, setField3] = useState([]);
  const [fields4, setField4] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selecteddescriptionFields, setSelecteddescriptionFields] = useState(
    []
  );
  const [selectedtaxFields, setSelectedtaxFields] = useState([]);
  const [selecteddateFields, setSelecteddateFields] = useState([]);
  const [selecteddiscountFields, setSelecteddiscountFields] = useState([]);
  const [selecteditemFields, setSelecteditemFields] = useState([]);
  const [customiseui, setCustomiseui] = useState(true);

  //image state
  const [selectedImage, setSelectedImage] = useState(null);
  //hide and show of main page
  const [isVisibleinvoicepage, setIsVisibleinvoicepage] = useState(true);
  const [isVisibleaccount, setIsVisibleaccount] = useState(null);
  const [isVisiblehours, setIsVisiblehours] = useState(null);
  //hide and show of customize
  const [isVisiblecustomiseinvoicepage, setVisiblecustomiseinvoicepage] =
    useState(true);
  const [isVisiblecustomiseaccount, setVisiblecustomiseaccount] =
    useState(null);
  const [isVisiblecustomisehours, setVisiblecustomisehours] = useState(null);

  //section-2
  const [inputuser2, setInputuser2] = useState({
    ItemName: "",
    quantity: 0,
    price: 0,
    description: "",
    tax: "",
    discount: 0,
    itemnamehours: "",
    hours: 0,
    rate: 0,
    itemnameaccount: "",
  });

  const { ItemName, quantity, price, description } = inputuser2;

  const [additem, setAdditem] = useState([]);

  //Function Calling
  ////////////////////////  input file onchange events  ///////////////////////
  //section-1

  //section-2
  const handleChangesection2 = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    console.log(fieldName, value); // Check if the values are being received correctly
    setInputuser2((values) => ({ ...values, [fieldName]: value }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const section2Result = handleSubmitsection2(e);

    if (section2Result) {
      navigate("/");
    } else {
      toast.error("Please fill in all the required fields.");
    }
  };

  const handleSubmitsection2 = (e) => {
    e.preventDefault();
    console.log(inputuser2);

    if (!inputuser2) {
      // Handle error when any of the fields are empty
      // toast.error("Please fill in all the fields");
    } else {
      dataRef
        .ref()
        .child("section2")
        .push(inputuser2, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Successfully added");
          }
        });
    }
  };
  //   const handleAddItem = () => {
  //     // Create a new item object here or modify as per your requirement
  //     const newItem = {
  //       id: Math.random().toString(),
  //       name: "New Item",
  //     };

  //     dispatch({ type: "ADD_ITEM", payload: newItem });
  //   };
  const handleAddItem = () => {
    // Get form values here or modify as per your requirement
    const newItem = {
      id: Math.random().toString(),
      formId: 1, // Assign a unique formId for the new item
      name: "New Item",
      // Include other form values here
    };

    dispatch({ type: "ADD_ITEM", payload: newItem });
  };

  //   const renderItems = () => {
  //     return additem.map((item, index) => (
  //       <div key={index} className="">
  //         <div className="flex gap-4">{additems(item)}</div>
  //       </div>
  //     ));
  //   };

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

  const handleClick = (e) => {
    e.preventDefault();
    setShowAddButton(true);
    setLastData(lastData);
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
  const handleCheckboxChangediscount = (e) => {
    const { value, checked } = e.target;

    // Add or remove the field based on checkbox selection
    if (checked) {
      setField3((prevField3) => [...prevField3, value]);
    } else {
      setField3((prevField3) =>
        prevField3.filter((fields3) => fields3 !== value)
      );
    }
  };
  const handleCheckboxChangedate = (e) => {
    const { value, checked } = e.target;

    // Add or remove the field based on checkbox selection
    if (checked) {
      setField4((prevField4) => [...prevField4, value]);
    } else {
      setField4((prevField4) =>
        prevField4.filter((fields4) => fields4 !== value)
      );
    }
  };

  // Handle save button click
  const handleSaveClick = () => {
    setSelectedFields(fields);
    setSelecteddescriptionFields(fields1);
    setSelectedtaxFields(fields2);
    setSelecteddiscountFields(fields3);
    setSelecteddateFields(fields4);
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
          name={field.toLowerCase()}
          onChange={handleChangesection2}
        />
      </div>
    ));
  };
  const renderFieldsdescription = () => {
    return fields1.map((fields1) => (
      <div key={fields1}>
        <textarea
          className="peer block h-auto mb-3 w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
          id="exampleFormControlTextarea1"
          rows="4"
          type="text"
          placeholder="Description(optional)"
          name="description"
          onChange={handleChangesection2}
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
            name="tax"
            onChange={handleChangesection2}
            value={inputuser2.tax}
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
  const renderFieldsdiscount = () => {
    return fields3.map((fields3) => (
      <div key={fields3}>
        <TextField
          id="outlined-search"
          type="text"
          label="Discount"
          style={{
            marginRight: "10px",
            width: "100%",
          }}
          name={discount}
          onChange={handleChangesection2}
        />
      </div>
    ));
  };
  const renderFieldsdate = () => {
    return fields4.map((fields4) => (
      <div key={fields4}>
        <TextField
          id="outlined-search"
          type="date"
          style={{
            marginRight: "10px",
            width: "100%",
          }}
          onChange={handleChangesection2}
        />
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
          className="gap-3"
          name={field.toLowerCase()}
          onChange={handleChangesection2}
        />
      </div>
    ));
  };
  const renderSelecteddescriptionFields = () => {
    return selecteddescriptionFields.map((field) => (
      <div key={field}>
        <textarea
          className="peer block h-auto mb-3 w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
          id="exampleFormControlTextarea1"
          rows="4"
          type="text"
          placeholder="Description(optional)"
          name="description"
          onChange={handleChangesection2}
        >
          {" "}
        </textarea>
      </div>
    ));
  };
  const renderSelecteddiscountFields = () => {
    return selecteddiscountFields.map((field) => (
      <div key={field}>
        <TextField
          id="outlined-search"
          type="text"
          label="Discount"
          name="discount"
          style={{
            marginRight: "10px",
            width: "100%",
          }}
          onChange={handleChangesection2}
        />
      </div>
    ));
  };
  const renderSelecteddateFields = () => {
    return selecteddateFields.map((field) => (
      <div key={field}>
        <TextField
          id="outlined-search"
          type="date"
          name="date"
          style={{
            marginRight: "10px",
            width: "100%",
          }}
          onChange={handleChangesection2}
        />
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
            name="tax"
            onChange={handleChangesection2}
            value={inputuser2.tax}
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
  //vibilities for ui of different type pages
  const toggleVisibilityofamounts = () => {
    setIsVisibleaccount(true);
    setIsVisiblehours(false);
    setIsVisibleinvoicepage(false);
  };
  const toggleVisibilityofhours = () => {
    setIsVisibleaccount(false);
    setIsVisiblehours(true);
    setIsVisibleinvoicepage(false);
  };

  const toggleVisibilityofQuantity = () => {
    setIsVisibleaccount(false);
    setIsVisiblehours(false);
    setIsVisibleinvoicepage(true);
  };
  //customise ui for display
  const toggleVisibilityofcustomiseamounts = () => {
    setVisiblecustomiseaccount(true);
    setVisiblecustomiseinvoicepage(false);
    setVisiblecustomisehours(false);
  };
  const toggleVisibilityofcustomisehours = () => {
    setVisiblecustomisehours(true);
    setVisiblecustomiseaccount(false);
    setVisiblecustomiseinvoicepage(false);
  };

  const toggleVisibilityofcustomiseQuantity = () => {
    setVisiblecustomiseinvoicepage(true);
    setVisiblecustomisehours(false);
    setVisiblecustomiseaccount(false);
  };

  //fetched data

  //loading

  //logo image

  //handle add items

  //   const additems = (e) => {
  //     return (
  //       <div className="h-auto  w-[95%] mt-4  border-2 rounded-xl mx-auto  ">
  //         {customiseui ? (
  //           <div className="p-3   ">
  //             <div className="   flex items-center ">
  //               <div className="flex gap-4">
  //                 {renderFields()}
  //                 {renderFieldstax()}
  //                 {renderFieldsdate()}
  //               </div>
  //             </div>
  //             <div>{renderFieldsdescription()}</div>
  //           </div>
  //         ) : (
  //           <div className="p-3   ">
  //             <div className="   flex items-center gap-5 ">
  //               {renderSelectedFields()}
  //               {renderSelectedtaxFields()}
  //             </div>
  //             <div> {renderSelecteddescriptionFields()}</div>
  //           </div>
  //         )}
  //         <div className="flex justify-end pr-7 pb-3">
  //           <>
  //             <p className="font-bold text-md">Amounts: $</p>
  //           </>
  //         </div>
  //       </div>
  //     );
  //   };

  //Return Statements
  return (
    <div className="mb-3 ">
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
                      <MenuItem
                        value="template1"
                        onClick={toggleVisibilityofcustomiseamounts}
                      >
                        Amounts only
                      </MenuItem>
                      <MenuItem
                        value="template2"
                        onClick={toggleVisibilityofcustomisehours}
                      >
                        Hours
                      </MenuItem>
                      <MenuItem
                        value="template3"
                        onClick={toggleVisibilityofcustomiseQuantity}
                      >
                        Quantity
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <div className="h-auto w-[95%] mx-auto mt-3 border-2 border-gray-300 rounded-xl">
                  <div className="p-3   ">
                    {isVisiblecustomiseaccount && (
                      <>
                        {" "}
                        <div className="flex items-center mx-auto  w-[97%] mt-3 gap-10">
                          <TextField
                            id="outlined-search"
                            label="Item Name"
                            type="search"
                            style={{
                              width: "75%",
                            }}
                          />

                          <TextField
                            id="outlined-search"
                            label="Price"
                            type="search"
                            style={{
                              width: "35%",
                            }}
                          />

                          {renderFieldstax()}
                          {renderFieldsdiscount()}
                          {renderFieldsdate()}
                        </div>
                      </>
                    )}
                    {isVisiblecustomisehours && (
                      <>
                        <div className="flex items-center mx-auto  w-[97%] mt-3 gap-10">
                          <TextField
                            id="outlined-search"
                            label="Item Name"
                            type="search"
                            style={{
                              width: "50%",
                            }}
                          />
                          <TextField
                            id="outlined-uncontrolled"
                            label="Hours"
                            defaultValue="0"
                            style={{
                              width: "20%",
                            }}
                          />

                          <TextField
                            id="outlined-search"
                            label="Rate"
                            type="search"
                            style={{
                              width: "25%",
                            }}
                          />
                          {renderFieldstax()}
                          {renderFieldsdate()}
                          {renderFieldsdiscount()}
                        </div>

                        <textarea
                          className="peer block h-auto w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]"
                          id="exampleFormControlTextarea1"
                          rows="5"
                          placeholder="Description(optional)"
                          value={textareaValue}
                        ></textarea>
                      </>
                    )}
                    {isVisiblecustomiseinvoicepage && (
                      <>
                        {" "}
                        <div className="   flex items-center ">
                          <div className="flex gap-4">
                            {renderFields()}
                            {renderFieldstax()}
                            {renderFieldsdate()}
                            {renderFieldsdiscount()}
                          </div>
                        </div>
                        <div>{renderFieldsdescription()}</div>
                      </>
                    )}
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
                      onChange={handleCheckboxChangediscount}
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
                      onChange={handleCheckboxChangedate}
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
                navigate("/");
              }}
            >
              <BsArrowLeft className="text-2xl cursor-pointer " />
            </button>

            <span
              className="font-bold text-blue-600 text-lg pl-2 cursor-pointer "
              onClick={() => {
                navigate("/");
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
            <div className="">
              <div className="  flex justify-end w-full mt-3 pr-4">
                <Box sx={{ minWidth: 150, marginRight: "20px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="template-select-label">Templete</InputLabel>

                    <Select
                      labelId="template-select-label"
                      id="template-select"
                      value={selectedTemplate}
                      label="Templete"
                      onChange={handleselectedTemplate}
                    >
                      <MenuItem
                        value="template1 "
                        onClick={toggleVisibilityofamounts}
                      >
                        Amounts only
                      </MenuItem>
                      <MenuItem
                        value="template2"
                        onClick={toggleVisibilityofhours}
                      >
                        Hours
                      </MenuItem>
                      <MenuItem
                        value="template3"
                        onClick={toggleVisibilityofQuantity}
                      >
                        Quantity{" "}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="currency-select-label">Currency</InputLabel>

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
              </div>
            </div>
            {/*==================================  section-2  =============================== */}
            {isVisibleinvoicepage && (
              <>
                <div className="p-3 ">
                  <form onSubmit={handleSubmitsection2}>
                    <div className="flex items-center pl-3 pt-20">
                      <p className="font-bold text-xl w-full ml-3">Items</p>
                      <button
                        className=" text-blue-500 text-xl font-bold  rounded-full  flex justify-end items-center mr-3"
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
                        <div className="p-3   ">
                          <div className="   flex items-center ">
                            <div className="flex gap-4">
                              {renderFields()}
                              {renderFieldstax()}
                              {renderFieldsdiscount()}
                            </div>
                          </div>
                          <div>{renderFieldsdescription()}</div>
                        </div>
                      ) : (
                        <div className="p-3   ">
                          <div className="   flex items-center gap-5 ">
                            {renderSelectedFields()}
                            {renderSelectedtaxFields()}
                            {renderSelecteddiscountFields()}
                            {renderSelecteddateFields()}
                          </div>
                          <div> {renderSelecteddescriptionFields()}</div>
                        </div>
                      )}
                      <div className="flex justify-end pr-7 pb-3">
                        {inputuser2 && (
                          <>
                            <p className="font-bold text-md">
                              Amounts: $
                              {inputuser2.discount
                                ? (inputuser2.price *
                                    inputuser2.quantity *
                                    inputuser2.discount) /
                                  100
                                : inputuser2.price * inputuser2.quantity}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    {/* {renderItems()} */}
                  </form>
                  <button
                    className="text-bold ml-4 mt-3 text-blue-600  font-bold flex items-center text-xl "
                    onClick={handleAddItem}
                  >
                    <AiOutlinePlus className="mr-2" /> Add items or Service
                  </button>
                  {state.items.map((item) => (
                    <div key={item.id}>
                      {" "}
                      {customiseui ? (
                        <div className="p-3   ">
                          <div className="   flex items-center ">
                            <div className="flex gap-4">
                              {renderFields()}
                              {renderFieldstax()}
                              {renderFieldsdate()}
                              {renderFieldsdiscount()}
                            </div>
                          </div>
                          <div>{renderFieldsdescription()}</div>
                        </div>
                      ) : (
                        <div className="p-3   ">
                          <div className="   flex items-center gap-5 ">
                            {renderSelectedFields()}
                            {renderSelectedtaxFields()}
                            {renderSelecteddiscountFields()}
                          </div>
                          <div> {renderSelecteddescriptionFields()}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/*  ==============================  section-3  ============================= */}

                {/*===================================  section-4  =================================*/}
              </>
            )}
            {isVisiblehours && (
              <>
                <div className="p-3 ">
                  <div className="flex items-center pl-3 pt-20">
                    <p className="font-bold w-full  text-xl ml-3">Items</p>
                    <button
                      className=" text-blue-500 text-xl font-bold  rounded-full flex justify-end items-center mr-3"
                      onClick={(event) => {
                        event.preventDefault();
                        setCustomisePopup(true);
                      }}
                    >
                      <MdModeEditOutline className="mr-1" /> Customise
                    </button>
                  </div>
                  <form onSubmit={handleSubmitsection2}>
                    <div className="h-64 w-[97%] mt-4  border-2 rounded-xl mx-auto  ">
                      <div className="flex items-center mx-auto  w-[97%] mt-3 gap-10">
                        {customiseui ? (
                          <>
                            <TextField
                              id="outlined-search"
                              label="Item Name"
                              type="search"
                              style={{
                                width: "50%",
                              }}
                              name="itemnamehours"
                              onChange={handleChangesection2}
                            />
                            <TextField
                              id="outlined-uncontrolled"
                              label="Hours"
                              defaultValue="0"
                              style={{
                                width: "20%",
                              }}
                              name="hours"
                              onChange={handleChangesection2}
                            />

                            <TextField
                              id="outlined-search"
                              label="Rate"
                              type="search"
                              style={{
                                width: "25%",
                              }}
                              name="rate"
                              onChange={handleChangesection2}
                            />
                          </>
                        ) : (
                          <>
                            <TextField
                              id="outlined-search"
                              label="Item Name"
                              type="search"
                              style={{
                                width: "50%",
                              }}
                              name="itemnamehours"
                              onChange={handleChangesection2}
                            />
                            <TextField
                              id="outlined-uncontrolled"
                              label="Hours"
                              defaultValue="0"
                              style={{
                                width: "20%",
                              }}
                              name="hours"
                              onChange={handleChangesection2}
                            />

                            <TextField
                              id="outlined-search"
                              label="Rate"
                              type="search"
                              style={{
                                width: "25%",
                              }}
                              name="rate"
                              onChange={handleChangesection2}
                            />
                            <div className="p-3   ">
                              <div className="   flex items-center gap-5 ">
                                {renderSelectedtaxFields()}
                                {renderSelecteddiscountFields()}
                                {renderSelecteddateFields()}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <textarea
                        className="peer block h-auto w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        placeholder="Description(optional)"
                      ></textarea>
                    </div>
                  </form>
                  <div className="flex justify-end pr-7 pb-3">
                    {inputuser2 && (
                      <>
                        <p className="font-bold text-md">
                          Amounts: $
                          {inputuser2.discount
                            ? (inputuser2.hours *
                                inputuser2.rate *
                                inputuser2.discount) /
                              100
                            : inputuser2.hours * inputuser2.rate}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
            {isVisibleaccount && (
              <>
                <div className="p-3 ">
                  <form onSubmit={handleSubmitsection2}>
                    <div className="flex items-center pl-3 pt-20">
                      <p className="font-bold text-xl w-full ml-3">Items</p>
                      <button
                        className=" text-blue-500 text-xl font-bold  rounded-full  flex justify-end items-center mr-3"
                        onClick={(event) => {
                          event.preventDefault();
                          setCustomisePopup(true);
                        }}
                      >
                        <MdModeEditOutline className="mr-1" /> Customise
                      </button>
                    </div>
                    <div className="h-28 w-[97%] mt-4  border-2 rounded-xl mx-auto  ">
                      <div className="flex items-center mx-auto  w-[97%] mt-3 gap-10">
                        {customiseui ? (
                          <>
                            {" "}
                            <TextField
                              id="outlined-search"
                              label="Item Name"
                              type="search"
                              style={{
                                width: "75%",
                              }}
                              name="itemnameaccount"
                              onChange={handleChangesection2}
                            />
                            <TextField
                              id="outlined-search"
                              label="Price"
                              type="search"
                              style={{
                                width: "35%",
                              }}
                              name="price"
                              onChange={handleChangesection2}
                            />
                          </>
                        ) : (
                          <>
                            {" "}
                            <TextField
                              id="outlined-search"
                              label="Item Name"
                              type="search"
                              style={{
                                width: "75%",
                              }}
                              name="itemnameaccount"
                              onChange={handleChangesection2}
                            />
                            <TextField
                              id="outlined-search"
                              label="Price"
                              type="search"
                              style={{
                                width: "35%",
                              }}
                              name="price"
                              onChange={handleChangesection2}
                            />
                            <div className="p-3   ">
                              <div className="   flex items-center gap-5 ">
                                {renderSelectedtaxFields()}
                                {renderSelecteddiscountFields()}
                                {renderSelecteddateFields()}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {inputuser2 && (
                      <>
                        <p className="font-bold float-right mr-3 mt-3 text-md">
                          Amounts: $
                          {inputuser2.discount
                            ? (inputuser2.price * inputuser2.discount) / 100
                            : inputuser2.price}
                        </p>
                      </>
                    )}
                  </form>
                </div>
                <button className="text-bold ml-4 mt-3 text-blue-600  font-bold flex items-center text-xl ">
                  <AiOutlinePlus className="mr-2" /> Add items or Service
                </button>
              </>
            )}

            {/* {additem.map((item, index) => (
              <div key={index} className="">
                {" "}
                <div className="flex gap-4">{additems(item)}</div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usereducer;
