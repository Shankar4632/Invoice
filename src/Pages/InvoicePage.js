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

const initialState = {
  invoicedue: "",
  invoicedate: "",
  invoicenumber: "",
};
const initialFields = ["ItemName", "Quantity", "Price"];
const initialInputuser2 = {
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
  const [fields, setFields] = useState(initialFields);
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

  //section-1
  const [inputValue, setInputValue] = useState("");

  const handleClick1 = (event) => {
    event.preventDefault();
    setInputValue(lastData.email);
  };

  //section-2
  const [inputuser2, setInputuser2] = useState(initialInputuser2);

  const [itemlist, setItemlist] = useState([{ additems: "" }]);
  console.log(itemlist);
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
  const [inputuser5, setInputuser5] = useState(initialState);
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
  const [businessdata, setBusinessdata] = useState({});

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
  const handlechangeadditemlist = (e, index) => {
    const { name, value } = e.target;
    const list = [...itemlist];
    list[index][name] = value;
    setItemlist(list);
  };
  const handleAddItem = () => {
    setItemlist([...itemlist, { additems: "" }]);
  };

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

  //section-4
  const handleChangesection4 = (event) => {
    const memo = event.target.name;
    const value = event.target.value;
    setInputuser4((values) => ({ ...values, memo: value }));
    console.log(value);
  };
  //section-5
  const handleChangesection5 = (e) => {
    const { name, value } = e.target;
    setInputuser5({ ...inputuser5, [name]: value });
  };
  const handleChangesection6 = (e) => {
    const { name, value } = e.target;
    setInputbusiness({ ...inputbusiness, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const section1Result = handleSubmitsection1(e);
    const section2Result = handleSubmitsection2(e);
    const section3Result = handleSubmitsection3(e);
    const section4Result = handleSubmitsection4(e);
    const section5Result = handleSubmitsection5(e);
    const section6Result = handleSubmitsection6(e);

    if (
      section1Result &&
      section2Result &&
      section3Result &&
      section4Result &&
      section5Result &&
      section6Result
    ) {
      navigate("/");
    } else {
      toast.error("Please fill in all the required fields.");
    }
  };

  const handleSubmitsection1 = (e) => {
    e.preventDefault();
    console.log("Submitting section 1 form");
    const email = lastData.email;
    if (email === inputValue) {
      dataRef
        .ref()
        .child("section1")
        .push(email, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Successfully added");
          }
        });
    } else {
      // toast.error("Email mismatch. Please enter a valid email.");
    }
  };

  const handleSubmitsection2 = (e) => {
    console.log();

    if (!itemlist) {
      // Handle error when any of the fields are empty
      // toast.error("Please fill in all the fields");
    } else {
      dataRef
        .ref()
        .child("section2")
        .push(itemlist, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Successfully added");
          }
        });
    }
  };

  //section-3
  const handleSubmitsection3 = (e) => {
    e.preventDefault();
    if (!section3messege) {
      // toast.error(<div className="">Please enter the values!</div>);
    } else {
      dataRef
        .ref()
        .child("section3message")
        .push(input, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Successfully added");
          }
        });
    }
  };
  //section-4
  const handleSubmitsection4 = (e) => {
    e.preventDefault();
    if (!memo) {
      // toast.error(<div className="">Please enter the values!</div>);
    } else {
      dataRef
        .ref()
        .child("section4memo")
        .push(inputuser4, (err) => {
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

    const { invoicedue, invoicedate, invoicenumber } = inputuser5;

    if (!invoicedue || !invoicedate || !invoicenumber) {
      // toast.error("Please enter all the values!");
      return;
    }

    const total = calculateTotal(); // Calculate the total value
    const section5Data = {
      inputuser5: inputuser5,
      total: total,
    };

    try {
      dataRef
        .ref()
        .child("section5total")
        .push(section5Data, (error) => {
          if (error) {
            toast.error(error.message);
          } else {
            toast.success("Successfully added");
          }
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  //section-6 business information
  const handlesavebusinessinfo = (e) => {
    handleSubmitsection6(e);
    setBusinessPopup(false);
  };
  //section-6
  const handleSubmitsection6 = (e) => {
    e.preventDefault();
    if (!fname || !lname || !businessname) {
      // toast.error(<div className="">Please enter the values!</div>);
    } else {
      dataRef
        .ref()
        .child("section6Businessinformation")
        .push(inputbusiness, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Successfully added");
          }
        });
    }
  };

  const handleAdd = (section, value) => {
    switch (section) {
      case "discount":
        setDiscount(value);
        setShowDiscountField(false);
        break;
      case "shipping":
        setShipping(value);
        setShowShippingField(false);
        break;
      case "otherAmount":
        setOtherAmount(value);
        setShowOtherAmountField(false);
        break;
      default:
        break;
    }
  };
  //Total for amount field
  useEffect(() => {}, [discount]);

  useEffect(() => {}, [shipping]);

  useEffect(() => {}, [otherAmount]);
  const calculateTotal = () => {
    const discountValue = parseFloat(discount) || 0;
    const shippingValue = parseFloat(shipping) || 0;
    const otherAmountValue = parseFloat(otherAmount) || 0;
    //quantity
    const itemTotal =
      parseFloat(inputuser2.price) * parseFloat(inputuser2.quantity) || 0;
    const itemTotalWithDiscount =
      (itemTotal * parseFloat(inputuser2.discount)) / 100 || 0;
    const subtotalFinal = inputuser2.discount
      ? itemTotalWithDiscount
      : itemTotal;
    //hours
    const itemTotalhours =
      parseFloat(inputuser2.hours) * parseFloat(inputuser2.rate) || 0;
    const itemTotalWithDiscounthours =
      (itemTotalhours * parseFloat(inputuser2.discounthours)) / 100 || 0;

    const subtotalFinalhours = inputuser2.discount
      ? itemTotalWithDiscounthours
      : itemTotalhours;
    //amountonly
    const itemTotalamountonly = parseFloat(inputuser2.price) || 0;
    const itemTotalWithDiscountamountsonly =
      (itemTotalamountonly * parseFloat(inputuser2.discount)) / 100 || 0;
    const itemTotalamountsonly = inputuser2.discount
      ? itemTotalWithDiscountamountsonly
      : itemTotalamountonly;

    //total
    return (
      discountValue +
      shippingValue +
      otherAmountValue +
      subtotalFinal +
      subtotalFinalhours +
      itemTotalamountsonly
    );
  };

  const handleKeyDown = (event, section) => {
    if (event.key === "Enter") {
      handleAdd(section, event.target.value);
    }
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
  const renderFields = ({ singleItem, index }) => {
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
          value={singleItem[field]}
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
          value={singleItem[fields1]}
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
            value={singleItem[fields2]}
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
  //fetch data from db of business information
  useEffect(() => {
    dataRef
      .ref()
      .child("section6Businessinformation")
      .on("value", (snapshot) => {
        const snapshotValue = snapshot.val();
        if (snapshotValue !== null) {
          const dataKeys = Object.keys(snapshotValue);
          const lastKey = dataKeys[dataKeys.length - 1];
          setBusinessdata(snapshotValue[lastKey]);
        } else {
          setBusinessdata(null);
        }
        setIsLoading(false);
      });

    return () => {
      setBusinessdata(null);
    };
  }, []);

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
  //logo image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  //handle add items

  //Return Statements
  return (
    <div className="mb-3 ">
      {businesspopup ? (
        <>
          <form onSubmit={handleSubmitsection6}>
            <div className="w-full h-full  mx-auto  overflow-y-hidden fixed z-20  bg-gray-200   ">
              <div className="w-[900px] bg-white  opacity-100 relative  h-screen">
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
                <p className="text-center text-[40px]  font-semibold">
                  {" "}
                  Business information{" "}
                </p>
                <div className="w-[70%]  mx-auto ">
                  {" "}
                  <div className="grid grid-cols-2 w-full  mt-3 text-center">
                    <div className="">
                      {" "}
                      <input
                        id="outlined-search"
                        name="fname"
                        type="search"
                        className=" w-[90%]  border border-gray-400 rounded-md py-5 px-3 placeholder-black focus:border-blue-400"
                        placeholder="First name"
                        onChange={handleChangesection6}
                      />
                    </div>

                    <div className="">
                      {" "}
                      <input
                        id="outlined-search"
                        name="lname"
                        type="search"
                        className=" w-[90%]  border border-gray-400 rounded-md py-5 px-3 placeholder-black"
                        placeholder="Last name"
                        onChange={handleChangesection6}
                      />
                    </div>
                  </div>
                  <div className="flex  justify-center mt-3">
                    <input
                      id="outlined-search"
                      name="businessname"
                      type="search"
                      className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
                      placeholder="Business name"
                      onChange={handleChangesection6}
                    />
                  </div>
                  <div className="flex  justify-center mt-3">
                    <input
                      id="outlined-search"
                      name="address1"
                      type="text"
                      className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
                      placeholder="Address 1"
                      onChange={handleChangesection6}
                    />
                  </div>
                  <div className="flex  justify-center mt-3">
                    <input
                      id="outlined-search"
                      name="address2"
                      type="text"
                      className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
                      placeholder="Address 2"
                      onChange={handleChangesection6}
                    />
                  </div>
                  <div className="flex  justify-center mt-3">
                    <input
                      id="outlined-search"
                      name="email"
                      type="email"
                      className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
                      placeholder="Email"
                      onChange={handleChangesection6}
                    />
                  </div>
                  <div className="flex  justify-center mt-3">
                    <input
                      id="outlined-search"
                      name="website"
                      type="text"
                      className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
                      placeholder="Website"
                      onChange={handleChangesection6}
                    />
                  </div>
                  <div className="flex  justify-center mt-3">
                    <input
                      id="outlined-search"
                      name="pin"
                      type="text"
                      className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
                      placeholder="TIN / PIN"
                      onChange={handleChangesection6}
                    />
                  </div>
                  <div className="flex  justify-center mt-3">
                    <input
                      id="outlined-search"
                      name="additionalinfo"
                      type="text"
                      className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
                      placeholder="Additional information"
                      onChange={handleChangesection6}
                    />
                  </div>
                  <div className="flex justify-center  mt-10">
                    <button
                      className="text-white bg-[#003087] px-9 py-3  rounded-full    font-extrabold text-lg"
                      type="submit"
                      onClick={handlesavebusinessinfo}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
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

              <form onSubmit={handleSubmitsection1}>
                <div className="mx-auto w-[97%]">
                  <input
                    id="outlined-required"
                    className="w-full mt-3 py-4 px-3 border border-gray-500 rounded-md"
                    type="text"
                    placeholder="Email address or name"
                    onClick={handleClick}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {showAddButton && (
                    <>
                      {lastData && (
                        <button
                          className="px-4 py-2 bg-white text-blue-700 rounded-full border mt-2 flex items-center gap-2"
                          onClick={handleClick1}
                        >
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
              </form>
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

                    {itemlist.map((singleItem, index) => {
                      return (
                        <div key={index}>
                          <div
                            className="h-auto  w-[97%] mt-4  border-2 rounded-xl mx-auto  "
                            id="additems"
                          >
                            {customiseui ? (
                              <div className="p-3   ">
                                <div className="   flex items-center ">
                                  <div className="flex gap-4">
                                    {renderFields({ singleItem, index })}
                                    {renderFieldstax({ singleItem, index })}
                                    {renderFieldsdiscount()}
                                  </div>
                                </div>
                                <div>
                                  {renderFieldsdescription({
                                    singleItem,
                                    index,
                                  })}
                                </div>
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
                          {itemlist.length - 1 === index && (
                            <button
                              className="text-bold ml-4 mt-3 text-blue-600  font-bold flex items-center text-xl "
                              onClick={handleAddItem}
                            >
                              <AiOutlinePlus className="mr-2" /> Add items or
                              Service
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </form>
                </div>
                {/*  ==============================  section-3  ============================= */}
                <form onSubmit={handleSubmitsection3}>
                  <div className="p-3">
                    <p className="font-bold text-xl ml-5">
                      Message To Customer
                    </p>
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
                    </div>
                  </div>
                </form>
                <div className="flex items-center ml-7 ">
                  <button className="text-bold  mt-3 text-blue-600  font-bold flex items-center text-xl ">
                    Add terms and conditions
                  </button>

                  <button className="text-bold  ml-1 mt-3 text-blue-600  font-bold flex items-center text-xl ">
                    <RxDividerVertical className="text-black flex item-center text-xl" />{" "}
                    Add reference number
                  </button>
                </div>
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
                      <form onSubmit={handleSubmitsection4}>
                        <div className="">
                          <p className="text-xl p-3 ml-1 font-bold">
                            Attachments
                          </p>
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
                            className="text-[#05070a] ml-3 font-bold border-2 border-[#003087] px-4 py-1 rounded-full text-sm"
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
                              value={inputuser4.memo}
                              name="memo"
                              onChange={handleChangesection4}
                            >
                              {" "}
                            </textarea>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
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

        <div className=" w-[25%]  text-center ">
          <div className="h-auto border rounded-xl bg-white">
            <div className="flex items-center h-20   w-full">
              <div className="flex items-center justify-start ml-3 mt-3 w-full">
                <div>
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Uploaded"
                      // style={{ maxWidth: "300px" }}
                      className="w-20 h-20"
                    />
                  )}
                </div>
                <div>
                  {businessdata && (
                    <>
                      <div className="text-lg font-bold pl-5">
                        {" "}
                        {businessdata.businessname}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <button
                  className=" flex justify-end  mr-2 "
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
              {businessdata && (
                <div className="flex items-center">
                  <div className="text-2xl text-black  mt-2 pl-2 gap-3">
                    <p className="text-[20px] text-black flex  items-center mt-3 pl-8">
                      {businessdata.address1}
                    </p>
                    <p className="text-[20px] text-black flex  items-center ">
                      <i>
                        {" "}
                        <FaRegAddressCard className="text-blue-900 mr-3 " />
                      </i>{" "}
                      {businessdata.address2}
                    </p>
                    <p className="text-[20px] text-black flex  items-center  pl-8">
                      {businessdata.pin}
                    </p>
                    <p className="text-[20px] text-black flex  items-center mt-3">
                      <i>
                        {" "}
                        <IoMdMail className="text-blue-900 mr-3  " />
                      </i>{" "}
                      {businessdata.email}
                    </p>

                    <p className="text-[20px] text-black flex items-center mt-3 mb-4 ">
                      <CgWebsite className="text-blue-900 mr-3 " />
                      {businessdata.website}
                    </p>
                  </div>
                </div>
              )}
              {showMemosection4 && (
                <div className="flex items-center mt-5  h-full pb-5 pl-2    ">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
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

          <form onSubmit={handleSubmitsection5}>
            <div className="h-[550px] border rounded-xl bg-white mt-4 pt-8 ">
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
                value={inputuser5.invoicedate}
              />{" "}
              <select
                id="dropdown-select"
                className="w-[90%] py-4 mt-2 px-3 text-base border border-gray-500 rounded-md box-border"
                onChange={handleChangesection5}
                name="invoicedue"
                value={inputuser5.invoicedue}
              >
                <option defaultValue disabled value="">
                  ---select Due---
                </option>
                {days.map((days, index) => (
                  <option key={index}>{days.value}</option>
                ))}
              </select>
              <div className="mx-auto mt-3  h-[300px] grid grid-cols-2">
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
                <div className="mt-3">
                  {isVisibleinvoicepage && (
                    <>
                      {inputuser2 && (
                        <>
                          <p className="font-bold text-md">
                            {inputuser2.discount
                              ? (inputuser2.price *
                                  inputuser2.quantity *
                                  inputuser2.discount) /
                                100
                              : inputuser2.price * inputuser2.quantity}
                          </p>
                        </>
                      )}
                    </>
                  )}
                  {isVisiblehours && (
                    <>
                      {inputuser2 && (
                        <>
                          <p className="font-bold text-md">
                            {inputuser2.discount
                              ? (inputuser2.hours *
                                  inputuser2.rate *
                                  inputuser2.discount) /
                                100
                              : inputuser2.hours * inputuser2.rate}
                          </p>
                        </>
                      )}
                    </>
                  )}

                  {isVisibleaccount && (
                    <>
                      {" "}
                      {inputuser2 && (
                        <>
                          <p className="font-bold text-md">
                            {inputuser2.discount
                              ? (inputuser2.price * inputuser2.discount) / 100
                              : inputuser2.price}
                          </p>
                        </>
                      )}
                    </>
                  )}

                  <form onSubmit={(e) => e.preventDefault()}>
                    <p className="p-3">
                      {showDiscountField ? (
                        <div>
                          <input
                            type="text"
                            className="w-14 border border-black"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, "discount")}
                          />
                        </div>
                      ) : (
                        <button
                          className="text-blue-600 rounded-xl text-lg font-bold not-italic cursor-pointer"
                          onClick={() => setShowDiscountField(true)}
                        >
                          Add
                        </button>
                      )}
                    </p>
                  </form>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <p className="p-4">
                      {showShippingField ? (
                        <div>
                          <input
                            type="text"
                            className="w-14 border border-black"
                            value={shipping}
                            onChange={(e) => setShipping(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, "shipping")}
                          />
                        </div>
                      ) : (
                        <button
                          className="text-blue-600 rounded-xl text-lg font-bold not-italic cursor-pointer"
                          onClick={() => setShowShippingField(true)}
                        >
                          Add
                        </button>
                      )}
                    </p>
                  </form>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <p className="p-4">
                      {showOtherAmountField ? (
                        <div>
                          <input
                            type="text"
                            className="w-14 border border-black"
                            value={otherAmount}
                            onChange={(e) => setOtherAmount(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, "otherAmount")}
                          />
                        </div>
                      ) : (
                        <button
                          className="text-blue-600 rounded-xl text-lg font-bold not-italic cursor-pointer"
                          onClick={() => setShowOtherAmountField(true)}
                        >
                          Add
                        </button>
                      )}
                    </p>
                  </form>
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
