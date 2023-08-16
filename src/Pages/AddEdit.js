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
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
//toast
import { dataRef, storage } from "../firebase-config";
import { toast } from "react-toastify";
// import currencies json
import Currencydata from "../json file/currencies.json";
import days from "../json file/days.json";

const AddEdit = () => {
  const [currency, setCurrency] = useState("");
  const [showMemo, setShowMemo] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customisepopup, setCustomisePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastData, setLastData] = useState(null);

  //states for customise  items
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [fields, setFields] = useState(["ItemName"]);
  const [fields5, setFields5] = useState(["quantity"]);
  const [fields6, setFields6] = useState(["price"]);
  const [fields7, setFields7] = useState(["hours"]);
  const [fields8, setFields8] = useState(["rate"]);
  const [fields1, setField1] = useState(["description"]);
  const [fields2, setField2] = useState([]);
  const [fields3, setField3] = useState([]);
  const [fields4, setField4] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedFields5, setSelectedFields5] = useState([]);
  const [selectedFields6, setSelectedFields6] = useState([]);
  const [selectedFields7, setSelectedFields7] = useState([]);
  const [selectedFields8, setSelectedFields8] = useState([]);
  const [selecteddescriptionFields, setSelecteddescriptionFields] = useState(
    []
  );
  const [selectedtaxFields, setSelectedtaxFields] = useState([]);
  const [selecteddateFields, setSelecteddateFields] = useState([]);
  const [selecteddiscountFields, setSelecteddiscountFields] = useState([]);
  const [selecteditemFields, setSelecteditemFields] = useState([]);
  const [customiseui, setCustomiseui] = useState(true);
  //hide and show of main page
  const [isVisibleinvoicepage, setIsVisibleinvoicepage] = useState(true);
  //hide and show of customize
  const [isVisiblecustomiseinvoicepage, setVisiblecustomiseinvoicepage] =
    useState(true);
  const [isVisiblecustomiseaccount, setVisiblecustomiseaccount] =
    useState(null);
  const [isVisiblecustomisehours, setVisiblecustomisehours] = useState(null);
  //get data from the db
  const [data, setData] = useState({});

  //function calling
  const [inputValue, setInputValue] = useState("");

  const handleClick1 = (event) => {
    event.preventDefault();
    setInputValue(lastData.email);
  };

  //section-2
  const [itemlist, setItemlist] = useState([]);

  console.log(itemlist);
  const [singleItem, setSingleItem] = useState({
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

  //quantity
  const handlechangeadditemlist = (e, index) => {
    const { name, value } = e.target;
    const list = [...itemlist];
    list[index][name] = value;
    setItemlist(list);
    console.log(name, value);
  };
  const handleAddItem = () => {
    setItemlist([
      ...itemlist,
      {
        ItemName: "",
        quantity: 0,
        price: 0,
        description: "",
        tax: "",
        discount: 0,
        itemnamehours: "",
        hours: 0,
        rate: 0,
      },
    ]);
  };
  // const updatedItemList = itemlist.map((item) => {
  //   const amount = item.discount
  //     ? (item.price * item.quantity * item.discount) / 100
  //     : item.price * item.quantity;
  //   return {
  //     ...item,
  //     amount,
  //   };
  // });
  //amounts only

  //section-3
  const [input, setInput] = useState({
    section3messege: "",
  });
  const { section3messege } = input;
  //section-4
  const [inputuser4, setInputuser4] = useState({
    memo: "",
  });
  const { memo } = inputuser4;

  //section-5
  // const [inputuser5, setInputuser5] = useState(initialState);
  //section-6 business information
  const [inputbusiness, setInputbusiness] = useState({
    fname: "",
    lname: "",
    businessname: "",
    // billhide1: "",
    // billhide2: "",
    address1: "",
    address2: "",
    email: "",
    website: "",
    pin: "",
    additionalinfo: "",
  });
  const {
    fname,
    lname,
    businessname,
    address1,
    address2,
    email,
    website,
    pin,
    additionalinfo,
  } = inputbusiness;
  //fetch

  const handleSubmitAll = (e) => {
    e.preventDefault();

    const formData = {
      section1: {
        email: lastData.email,
        phone: lastData.phone,
        firstname: lastData.firstname,
        lastname: lastData.lastname,
        address1: lastData.address1,
        address2: lastData.address2,
        businessname: lastData.businessname,
        email: lastData.email,
        dfirstname: lastData.dfirstname,
        dlastname: lastData.dlastname,
        dbusinessname: lastData.dbusinessname,
        daddress1: lastData.daddress1,
        daddress2: lastData.daddress2,
      },
    };

    // Push the combined data to the database
    dataRef
      .ref()
      .child("Allsections")
      .push(formData, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Successfully added");
          navigate("/");
        }
      });
  };
  const hideshow = (e) => {
    e.preventDefault();
    setShowMemo((prevShowMemo) => !prevShowMemo);
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

  const navigate = useNavigate();
  const handlecurrency = (event) => {
    setCurrency(event.target.value);
  };
  const handlecustomiseui = () => {
    setCustomiseui(false);
    handleSaveClick();
  };
  const handleClick = (e) => {
    e.preventDefault();

    setLastData(lastData);
  };
  const handleselectedTemplate = (event) => {
    setSelectedTemplate(event.target.value);
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

  // Handle save button click
  const handleSaveClick = () => {
    setSelectedFields(fields);
    setSelectedFields5(fields5);
    setSelectedFields6(fields6);
    setSelectedFields7(fields7);
    setSelectedFields8(fields8);
    setSelecteddescriptionFields(fields1);
    setSelectedtaxFields(fields2);
    setSelecteddiscountFields(fields3);
    setSelecteddateFields(fields4);
    setCustomisePopup(false);
  };

  const index = { id: 0 };

  // Rest of your code

  // Render the form fields
  const renderFields = ({ singleItem, index }) => {
    return fields.map((field) => (
      <div key={field}>
        <TextField
          id="outlined-search"
          type="text"
          label={field}
          style={{
            marginRight: "10px",
          }}
          className=" w-[500px]"
          name={field}
          value={(singleItem && singleItem[field]) || ""}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };
  const renderFields5 = ({ singleItem, index }) => {
    return fields5.map((field5) => (
      <div key={field5}>
        <TextField
          id="outlined-search"
          type="text"
          label={field5}
          style={{
            marginRight: "10px",
            width: "100%",
          }}
          className=""
          name={field5}
          value={(singleItem && singleItem[field5]) || ""}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };
  const renderFields6 = ({ singleItem, index }) => {
    return fields6.map((field6) => (
      <div key={field6}>
        <TextField
          id="outlined-search"
          type="text"
          label={field6}
          style={{
            marginRight: "10px",
            width: "100%",
          }}
          className=""
          name={field6}
          value={(singleItem && singleItem[field6]) || ""}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };
  const renderFields7 = ({ singleItem, index }) => {
    return fields7.map((field7) => (
      <div key={field7}>
        <TextField
          id="outlined-search"
          type="text"
          label={field7}
          style={{
            marginRight: "10px",
            width: "100%",
          }}
          className=""
          name={field7}
          value={(singleItem && singleItem[field7]) || ""}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };
  const renderFields8 = ({ singleItem, index }) => {
    return fields8.map((field8) => (
      <div key={field8}>
        <TextField
          id="outlined-search"
          type="text"
          label={field8}
          style={{
            marginRight: "10px",
            width: "100%",
          }}
          className=""
          name={field8}
          value={(singleItem && singleItem[field8]) || ""}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };

  const renderFieldsdescription = ({ singleItem, index }) => {
    return fields1.map((fields1) => (
      <div key={fields1}>
        <textarea
          className="peer block h-auto mb-3 w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
          id="exampleFormControlTextarea1"
          rows="4"
          type="text"
          placeholder="Description(optional)"
          name="description"
          value={singleItem[fields1] || ""}
          onChange={(e) => handlechangeadditemlist(e, index)}
        >
          {" "}
        </textarea>
      </div>
    ));
  };
  const renderFieldstax = ({ singleItem, index }) => {
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
            value={(singleItem && singleItem[fields2]) || ""}
            onChange={(e) => handlechangeadditemlist(e, index)}
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
  const renderFieldsdiscount = ({ singleItem, index }) => {
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
          name="discount"
          value={singleItem[fields3] || ""}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };
  const renderFieldsdate = ({ singleItem, index }) => {
    return fields4.map((fields4) => (
      <div key={fields4}>
        <TextField
          id="outlined-search"
          type="date"
          style={{
            marginRight: "10px",
            width: "100%",
          }}
          name="date"
          value={singleItem[fields3]}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };

  // Render the selected fields below the form
  const renderSelectedFields = ({ singleItem, index }) => {
    return selectedFields.map((field) => (
      <div key={field}>
        <TextField
          id="outlined-search"
          type="text"
          label={field}
          style={{
            marginRight: "20px",
          }}
          className="gap-3 w-[500px]"
          name={field}
          value={singleItem[field]}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };

  const renderSelectedFields5 = ({ singleItem, index }) => {
    return selectedFields5.map((field5) => (
      <div key={field5}>
        <TextField
          id="outlined-search"
          type="text"
          label={field5}
          style={{
            marginRight: "20px",
            width: "100%",
          }}
          className="gap-3"
          name={field5}
          value={singleItem[field5]}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };
  const renderSelectedFields6 = ({ singleItem, index }) => {
    return selectedFields6.map((field6) => (
      <div key={field6}>
        <TextField
          id="outlined-search"
          type="text"
          label={field6}
          style={{
            marginRight: "20px",
            width: "100%",
          }}
          className="gap-3"
          name={field6}
          value={singleItem[field6]}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };
  const renderSelectedFields7 = ({ singleItem, index }) => {
    return selectedFields7.map((field7) => (
      <div key={field7}>
        <TextField
          id="outlined-search"
          type="text"
          label={field7}
          style={{
            marginRight: "20px",
            width: "100%",
          }}
          className="gap-3"
          name={field7}
          value={singleItem[field7]}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };
  const renderSelectedFields8 = ({ singleItem, index }) => {
    return selectedFields8.map((field8) => (
      <div key={field8}>
        <TextField
          id="outlined-search"
          type="text"
          label={field8}
          style={{
            marginRight: "20px",
            width: "100%",
          }}
          className="gap-3"
          name={field8}
          value={singleItem[field8]}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };
  const renderSelecteddescriptionFields = ({ singleItem, index }) => {
    return selecteddescriptionFields.map((field) => (
      <div key={field}>
        <textarea
          className="peer block h-auto mb-3 w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
          id="exampleFormControlTextarea1"
          rows="4"
          type="text"
          placeholder="Description(optional)"
          name="description"
          value={singleItem[field]}
          onChange={(e) => handlechangeadditemlist(e, index)}
        >
          {" "}
        </textarea>
      </div>
    ));
  };
  const renderSelecteddiscountFields = ({ singleItem, index }) => {
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
          value={singleItem[field]}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };
  const renderSelecteddateFields = ({ singleItem, index }) => {
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
          value={singleItem[field]}
          onChange={(e) => handlechangeadditemlist(e, index)}
        />
      </div>
    ));
  };
  const renderSelectedtaxFields = ({ singleItem, index }) => {
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
            name="tax"
            value={singleItem[field]}
            onChange={(e) => handlechangeadditemlist(e, index)}
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

  //fetch data

  const { key } = useParams();

  useEffect(() => {
    const dataRef1 = dataRef.ref("Allsections");
    dataRef1.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
      setIsLoading(false);
    });
    return () => {
      dataRef1.off(); // Remember to unsubscribe when component unmounts
    };
  }, [key]);

  useEffect(() => {
    if (!data || !data[key]) {
      // Check for loading state
      console.log("data[key]:", data[key]);
      setItemlist({ ...data[key] });
    }

    console.log("Updated Data:", data);
  }, [key, data]); // Include loading state in the dependency array

  return (
    <div className="mb-3 ">
      {isLoading ? (
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
      ) : (
        <>
          {" "}
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
                    <p className=" mt-3 pl-8 text-lg font-bold  mb-2">
                      Preview
                    </p>
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
                              {renderFields({ singleItem, index })}

                              {renderFields6({ singleItem, index })}

                              {renderFieldstax({ singleItem, index })}
                              {renderFieldsdiscount({ singleItem, index })}
                              {renderFieldsdate({ singleItem, index })}
                            </div>
                          </>
                        )}
                        {isVisiblecustomisehours && (
                          <>
                            <div className="p-3   ">
                              <div className="   flex items-center ">
                                <div className="flex gap-4">
                                  {renderFields({
                                    singleItem,
                                    index,
                                  })}

                                  {renderFields7({
                                    singleItem,
                                    index,
                                  })}
                                  {renderFields8({
                                    singleItem,
                                    index,
                                  })}
                                </div>
                              </div>
                              <div>
                                {renderFieldsdescription({
                                  singleItem,
                                  index,
                                })}
                              </div>
                            </div>
                          </>
                        )}
                        {isVisiblecustomiseinvoicepage && (
                          <>
                            {" "}
                            <div className="   flex items-center ">
                              <div className="flex gap-4">
                                {renderFields({ singleItem, index })}
                                {renderFields5({ singleItem, index })}
                                {renderFields6({ singleItem, index })}
                                {renderFieldstax({ singleItem, index })}
                                {renderFieldsdate({ singleItem, index })}
                                {renderFieldsdiscount({ singleItem, index })}
                              </div>
                            </div>
                            <div>
                              {renderFieldsdescription({ singleItem, index })}
                            </div>
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
          <form onSubmit={handleSubmitAll}>
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
                    className="font-extrabold  text-blue-600 text-lg pl-2 cursor-pointer "
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Back to invoices
                  </span>
                </div>

                <p className="pl-3 text-[43px] font-semibold mt-1">
                  Edit invoice no. {invoiceNumber}
                </p>
              </div>
              <div className=" flex items-center  justify-end ">
                <div className="flex items-center ">
                  <BsThreeDotsVertical className="mr-8 text-[23px] text-gray-600" />

                  <BsCamera className="mr-8 text-xl text-gray-600" />
                  <button
                    className="text-white bg-[#003087] px-9 py-3   mr-5 rounded-full    font-extrabold text-lg"
                    type="submit"
                    onClick={handleSubmitAll}
                  >
                    Send Update
                  </button>
                </div>
              </div>
            </div>
            <div className="flex   w-[97%]  mx-auto gap-5  ">
              <div className="w-[75%]">
                <div className="border-2    h-auto rounded-xl bg-white ">
                  {/*===================================   section-1  =============================== */}
                  <div className="">
                    <div className=" flex justify-end w-full mt-3 pr-4">
                      <Box sx={{ minWidth: 150 }}>
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
                      <p className="font-extrabold text-xl">Bill To</p>
                    </div>

                    <div className="mx-auto  w-[97%]  border-2 h-36 rounded-xl">
                      <div className="flex items-center w-full  mt-10 pl-10">
                        <p className="text-2xl   font-semibold">
                          {" "}
                          {data[key].section1.email}
                          {/* {section1} */}
                        </p>
                        <button className="text-2xl   flex justify-end   w-full pr-20 font-extrabold ">
                          <RxCross1 />
                        </button>
                      </div>
                      <button
                        className="mt-3 text-blue-600 pl-10  text-2xl   font-semibold"
                        onClick={() => {
                          navigate("/addcustomer");
                        }}
                      >
                        Edit Customer information
                      </button>
                    </div>
                  </div>
                  {/*==================================  section-2  =============================== */}

                  <div className="p-3  ">
                    <div className="flex items-center pl-3 pt-20">
                      <p className="font-bold text-xl w-full ml-3">Items</p>
                      <button
                        className=" text-blue-500 text-xl font-extrabold  rounded-full  flex justify-end items-center mr-3"
                        onClick={(event) => {
                          event.preventDefault();
                          setCustomisePopup(true);
                        }}
                      >
                        <MdModeEditOutline className="mr-1" /> Customise
                      </button>
                    </div>

                    {data[key].section2.map((key, index) => (
                      <>
                        {" "}
                        <div className="flex">
                          <div
                            className="h-auto  w-[97%] mt-4  border-2 rounded-xl mx-auto  "
                            id="additems"
                            key={key}
                          >
                            {customiseui ? (
                              <div className="p-3   ">
                                <div className="   flex items-center ">
                                  <div className="flex gap-4">
                                    {renderFields({ singleItem: key, index })}
                                    {renderFields5({ singleItem: key, index })}
                                    {renderFields6({ singleItem: key, index })}
                                    {renderFieldstax({
                                      singleItem: key,
                                      index,
                                    })}
                                    {renderFieldsdiscount({
                                      singleItem: key,
                                      index,
                                    })}
                                  </div>
                                </div>
                                <div>
                                  {renderFieldsdescription({
                                    singleItem: key,
                                    index,
                                  })}
                                </div>
                              </div>
                            ) : (
                              <div className="p-3   ">
                                <div className="   flex items-center gap-5 ">
                                  {renderSelectedFields({
                                    singleItem: key,
                                    index,
                                  })}
                                  {renderSelectedFields5({
                                    singleItem: key,
                                    index,
                                  })}
                                  {renderSelectedFields6({
                                    singleItem: key,
                                    index,
                                  })}
                                  {renderSelectedtaxFields({
                                    singleItem: key,
                                    index,
                                  })}
                                  {renderSelecteddiscountFields({
                                    singleItem: key,
                                    index,
                                  })}
                                  {renderSelecteddateFields({
                                    singleItem: key,
                                    index,
                                  })}
                                </div>
                                <div>
                                  {" "}
                                  {renderSelecteddescriptionFields({
                                    singleItem: key,
                                    index,
                                  })}
                                </div>
                              </div>
                            )}
                            <div className="flex justify-end pr-7 pb-3">
                              {/* {itemlist.slice(itemlist.length - 1).map((index) => (
                      <div key={index} className="flex justify-end pr-7 pb-3">
                        {singleItem && (
                          <>
                            <p className="font-bold text-md">
                              Amounts: $
                              {singleItem.discount
                                ? (singleItem.price *
                                    singleItem.quantity *
                                    singleItem.discount) /
                                  100
                                : singleItem.price * singleItem.quantity}
                            </p>
                          </>
                        )}
                      </div>
                    ))} */}
                            </div>
                          </div>
                          <button className="text-2xl     font-extrabold    ">
                            <RxCross1 />
                          </button>
                        </div>{" "}
                      </>
                    ))}

                    {/* {itemlist.length - 1 === index && (
                      <button
                        className=" ml-4 mt-3 text-blue-600  font-extrabold  flex items-center text-xl "
                        onClick={handleAddItem}
                      >
                        <AiOutlinePlus className="mr-2" /> Add items or Service
                      </button>
                    )} */}
                  </div>
                  {/*  ==============================  section-3  ============================= */}

                  <div className="p-3">
                    <p className="font-bold text-xl ml-5">
                      Message To Customer
                    </p>
                    <div className=" mb-2" data-te-input-wrapper-init>
                      <textarea
                        className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]"
                        id="exampleFormControlTextarea1"
                        rows="6"
                        name="section3messege"
                        placeholder="Seller note to customer"
                        value={data[key].section3message.section3messege || ""}
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex items-center ml-7 ">
                    <p className="text-bold  mt-3 text-blue-600  font-extrabold  flex items-center text-xl cursor-pointer ">
                      Add terms and conditions
                    </p>

                    <p className="text-bold  ml-1 mt-3 text-blue-600  font-extrabold  flex items-center text-xl cursor-pointer ">
                      <RxDividerVertical className="text-black flex item-center text-xl" />{" "}
                      Add reference number
                    </p>
                  </div>
                  {/*===================================  section-4  =================================*/}
                  <div className="  p-3 ">
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
                        <>
                          <div className="">
                            <p className="text-xl p-3 ml-1 font-bold">
                              Attachments
                            </p>
                            <input
                              type="file"
                              name="files"
                              id="files"
                              className="hidden"
                            />
                            <button
                              type="button"
                              className="text-[#05070a] ml-3 font-bold border-2 border-[#003087] px-4 py-1 rounded-full text-sm"
                            >
                              Upload files
                            </button>
                            <p className="text-sm font-semibold p-3 text-gray-800">
                              JPG GIF PNG PDF | Up to 5 files , 4MB per file
                            </p>
                          </div>
                          <div className=" p-3 mt-10 mb-4">
                            <p className="font-bold text-xl ml-2">
                              Memo To Self
                            </p>
                            <div className=" mb-2">
                              <textarea
                                className="peer block min-h-[auto] placeholder-gray-500  w-[98%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
                                rows="6"
                                placeholder="Memo"
                                name="memo"
                                value={data[key].section4memo.memo || ""}
                              >
                                {" "}
                              </textarea>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className=" w-[25%]  text-center ">
                <div className="h-auto border rounded-xl bg-white">
                  <div className="flex items-center h-20   w-full">
                    <div className="flex items-center justify-start ml-3 mt-3 w-full"></div>

                    <div></div>
                  </div>
                  <div></div>
                </div>

                <div className="h-[550px] border rounded-xl bg-white mt-4 pt-8 ">
                  <div className="mx-auto mt-3  h-[300px] grid grid-cols-2">
                    <div>
                      <p className="font-semibold w-full text-lg p-3">
                        Subtotal{" "}
                      </p>
                      <p className="font-semibold text-lg p-3">
                        Other Discounts{" "}
                      </p>
                      <p className="font-semibold text-lg p-3">Shipping </p>
                      <p className="font-semibold text-lg p-3">Other Amount </p>
                      <p className="font-bold text-lg p-3">
                        Total{" "}
                        <span className="text-sm text-blue-500 font-bold">
                          (Tax Excl.)
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddEdit;
