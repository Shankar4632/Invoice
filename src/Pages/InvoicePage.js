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
import { dataRef, storage } from "../firebase-config";
import { toast } from "react-toastify";
// import currencies json
import Currencydata from "../json file/currencies.json";
import days from "../json file/days.json";

const initialState = {
  invoicedue: "",
  invoicedate: "",
  invoicenumber: "",
};
const initialFields = ["ItemName", "quantity", "price"];
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
  const [activetab, setactivetab] = useState("InvoicePage");
  //hooks or States
  const [currency, setCurrency] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [showAddButton, setShowAddButton] = useState(false);
  const [showMemo, setShowMemo] = useState(false);
  const [showMemosection4, setShowMemosection4] = useState(false);
  const [subtotal, setSubtotal] = useState("$0.00");
  const [discounts, setDiscount] = useState("");
  const [shipping, setShipping] = useState("");
  const [otherAmount, setOtherAmount] = useState("");
  const [showDiscountField, setShowDiscountField] = useState(false);
  const [showShippingField, setShowShippingField] = useState(false);
  const [showOtherAmountField, setShowOtherAmountField] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [businesspopup, setBusinessPopup] = useState(false);
  const [customisepopup, setCustomisePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [togglesection2, setTogglesection2] = useState(false);
  const [togglesection3, setTogglesection3] = useState(false);
  const [togglesection4, setTogglesection4] = useState(false);
  const [lastData, setLastData] = useState(null);
  const [lastDatasection6, setLastDatasection6] = useState(null);

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

  //image state
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
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

  const [itemlist, setItemlist] = useState([
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
      itemnameaccount: "",
    },
  ]);

  // console.log(itemlist);
  const [singleItem, setSingleItem] = useState({
    ItemName: "",
    quantity: 0,
    price: 0,
    description: "",
    tax: "",
    discount: 0,
    itemnamehours: "",
    date: "",
    hours: 0,
    rate: 0,
    itemnameaccount: "",
  });
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
  const [inputuser5, setInputuser5] = useState(initialState);
  //section-6 business information
  const [inputbusiness, setInputbusiness] = useState({
    fname: "",
    lname: "",
    businessname: "",

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
  const handlecurrency = (e) => {
    const { value } = e.target;

    setCurrency(value);
  };

  //section-2

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
  const updatedItemList = itemlist.map((item) => {
    const amount = item.discount
      ? (item.price * item.quantity * item.discount) / 100
      : item.price * item.quantity;
    return {
      ...item,
      amount,
    };
  });
  //amounts

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

  const handleSubmitAll = (e) => {
    e.preventDefault();

    const formData = {
      countrycurrency: currency,
      section1: lastData,
      section2: updatedItemList,
      section3message: input,
      section4memo: inputuser4,
      section5total: {
        inputuser5: inputuser5,
        total: calculateTotal(),
        subtotal: subtotal1,
        discounts: discounts,
        shipping: shipping,
        otherAmount: otherAmount,
      },
      section6Businessinformation: {
        lastDatasection6,
        imageUrl: imageUrl,
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
  const handleSubmitsection6 = (e) => {
    e.preventDefault();

    const formData = {
      inputbusiness,
      imageUrl: imageUrl,
    };

    // Push the combined data to the database
    dataRef
      .ref()
      .child("section6Businessinformation")
      .push(formData, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Successfully added");
          setBusinessPopup(false);
        }
      });
  };

  //section-6 business information

  const handleeditbusinessinfo = (e) => {
    e.preventDefault();
    setBusinessPopup(true);
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
  useEffect(() => {}, [discounts]);

  useEffect(() => {}, [shipping]);

  useEffect(() => {}, [otherAmount]);
  //individual value
  const calculateTotal = () => {
    let total = 0;

    itemlist.forEach((item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.price) || 0;
      const discount = parseFloat(item.discount) || 0;
      const hours = parseFloat(item.hours) || 0;
      const rate = parseFloat(item.rate) || 0;
      const discounthours = parseFloat(item.discounthours) || 0;
      const discountquantity = parseFloat(item.discountquantity) || 0;
      const discountValue = parseFloat(discounts) || 0;
      const shippingValue = parseFloat(shipping) || 0;
      const otherAmountValue = parseFloat(otherAmount) || 0;
      //quantity
      const itemTotal = price * quantity;
      console.log(itemTotal);

      //hours
      const itemTotalhours = hours * rate;
      const itemTotalWithDiscounthours = (itemTotalhours * discounthours) / 100;
      const subtotalFinalhours = discount
        ? itemTotalWithDiscounthours
        : itemTotalhours;
      const itemhoursallonly = (item.hours * item.rate * item.discount) / 100;
      //amounts only
      const itemTotalamountonly = price;
      const itemTotalWithDiscountamountsonly = (price * discount) / 100;

      const itemTotalamountsonly = discount
        ? itemTotalWithDiscountamountsonly
        : itemTotalamountonly;
      total +=
        discountValue +
        shippingValue +
        otherAmountValue +
        itemTotal +
        subtotalFinalhours +
        itemhoursallonly;
      // itemTotalamountsonly;
    });

    console.log("total:", total);

    return total;
  };
  const calculateTotal1 = () => {
    let total = 0;
    itemlist.forEach((item) => {
      const price = parseFloat(item.price) || 0;
      const discount = parseFloat(item.discount) || 0;
      const discountValue = parseFloat(discounts) || 0;
      const shippingValue = parseFloat(shipping) || 0;
      const otherAmountValue = parseFloat(otherAmount) || 0;

      //amounts only
      const itemTotalamountonly = price;
      const itemTotalWithDiscountamountsonly = (price * discount) / 100;

      const itemTotalamountsonly = discount
        ? itemTotalWithDiscountamountsonly
        : itemTotalamountonly;
      total +=
        discountValue + shippingValue + otherAmountValue + itemTotalamountsonly;
    });

    console.log("total:", total);

    return total;
  };
  //total value
  const totalValue = calculateTotal();
  const totalValue1 = calculateTotal1();
  //sub total value
  const subtotal1 = itemlist.reduce((accumulator, item) => {
    if (item.discount) {
      return accumulator + (item.price * item.quantity * item.discount) / 100;
    }
    return accumulator + item.price * item.quantity;
  }, 0);

  const subtotal2 = itemlist.reduce((accumulator, item) => {
    const totalamountsitems = (item.price * item.discount) / 100;
    if (item.discount) {
      return accumulator + totalamountsitems;
    }
    return accumulator + item.price;
  }, 0);
  const subtotal3 = itemlist.reduce((accumulator, item) => {
    if (item.discount) {
      return accumulator + (item.hours * item.rate * item.discount) / 100;
    }
    return accumulator + item.hours * item.rate;
  }, 0);

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
  const handleCheckboxChange5 = (e) => {
    const { value, checked } = e.target;

    // Add or remove the field based on checkbox selection
    if (checked) {
      setFields5((prevFields) => [...prevFields, value]);
    } else {
      setFields5((prevFields) =>
        prevFields.filter((field5) => field5 !== value)
      );
    }
  };
  const handleCheckboxChange6 = (e) => {
    const { value, checked } = e.target;

    // Add or remove the field based on checkbox selection
    if (checked) {
      setFields6((prevFields) => [...prevFields, value]);
    } else {
      setFields6((prevFields) =>
        prevFields.filter((field6) => field6 !== value)
      );
    }
  };

  const handleCheckboxChange7 = (e) => {
    const { value, checked } = e.target;

    // Add or remove the field based on checkbox selection
    if (checked) {
      setFields7((prevFields) => [...prevFields, value]);
    } else {
      setFields7((prevFields) =>
        prevFields.filter((field7) => field7 !== value)
      );
    }
  };
  const handleCheckboxChange8 = (e) => {
    const { value, checked } = e.target;

    // Add or remove the field based on checkbox selection
    if (checked) {
      setFields8((prevFields) => [...prevFields, value]);
    } else {
      setFields8((prevFields) =>
        prevFields.filter((field8) => field8 !== value)
      );
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
          value={singleItem && singleItem[field]}
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
          value={singleItem && singleItem[field5]}
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
          value={singleItem && singleItem[field6]}
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
          value={singleItem && singleItem[field7]}
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
          value={singleItem && singleItem[field8]}
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
            "& .MuiTextField-root": { width: "25ch" },
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
            value={singleItem && singleItem[fields2]}
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
          value={singleItem[fields3]}
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
            "& .MuiTextField-root": { width: "25ch" },
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

  /////////////////    hide and show on button click    ////////////////
  const hideshow = (e) => {
    e.preventDefault();
    setShowMemo((prevShowMemo) => !prevShowMemo);
  };
  const hideshowsection4 = (e) => {
    e.preventDefault();
    setShowMemosection4((prevshowMemosection4) => !prevshowMemosection4);
  };
  const handlecustomiseui = () => {
    setCustomiseui(false);
    handleSaveClick();
  };
  //vibilities for ui of different type pages

  const toggleVisibilityofamounts = () => {
    setTogglesection2(true); // Set loading state to true
    setIsVisibleaccount(true);
    setIsVisiblehours(false);
    setIsVisibleinvoicepage(false);

    setTimeout(() => {
      setTogglesection2(false);
    }, 1500);
  };

  const toggleVisibilityofhours = () => {
    setTogglesection3(true); // Set loading state to true
    setIsVisibleaccount(false);
    setIsVisiblehours(true);
    setIsVisibleinvoicepage(false);

    setTimeout(() => {
      setTogglesection3(false);
    }, 1500);
  };

  const toggleVisibilityofQuantity = () => {
    setTogglesection4(true); // Set loading state to true
    setIsVisibleaccount(false);
    setIsVisiblehours(false);
    setIsVisibleinvoicepage(true);

    // Simulate loading for 5 seconds and then set loading state back to false
    setTimeout(() => {
      setTogglesection4(false);
    }, 1500);
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
          setLastData({
            ...snapshotValue[lastKey],
          });
          console.log("lastKey:", lastKey);
        } else {
          setLastData(null);
        }
        setIsLoading(false);
      });

    return () => {
      setLastData(null);
    };
  }, []);

  const handleDeleteemail = () => {
    console.log("Deleting data:", lastData);
    if (lastData && lastData.key) {
      console.log("Deleting data with key:", lastData.key);
      dataRef
        .ref()
        .child("CustomerList")
        .child(lastData.key)
        .remove()
        .then(() => {
          console.log("Last data deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting last data:", error);
          console.log("lastdata to delete", lastData);
        });
    } else {
      console.log("lastData or lastData.key is not defined:", lastData);
    }
  };

  //fetch data from db of business information
  useEffect(() => {
    dataRef
      .ref()
      .child("section6Businessinformation")
      .on("value", (snapshot) => {
        const snapshotValue = snapshot.val();
        console.log("Snapshot Value:", snapshotValue);
        if (snapshotValue !== null) {
          const dataKeys = Object.keys(snapshotValue);
          const lastKey = dataKeys[dataKeys.length - 1];
          setLastDatasection6(snapshotValue[lastKey]);
          console.log("lastDatasection6", lastDatasection6);
        } else {
          setLastDatasection6(null);
        }
        setIsLoading(false);
      });

    return () => {
      setLastDatasection6(null);
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

  if (lastData !== null && lastData.length > 0) {
    return <div>No data available</div>;
  }
  //logo image

  // const handleImageUpload = () => {
  //   if (selectedImage) {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       setImageUrl(e.target.result);
  //       console.log(e.target.result); // Add this line
  //     };

  //     reader.readAsDataURL(selectedImage);
  //   }
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target.result;
        setImageUrl(dataURL);
      };

      reader.readAsDataURL(file);
    }
  };

  //handle add items

  //Return Statements
  return (
    <div className="mb-3 ">
      <form onSubmit={handleSubmitAll}>
        {businesspopup ? (
          <>
            <div className="w-full h-screen  mx-auto  overflow-y-hidden fixed z-20  bg-gray-200   ">
              <div className="w-[900px] bg-white  opacity-100 relative  h-screen">
                <div className="flex items-center relative   ">
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
                      onClick={handleSubmitsection6}
                    >
                      Save
                    </button>
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
                                })}{" "}
                                {renderFieldstax({ singleItem, index })}
                                {renderFieldsdiscount({ singleItem, index })}
                                {renderFieldsdate({ singleItem, index })}
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
                onClick={handleSubmitAll}
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
                <div className="  flex justify-end w-full mt-3 pr-5">
                  <Box sx={{ minWidth: 150, marginRight: "20px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="template-select-label">
                        Templete
                      </InputLabel>

                      <Select
                        labelId="template-select-label"
                        id="template-select"
                        defaultValue="template3"
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
                          className={`${
                            isVisiblehours === "Hours" ? "active" : ""
                          }`}
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
                      <InputLabel id="currency-select-label">
                        Currency
                      </InputLabel>

                      <Select
                        labelId="currency-select-label"
                        id="currency-select"
                        value={currency}
                        label="Currency"
                        name="countrycurrency"
                        onChange={handlecurrency}
                      >
                        <MenuItem value="">None</MenuItem>
                        {Currencydata.map((codes, index) => (
                          <MenuItem value={codes.symbol} key={index}>
                            {codes.code}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <hr className="mt-3 w-[97%] mx-auto" />
                <div className="flex items-center ml-5 mt-7">
                  <p className="font-extrabold text-xl">Bill To</p>
                  <button className="rounded-full bg-[#003087] px-3 py-1 text-white font-bold ml-3">
                    invoice single customer
                  </button>
                </div>

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
                        <>
                          <button
                            className="px-4 py-2 bg-white text-blue-700 rounded-full border mt-2 flex items-center gap-2"
                            onClick={handleClick1}
                          >
                            {lastData.email}{" "}
                            <button onClick={() => handleDeleteemail()}>
                              <RxCross1 />
                            </button>
                          </button>
                        </>
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
              {/*==================================  section-2  =============================== */}
              {togglesection4 ? (
                <div>
                  <div className="flex justify-center text-3xl h-72 items-center">
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
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {isVisibleinvoicepage && (
                    <>
                      <div className=" ">
                        <div className="flex items-center ml-5 mt-16">
                          <p className="font-extrabold text-xl w-full ">
                            Items
                          </p>
                          <button
                            className=" text-blue-500 text-xl font-extrabold  rounded-full  flex justify-end items-center mr-6"
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
                                        {renderFields5({ singleItem, index })}
                                        {renderFields6({ singleItem, index })}
                                        {renderFieldstax({ singleItem, index })}
                                        {renderFieldsdiscount({
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
                                ) : (
                                  <div className="p-3   ">
                                    <div className="   flex items-center gap-5 ">
                                      {renderSelectedFields({
                                        singleItem,
                                        index,
                                      })}
                                      {renderSelectedFields5({
                                        singleItem,
                                        index,
                                      })}
                                      {renderSelectedFields6({
                                        singleItem,
                                        index,
                                      })}
                                      {renderSelectedtaxFields({
                                        singleItem,
                                        index,
                                      })}
                                      {renderSelecteddiscountFields({
                                        singleItem,
                                        index,
                                      })}
                                      {renderSelecteddateFields({
                                        singleItem,
                                        index,
                                      })}
                                    </div>
                                    <div>
                                      {" "}
                                      {renderSelecteddescriptionFields({
                                        singleItem,
                                        index,
                                      })}
                                    </div>
                                  </div>
                                )}
                                <div className="flex justify-end pr-7 pb-3">
                                  {itemlist
                                    .slice(itemlist.length - 1)
                                    .map((index) => (
                                      <div
                                        key={index}
                                        className="flex justify-end pr-7 pb-3"
                                      >
                                        {singleItem && (
                                          <>
                                            <p className="font-bold text-md">
                                              Amounts: {currency}
                                              {singleItem.discount
                                                ? (singleItem.price *
                                                    singleItem.quantity *
                                                    singleItem.discount) /
                                                  100
                                                : singleItem.price *
                                                  singleItem.quantity}
                                            </p>
                                          </>
                                        )}
                                      </div>
                                    ))}
                                </div>
                              </div>
                              {itemlist.length - 1 === index && (
                                <button
                                  className=" ml-4 mt-3 text-blue-600  font-extrabold  flex items-center text-xl "
                                  onClick={handleAddItem}
                                >
                                  <AiOutlinePlus className="mr-2" /> Add items
                                  or Service
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {/*  ==============================  section-3  ============================= */}

                      <div className="">
                        <div className="ml-5 mt-14">
                          <p className="font-extrabold text-xl ">
                            Message To Customer
                          </p>
                        </div>
                        <div className=" mt-4" data-te-input-wrapper-init>
                          <textarea
                            className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mt-4 text-black px-3 py-[0.32rem]  "
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

                      <div className="flex items-center ml-5 ">
                        <p className="text-bold  mt-3 text-blue-600  font-extrabold  flex items-center text-xl cursor-pointer ">
                          Add terms and conditions
                        </p>

                        <p className="text-bold  ml-1 mt-3 text-blue-600  font-extrabold  flex items-center text-xl cursor-pointer ">
                          <RxDividerVertical className="text-black flex item-center text-xl" />{" "}
                          Add reference number
                        </p>
                      </div>
                      {/*===================================  section-4  =================================*/}
                      <div className="  ">
                        <div className="flex items-center  ml-12 mt-14">
                          <p className="    font-bold text-3xl w-full">
                            More Options
                          </p>
                          <button onClick={hideshow} className="pr-12">
                            {" "}
                            {showMemo ? (
                              <IoIosArrowUp className="text-2xl text-gray-500" />
                            ) : (
                              <IoIosArrowDown className="text-2xl text-gray-500" />
                            )}
                          </button>
                        </div>
                        <hr className="mt-3 w-[93%] mx-auto" />
                        <div className="  ">
                          {showMemo && (
                            <>
                              <div className="ml-12">
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
                              <div className="  mb-4">
                                <div className="ml-12 mt-14">
                                  <p className="font-extrabold text-xl ">
                                    Memo To Self
                                  </p>
                                </div>
                                <div className=" mt-4">
                                  <textarea
                                    className="peer block min-h-[auto] placeholder-gray-500  w-[93%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
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
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {togglesection3 ? (
                <div>
                  <div className="flex justify-center text-3xl h-72 items-center">
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
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {isVisiblehours && (
                    <>
                      <div className="h-auto ">
                        <div className="flex items-center ml-5 mt-16 ">
                          <p className="font-extrabold text-[22px] w-full   ml-3">
                            Items
                          </p>
                          <button
                            className=" text-blue-500 text-xl font-extrabold   rounded-full flex justify-end items-center mr-3"
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
                            <>
                              {" "}
                              <div key={index}>
                                <div className="h-64 w-[97%] mt-4  border-2  rounded-xl mx-auto  ">
                                  {customiseui ? (
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
                                  ) : (
                                    <>
                                      <div className="p-3   ">
                                        <div className="   flex items-center  ">
                                          <div className="flex gap-4">
                                            {renderSelectedFields({
                                              singleItem,
                                              index,
                                            })}
                                            {renderSelectedFields7({
                                              singleItem,
                                              index,
                                            })}
                                            {renderSelectedFields8({
                                              singleItem,
                                              index,
                                            })}
                                            {renderSelectedtaxFields({
                                              singleItem,
                                              index,
                                            })}
                                            {renderSelecteddiscountFields({
                                              singleItem,
                                              index,
                                            })}
                                            {renderSelecteddateFields({
                                              singleItem,
                                              index,
                                            })}
                                          </div>
                                        </div>
                                        <div>
                                          {" "}
                                          {renderSelecteddescriptionFields({
                                            singleItem,
                                            index,
                                          })}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                  <div className="flex justify-end pr-7 pb-3">
                                    {itemlist
                                      .slice(itemlist.length - 1)
                                      .map((index) => (
                                        <div
                                          key={index}
                                          className="flex justify-end pr-7 pb-3"
                                        >
                                          {singleItem && (
                                            <>
                                              <p className="font-bold text-md">
                                                Amounts: {currency}
                                                {singleItem.discount
                                                  ? (singleItem.hours *
                                                      singleItem.rate *
                                                      singleItem.discount) /
                                                    100
                                                  : singleItem.hours *
                                                    singleItem.rate}
                                              </p>
                                            </>
                                          )}
                                        </div>
                                      ))}
                                  </div>
                                </div>
                                <div>
                                  {" "}
                                  {itemlist.length - 1 === index && (
                                    <button
                                      className="text-bold ml-4 mt-3 text-blue-600  font-extrabold  flex items-center text-xl "
                                      onClick={handleAddItem}
                                    >
                                      <AiOutlinePlus className="mr-2" /> Add
                                      items or Service
                                    </button>
                                  )}
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
              {togglesection2 ? (
                <div>
                  <div className="flex justify-center text-3xl h-72 items-center">
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
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {isVisibleaccount && (
                    <>
                      <div className=" h-auto ">
                        <div className="flex items-center  ml-5 mt-16">
                          <p className="font-extrabold text-xl w-full ">
                            Items
                          </p>
                          <button
                            className=" text-blue-500 text-xl font-extrabold  rounded-full  flex justify-end items-center mr-6"
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
                              <div className="h-auto  w-[97%] mt-4  border-2 rounded-xl mx-auto">
                                {customiseui ? (
                                  <div className="p-3 flex items-center gap-10">
                                    {renderFields({ singleItem, index })}

                                    {renderFields6({ singleItem, index })}
                                  </div>
                                ) : (
                                  <div className="  ">
                                    <>
                                      {" "}
                                      <div className="  ">
                                        <div className="   flex items-center gap-5 ">
                                          {renderSelectedFields({
                                            singleItem,
                                            index,
                                          })}

                                          {renderSelectedFields6({
                                            singleItem,
                                            index,
                                          })}
                                          {renderSelecteddiscountFields({
                                            singleItem,
                                            index,
                                          })}
                                          {renderSelectedtaxFields({
                                            singleItem,
                                            index,
                                          })}
                                          {renderSelecteddateFields({
                                            singleItem,
                                            index,
                                          })}
                                        </div>
                                      </div>
                                    </>
                                  </div>
                                )}
                                <div className=" pr-7  mt-2 ">
                                  {itemlist
                                    .slice(itemlist.length - 1)
                                    .map((index) => (
                                      <div key={index} className=" pr-7 ">
                                        {singleItem && (
                                          <>
                                            <p className="font-bold flex justify-end   text-md">
                                              Amounts: {currency}
                                              {singleItem.discount
                                                ? (singleItem.price *
                                                    singleItem.discount) /
                                                  100
                                                : singleItem.price}
                                            </p>
                                          </>
                                        )}
                                      </div>
                                    ))}
                                </div>
                              </div>

                              <div className="  ">
                                {" "}
                                {itemlist.length - 1 === index && (
                                  <button
                                    className="text-bold ml-4   text-blue-600  font-extrabold  flex items-center text-xl "
                                    onClick={handleAddItem}
                                  >
                                    <AiOutlinePlus className="mr-2" /> Add items
                                    or Service
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className=" w-[25%]  text-center ">
            <div className="h-auto border rounded-xl bg-white">
              <div className="flex items-center h-20   w-full">
                <div className="flex items-center justify-start ml-3 mt-3 w-full">
                  <div>
                    {/* {imageUrl && (
                      <div>
                        <img
                          src={imageUrl}
                          alt="Uploaded"
                          style={{
                            width: "90px",
                            height: "90px",
                            marginTop: "10px",
                          }}
                        />
                      </div>
                    )} */}
                  </div>
                  <div className="flex items-center ">
                    {/* {businessdata && (
                      <>
                        <div className="text-lg font-bold pl-5">
                          {" "}
                          {businessname}
                        </div>
                      </>
                    )} */}
                    {/* {lastDatasection6 && (
                      <>
                        <div className="text-lg font-bold pl-5">
                          {" "}
                          {lastDatasection6.imageUrl}
                        </div>
                      </>
                    )} */}

                    {lastDatasection6 && lastDatasection6.imageUrl && (
                      <div className="text-lg font-bold pl-5">
                        <img
                          src={lastDatasection6.imageUrl}
                          alt="Image"
                          style={{
                            width: "60px",
                            height: "60px",
                          }}
                        />
                      </div>
                    )}

                    {lastDatasection6 && (
                      <>
                        <div className="text-lg font-bold pl-5">
                          {" "}
                          {lastDatasection6.inputbusiness.email}
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
                {showMemosection4 && (
                  <div className=" mt-5  h-full pb-5 pl-2    ">
                    {/* {businessdata && (
                      <div className="flex items-center">
                        <div className="text-2xl text-black  mt-2 pl-2 gap-3">
                          <p className="text-[20px] text-black flex  items-center ">
                            <i>
                              {" "}
                              <FaRegAddressCard className="text-blue-900 mr-3 " />
                            </i>{" "}
                            {address2}
                          </p>
                          <p className="text-[20px] text-black flex  items-center  pl-8">
                            {pin}
                          </p>
                          <p className="text-[20px] text-black flex  items-center mt-3">
                            <i>
                              {" "}
                              <IoMdMail className="text-blue-900 mr-3  " />
                            </i>{" "}
                            {email}
                          </p>

                          <p className="text-[20px] text-black flex items-center mt-3 mb-4 ">
                            <CgWebsite className="text-blue-900 mr-3 " />
                            {website}
                          </p>
                        </div>
                      </div>
                    )} */}
                    {lastDatasection6 && (
                      <div className="flex items-center">
                        <div className="text-2xl text-black  mt-2 pl-2 gap-3">
                          <p className="text-[20px] text-black flex  items-center ">
                            <i>
                              {" "}
                              <FaRegAddressCard className="text-blue-900 mr-3 text-3xl " />
                            </i>{" "}
                            {/* {address2} */}
                            {lastDatasection6.inputbusiness.address2}
                          </p>
                          <p className="text-[20px] text-black flex  items-center  pl-8 text-3xl">
                            {/* {pin} */}
                            {lastDatasection6.inputbusiness.pin}
                          </p>
                          <p className="text-[20px] text-black flex  items-center mt-3 ">
                            <i>
                              {" "}
                              <IoMdMail className="text-blue-900 mr-3 text-3xl  " />
                            </i>{" "}
                            {/* {email} */}
                            {lastDatasection6.inputbusiness.email}
                          </p>

                          <p className="text-[20px] text-black flex items-center mt-3 mb-4 ">
                            <CgWebsite className="text-blue-900 mr-3 text-3xl" />
                            {/* {website} */}
                            {lastDatasection6.inputbusiness.website}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center">
                      {" "}
                      <input type="file" onChange={handleImageChange} />
                      <button
                        className="text-blue-600 w-full    text-lg font-bold"
                        onClick={handleeditbusinessinfo}
                      >
                        Edit Business Information
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

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
                  type="text"
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
                  <p className="font-extrabold w-full text-lg p-3">Subtotal </p>
                  <p className="font-extrabold text-lg p-3">Other Discounts </p>
                  <p className="font-extrabold text-lg p-3">Shipping </p>
                  <p className="font-extrabold text-lg p-3">Other Amount </p>
                  <hr className="w-[100%] border border-blue-600 flex justify-end" />
                  <p className="font-extrabold text-lg p-3">
                    Total{" "}
                    <span className="text-sm text-blue-500 font-bold">
                      (Tax Excl.)
                    </span>{" "}
                  </p>
                </div>
                <div className="mt-3">
                  {isVisibleinvoicepage && (
                    <>
                      <p className="font-bold text-md">{subtotal1}</p>
                    </>
                  )}
                  {isVisiblehours && (
                    <>
                      <p className="font-bold text-md">{subtotal3}</p>
                    </>
                  )}

                  {isVisibleaccount && (
                    <>
                      {" "}
                      <p className="font-bold text-md">{subtotal2}</p>
                    </>
                  )}

                  <form onSubmit={(e) => e.preventDefault()}>
                    <p className="p-3">
                      {showDiscountField ? (
                        <div>
                          <input
                            type="text"
                            className="w-14 border border-black"
                            value={discounts}
                            onChange={(e) => setDiscount(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, "discount")}
                          />
                        </div>
                      ) : (
                        <button
                          className="text-blue-600 rounded-xl text-lg font-extrabold  not-italic cursor-pointer"
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
                          className="text-blue-600 rounded-xl text-lg font-extrabold  not-italic cursor-pointer"
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
                          className="text-blue-600 rounded-xl text-lg font-extrabold  not-italic cursor-pointer"
                          onClick={() => setShowOtherAmountField(true)}
                        >
                          Add
                        </button>
                      )}
                    </p>
                  </form>
                  <hr className="w-[100%] border mx-auto" />

                  {isVisibleinvoicepage && (
                    <>
                      <p className="p-3 font-extrabold ">
                        {currency}
                        {totalValue}
                      </p>
                    </>
                  )}
                  {isVisiblehours && (
                    <>
                      <p className="p-3 font-extrabold ">
                        {currency}
                        {totalValue}
                      </p>
                    </>
                  )}
                  {isVisibleaccount && (
                    <>
                      {" "}
                      <p className="p-3 font-bold ">
                        {currency}
                        {totalValue1}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
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
