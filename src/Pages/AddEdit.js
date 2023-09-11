import * as React from "react";
import { useState, useEffect } from "react";
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
import { FaRegAddressCard } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//Reat Router Dom
import { Link, useNavigate, useParams } from "react-router-dom";
//toast
import { dataRef } from "../firebase-config";
import { toast } from "react-toastify";
// import currencies json
import Currencydata from "../json file/currencies.json";
import days from "../json file/days.json";

const inititalvalue = {
  ItemName: "",
  quantity: 0,
  price: 0,
  description: "",
  tax: "",
  discount: 0,
  itemnamehours: "",
  hours: 0,
  rate: 0,
  date: "",
  itemnameaccount: "",
};
const inititalsection3value = {
  section3messege: "",
};
const inititalsection4value = {
  memo: "",
};
const initialState5 = {
  invoicedue: "",
  invoicedate: "",
  invoicenumber: "",
};
const inititalsection6 = {
  fname: "",
  lname: "",
  businessname: "",
  address1: "",
  address2: "",
  email: "",
  website: "",
  pin: "",
  additionalinfo: "",
};
const inititalvaluecurrency = {
  countrycurrency: "",
};
const AddEdit = () => {
  const [currency, setCurrency] = useState(inititalvaluecurrency);
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
  const [fields2, setField2] = useState(["tax"]);
  const [fields3, setField3] = useState(["discount"]);
  const [fields4, setField4] = useState(["date"]);

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
  const [customiseui, setCustomiseui] = useState(true);
  const [discounts, setDiscount] = useState("");
  const [shipping, setShipping] = useState("");
  const [otherAmount, setOtherAmount] = useState("");
  //hide and show of main page
  const [isVisibleinvoicepage, setIsVisibleinvoicepage] = useState(true);
  //hide and show of customize
  const [isVisiblecustomiseinvoicepage, setVisiblecustomiseinvoicepage] =
    useState(true);
  const [isVisiblecustomiseaccount, setVisiblecustomiseaccount] =
    useState(null);
  const [isVisiblecustomisehours, setVisiblecustomisehours] = useState(null);
  const [showDiscountField, setShowDiscountField] = useState(false);
  const [showShippingField, setShowShippingField] = useState(false);
  const [showOtherAmountField, setShowOtherAmountField] = useState(false);
  //hide and show of main page
  const [isVisibleaccount, setIsVisibleaccount] = useState(null);
  const [isVisiblehours, setIsVisiblehours] = useState(null);

  //get data from the db
  const [data, setData] = useState({});
  const handlecurrency = (e) => {
    const { value } = e.target;

    setCurrency(value);

    console.log("value:", value);
  };
  // const handlecurrency = (event) => {
  //   const { name, value } = event.target;
  //   setCurrency({ ...currency, [name]: value });
  //   console.log("name:", name);
  //   console.log("value:", value);
  // };
  //section - 1;
  const [inputValue, setInputValue] = useState("");

  const handleClick1 = (event) => {
    event.preventDefault();
    setInputValue(lastData.email);
  };

  //section-2
  const [itemlist, setItemlist] = useState([]);
  console.log("ITEMLIST", itemlist);

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
  //section-3
  const [input, setInput] = useState(inititalsection3value);
  const { section3messege } = input;
  //section-4
  const [inputuser4, setInputuser4] = useState(inititalsection4value);
  const { memo } = inputuser4;

  //section-5
  const [inputuser5, setInputuser5] = useState(initialState5);
  //section-6 business information
  const [inputbusiness, setInputbusiness] = useState(inititalsection6);
  // const {
  //   fname,
  //   lname,
  //   businessname,
  //   address1,
  //   address2,
  //   email,
  //   website,
  //   pin,
  //   additionalinfo,
  // } = inputbusiness;
  const [businesspopup, setBusinessPopup] = useState(false);
  const [businessdata, setBusinessdata] = useState({});

  const [showMemosection4, setShowMemosection4] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const hideshowsection4 = (e) => {
    e.preventDefault();
    setShowMemosection4((prevshowMemosection4) => !prevshowMemosection4);
  };
  //quantity
  //function calling
  const handlechangeadditemlist = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...data[key].section2];
    updatedData[index][name] = value;
    setSingleItem({ ...updatedData[index] });
    setData({ ...data, [key]: { ...data[key], section2: updatedData } });
  };

  const Deleteemail = () => {
    // Construct the reference to the specific section1 data using the key
    const section1Ref = dataRef.ref(`Allsections/${key}/section1`);

    // Remove the section1 data
    section1Ref
      .remove()
      .then(() => {
        console.log("Section1 data deleted successfully");
        navigate(`/addedit/${key}`);
      })
      .catch((error) => {
        console.error("Error deleting section1 data:", error);
      });
  };

  const removeItem = (index) => {
    // Create a copy of the current data array without the item at the specified index
    const newData = data[key].section2.filter((_, i) => i !== index);

    // Update the Firebase database with the new data
    dataRef
      .ref()
      .child("Allsections")
      .child(key)
      .child("section2")
      .set(newData)
      .then(() => {
        console.log("Data removed successfully from Firebase");
      })
      .catch((error) => {
        console.error("Error removing data from Firebase:", error);
      });
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
        date: "",
        itemnamehours: "",
        hours: 0,
        rate: 0,
      },
    ]);
  };

  // const updatedItemList = data[key].section2.map((key, item) => {
  //   const amount = item.discount
  //     ? (item.price * item.quantity * item.discount) / 100
  //     : item.price * item.quantity;
  //   return {
  //     ...item,
  //     amount,
  //   };
  // });

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
  const handleKeyDown = (event, section) => {
    if (event.key === "Enter") {
      handleAdd(section, event.target.value);
    }
  };
  // //section-3

  const handleChangesection3 = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const handleChangesection4 = (event) => {
    const { name, value } = event.target;
    setInputuser4({ ...inputuser4, [name]: value });
  };
  const handleChangesection5 = (event) => {
    const { name, value } = event.target;
    setInputuser5({ ...inputuser5, [name]: value });
  };
  const handleChangesection6 = (event) => {
    const { name, value } = event.target;
    setInputbusiness({ ...inputbusiness, [name]: value });
    console.log(value);
  };

  //fetch

  const handleSubmitAll = (e) => {
    e.preventDefault();

    const formData = {
      countrycurrency: currency,
      // section1: lastData.key !== undefined ? lastData.key : data[key]?.section1,
      section1:
        lastData.key !== undefined ? lastData.key : data[key]?.section1 || "",
      section2: data[key].section2,
      // section2: updatedItemList,
      section3message: input,
      section4memo: inputuser4,
      section5total: {
        inputuser5: inputuser5,
        // total: calculateTotal(),
        subtotal: subtotal1,
        discounts: discounts,
        shipping: shipping,
        otherAmount: otherAmount,
      },
      section6Businessinformation: {
        lastDatasection6: {
          inputbusiness: { ...inputbusiness },
        },
      },
    };
    if (!formData) {
      toast.error("please enter the values");
    } else {
      if (!key) {
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
      } else {
        dataRef
          .ref()
          .child(`Allsections/${key}`)
          .set(formData, (err) => {
            if (err) {
              toast.error(err);
            } else {
              toast.success("Successfully updated ");
              navigate("/");
            }
          });
      }
    }
  };
  const handleSubmitsection6 = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...data[key], // Keep the rest of the sections unchanged
      section6Businessinformation: {
        lastDatasection6: {
          inputbusiness: { ...inputbusiness }, // Copy the input business data
        },
      },
    };

    if (!key) {
      // If no key is provided, it's a new entry, so use push to generate a new key
      dataRef
        .ref()
        .child("Allsections")
        .push(updatedFormData, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Successfully added");
            setBusinessPopup(false);
          }
        });
    } else {
      // If a key is provided, it's an update
      dataRef
        .ref()
        .child(`Allsections/${key}`)
        .update(updatedFormData, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Successfully updated");
            setBusinessPopup(false);
          }
        });
    }
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
      setData({});
    };
  }, [key]);

  useEffect(() => {
    if (data && key && data[key] && data[key].countrycurrency) {
      console.log("Data:", data);
      console.log("Key:", key);
      console.log("Country Currency:", data[key].countrycurrency);
      setCurrency({ ...data[key].countrycurrency });
    } else {
      setCurrency({ ...inititalvaluecurrency });
    }
    return () => {
      setCurrency({ ...inititalvaluecurrency });
    };
  }, [key, data]);

  useEffect(
    (field) => {
      if (data && key && data[key] && singleItem[field]) {
        setItemlist({ ...data[key].section2 });
        console.log(" Data1:", data);
      } else {
        setItemlist({ ...inititalvalue });
      }
      return () => {
        setItemlist({ ...inititalvalue });
        console.log("Updated Data2:", data);
      };
    },
    [key, data]
  );

  useEffect(() => {
    if (data && key && data[key] && data[key].section3message) {
      setInput({ ...data[key].section3message });
    } else {
      setInput({ ...inititalsection3value });
    }
    return () => {
      setInput({ ...inititalsection3value });
      console.log("Updated Data3:", data);
    };
  }, [key, data]); // Include loading state in the dependency array
  useEffect(() => {
    if (data && key && data[key] && data[key].section4memo) {
      setInputuser4({ ...data[key].section4memo });
    } else {
      setInputuser4({ ...inititalsection4value });
    }
    return () => {
      setInputuser4({ ...inititalsection4value });
      console.log("Updated Data4:", data);
    };
  }, [key, data]); // Include loading state in the dependency array
  useEffect(() => {
    if (data && key && data[key] && data[key].section5total?.inputuser5) {
      setInputuser5({ ...data[key].section5total.inputuser5 });
    } else {
      setInputuser5({ ...initialState5 });
    }
    return () => {
      setInputuser5({ ...initialState5 });
      console.log("Updated Data5:", data);
    };
  }, [key, data]); // Include loading state in the dependency array

  useEffect(() => {
    if (
      data &&
      key &&
      data[key] &&
      data[key].section6Businessinformation?.lastDatasection6?.inputbusiness
      // &&  data[key].section6Businessinformation?.imageUrl
    ) {
      setInputbusiness({
        ...data[key].section6Businessinformation.lastDatasection6.inputbusiness,
      });
    } else {
      setInputbusiness({ ...inititalsection6 });
    }
    return () => {
      setInputbusiness({ ...inititalsection6 });
      console.log("Updated Data6:", data);
    };
  }, [key, data]); // Include loading state in the dependency array
  const handleeditbusinessinfo = (e) => {
    e.preventDefault();
    setBusinessPopup(true);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Use FileReader to read the selected image and convert it to a data URL
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target.result;
        setImageUrl(dataURL);
      };

      reader.readAsDataURL(file);
    }
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

  // const renderFields = ({ singleItem, index }) => {
  //   return fields.map((field) => (
  //     <div key={field}>
  //       {singleItem[field] !== undefined && singleItem[field] !== "" && (
  //         <TextField
  //           id="outlined-search"
  //           type="text"
  //           label={field}
  //           style={{
  //             marginRight: "10px",
  //           }}
  //           className=" w-[500px]"
  //           name={field}
  //           value={(singleItem && singleItem[field]) || ""}
  //           onChange={(e) => handlechangeadditemlist(e, index)}
  //         />
  //       )}
  //     </div>
  //   ));
  // };
  const renderFields = ({ singleItem, index }) => {
    return fields.map((field) => {
      const isKey = typeof singleItem === "string";
      console.log("singleItemdiscount:", singleItem);

      return (
        <div key={field}>
          {(!isKey ||
            (singleItem[field] !== undefined && singleItem[field] !== "")) && (
            <TextField
              id="outlined-search"
              type="text"
              label={field}
              style={{
                marginRight: "10px",
              }}
              className=" w-[500px]"
              name={field}
              value={isKey ? "" : (singleItem && singleItem[field]) || ""}
              onChange={(e) =>
                isKey
                  ? handlechangeadditemlist(e, index)
                  : handlechangeadditemlist(e, index)
              }
            />
          )}
        </div>
      );
    });
  };

  const renderFields5 = ({ singleItem, index }) => {
    return fields5.map((field5) => {
      const isKey = typeof singleItem === "string";
      return (
        <div key={field5}>
          {(!isKey ||
            (singleItem[field5] !== undefined &&
              singleItem[field5] !== "")) && (
            <TextField
              id="outlined-search"
              type="text"
              label={field5}
              style={{
                marginRight: "10px",
                width: "100%",
              }}
              className=" w-[500px]"
              name={field5}
              value={isKey ? "" : (singleItem && singleItem[field5]) || ""}
              onChange={(e) =>
                isKey
                  ? handlechangeadditemlist(e, index)
                  : handlechangeadditemlist(e, index)
              }
            />
          )}
        </div>
      );
    });
  };
  // const renderFields5 = ({ singleItem, index }) => {
  //   return fields5.map((field5) => (
  //     <div key={field5}>
  //       {singleItem[field5] !== undefined && singleItem[field5] !== 0 && (
  //         <TextField
  //           id="outlined-search"
  //           type="text"
  //           label={field5}
  //           style={{
  //             marginRight: "10px",
  //             width: "100%",
  //           }}
  //           className=""
  //           name={field5}
  //           value={(singleItem && singleItem[field5]) || ""}
  //           onChange={(e) => handlechangeadditemlist(e, index)}
  //         />
  //       )}
  //     </div>
  //   ));
  // };

  // const renderFields6 = ({ singleItem, index }) => {
  //   return fields6.map((field6) => (
  //     <div key={field6}>
  //       {singleItem[field6] !== undefined && singleItem[field6] !== 0 && (
  //         <TextField
  //           id="outlined-search"
  //           type="text"
  //           label={field6}
  //           style={{
  //             marginRight: "10px",
  //             width: "100%",
  //           }}
  //           className=""
  //           name={field6}
  //           value={(singleItem && singleItem[field6]) || ""}
  //           onChange={(e) => handlechangeadditemlist(e, index)}
  //         />
  //       )}
  //     </div>
  //   ));
  // };
  const renderFields6 = ({ singleItem, index }) => {
    return fields6.map((field6) => {
      const isKey = typeof singleItem === "string";

      return (
        <div key={field6}>
          {(!isKey ||
            (singleItem[field6] !== undefined &&
              singleItem[field6] !== "")) && (
            <TextField
              id="outlined-search"
              type="text"
              label={field6}
              style={{
                marginRight: "10px",
                width: "100%",
              }}
              className=" w-[500px]"
              name={field6}
              value={isKey ? "" : (singleItem && singleItem[field6]) || ""}
              onChange={(e) =>
                isKey
                  ? handlechangeadditemlist(e, index)
                  : handlechangeadditemlist(e, index)
              }
            />
          )}
        </div>
      );
    });
  };
  // const renderFields6 = ({ singleItem, index }) => {
  //   return fields6.map((field6) => (
  //     <div key={field6}>
  //       {singleItem[field6] !== undefined && singleItem[field6] !== 0 && (
  //         <TextField
  //           id="outlined-search"
  //           type="text"
  //           label={field6}
  //           style={{
  //             marginRight: "10px",
  //             width: "100%",
  //           }}
  //           className=""
  //           name={field6}
  //           value={(singleItem && singleItem[field6]) || ""}
  //           onChange={(e) => handlechangeadditemlist(e, index)}
  //         />
  //       )}
  //     </div>
  //   ));
  // };

  // const renderFields7 = ({ singleItem, index }) => {
  //   return fields7.map((field7) => (
  //     <div key={field7}>
  //       {singleItem[field7] !== undefined && singleItem[field7] !== 0 && (
  //         <TextField
  //           id="outlined-search"
  //           type="text"
  //           label={field7}
  //           style={{
  //             marginRight: "10px",
  //             width: "100%",
  //           }}
  //           className=""
  //           name={field7}
  //           value={(singleItem && singleItem[field7]) || ""}
  //           onChange={(e) => handlechangeadditemlist(e, index)}
  //         />
  //       )}
  //     </div>
  //   ));
  // };
  // const renderFields7 = ({ singleItem, index }) => {
  //   return fields7.map((field7) => {
  //     const isKey = typeof singleItem === "string";

  //     return (
  //       <div key={field7}>
  //         {(!isKey ||
  //           (singleItem[field7] !== undefined &&
  //             singleItem[field7] !== "")) && (
  //           <TextField
  //             id="outlined-search"
  //             type="text"
  //             label={field7}
  //             style={{
  //               marginRight: "10px",
  //               width: "100%",
  //             }}
  //             className=" w-[500px]"
  //             name={field7}
  //             value={isKey ? "" : (singleItem && singleItem[field7]) || ""}
  //             onChange={(e) =>
  //               isKey
  //                 ? handlechangeadditemlist(e, index)
  //                 : handlechangeadditemlist(e, index)
  //             }
  //           />
  //         )}
  //       </div>
  //     );
  //   });
  // };
  const renderFields7 = ({ singleItem, index }) => {
    return fields7.map((field7) => {
      const isKey = typeof singleItem === "string";

      const hasDataInDatabase =
        !isKey ||
        (singleItem &&
          singleItem[field7] !== undefined &&
          singleItem[field7] !== "" &&
          singleItem[field7] !== 0);

      return (
        <div key={field7}>
          {hasDataInDatabase && (
            <TextField
              id="outlined-search"
              type="text"
              label={field7}
              style={{
                marginRight: "10px",
                width: "100%",
              }}
              className="w-[500px]"
              name={field7}
              value={(singleItem && singleItem[field7]) || ""}
              onChange={(e) => handlechangeadditemlist(e, index)}
            />
          )}
        </div>
      );
    });
  };

  const renderFields8 = ({ singleItem, index }) => {
    return fields8.map((field8) => {
      const isKey = typeof singleItem === "string";

      return (
        <div key={field8}>
          {(!isKey ||
            (singleItem[field8] !== undefined &&
              singleItem[field8] !== "")) && (
            <TextField
              id="outlined-search"
              type="text"
              label={field8}
              style={{
                marginRight: "10px",
                width: "100%",
              }}
              className=" w-[500px]"
              name={field8}
              value={isKey ? "" : (singleItem && singleItem[field8]) || ""}
              onChange={(e) =>
                isKey
                  ? handlechangeadditemlist(e, index)
                  : handlechangeadditemlist(e, index)
              }
            />
          )}
        </div>
      );
    });
  };
  // const renderFields8 = ({ singleItem, index }) => {
  //   return fields8.map((field8) => (
  //     <div key={field8}>
  //       {singleItem[field8] !== undefined && singleItem[field8] !== 0 && (
  //         <TextField
  //           id="outlined-search"
  //           type="text"
  //           label={field8}
  //           style={{
  //             marginRight: "10px",
  //             width: "100%",
  //           }}
  //           className=""
  //           name={field8}
  //           value={(singleItem && singleItem[field8]) || ""}
  //           onChange={(e) => handlechangeadditemlist(e, index)}
  //         />
  //       )}
  //     </div>
  //   ));
  // };

  const renderFieldsdescription = ({ singleItem, index }) => {
    const isKey = typeof singleItem === "string";

    return fields1.map((field) => (
      <div key={field}>
        {(!isKey ||
          (singleItem[field] !== undefined && singleItem[field] !== "")) && (
          <textarea
            className="peer block h-auto mb-3 w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
            id="exampleFormControlTextarea1"
            rows="4"
            type="text"
            placeholder="Description(optional)"
            name="description"
            value={singleItem[field] || ""}
            onChange={(e) => handlechangeadditemlist(e, index)}
          >
            {" "}
          </textarea>
        )}
      </div>
    ));
  };

  // const renderFieldsdescription = ({ singleItem, index }) => {
  //   return fields1.map((fields1) => (
  //     <div key={fields1}>
  //       {singleItem[fields1] !== undefined && singleItem[fields1] !== "" && (
  //         <textarea
  //           className="peer block h-auto mb-3 w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
  //           id="exampleFormControlTextarea1"
  //           rows="4"
  //           type="text"
  //           placeholder="Description(optional)"
  //           name="description"
  //           value={singleItem[fields1] || ""}
  //           onChange={(e) => handlechangeadditemlist(e, index)}
  //         >
  //           {" "}
  //         </textarea>
  //       )}
  //     </div>
  //   ));
  // };
  const renderFieldstax = ({ singleItem, index }) => {
    return fields2.map((fields2) => {
      const isKey = typeof singleItem === "string";

      return (
        <div key={fields2}>
          {(!isKey ||
            (singleItem[fields2] !== undefined &&
              singleItem[fields2] !== "")) && (
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
                value={isKey ? "" : (singleItem && singleItem[fields2]) || ""}
                onChange={(e) =>
                  isKey
                    ? handlechangeadditemlist(e, index)
                    : handlechangeadditemlist(e, index)
                }
              >
                {taxes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}
        </div>
      );
    });
  };

  const renderFieldsdiscount = ({ singleItem, index }) => {
    return fields3.map((fields3) => {
      const isKey = typeof singleItem === "string";

      return (
        <div key={fields3}>
          {(!isKey ||
            (singleItem[fields3] !== undefined &&
              singleItem[fields3] !== "")) && (
            <TextField
              id="outlined-search"
              type="text"
              label={fields3}
              style={{
                marginRight: "10px",
                width: "100%",
              }}
              className=" w-[500px]"
              name={fields3}
              value={isKey ? "" : (singleItem && singleItem[fields3]) || ""}
              onChange={(e) =>
                isKey
                  ? handlechangeadditemlist(e, index)
                  : handlechangeadditemlist(e, index)
              }
            />
          )}
        </div>
      );
    });
  };
  // const renderFieldsdiscount = ({ singleItem, index }) => {
  //   return fields3.map((fields3) => (
  //     <div key={fields3}>
  //       {singleItem[fields3] !== undefined && singleItem[fields3] !== 0 && (
  //         <TextField
  //           id="outlined-search"
  //           type="text"
  //           label="Discount"
  //           style={{
  //             marginRight: "10px",
  //             width: "100%",
  //           }}
  //           name="discount"
  //           value={singleItem[fields3] || ""}
  //           onChange={(e) => handlechangeadditemlist(e, index)}
  //         />
  //       )}
  //     </div>
  //   ));
  // };
  const renderFieldsdate = ({ singleItem, index }) => {
    return fields4.map((fields4) => {
      const isKey = typeof singleItem === "string";

      return (
        <div key={fields4}>
          {(!isKey ||
            (singleItem[fields4] !== undefined &&
              singleItem[fields4] !== "")) && (
            <TextField
              id="outlined-search"
              type="date"
              style={{
                marginRight: "10px",
                width: "100%",
              }}
              name="date"
              value={isKey ? "" : (singleItem && singleItem[fields4]) || ""}
              onChange={(e) =>
                isKey
                  ? handlechangeadditemlist(e, index)
                  : handlechangeadditemlist(e, index)
              }
            />
          )}
        </div>
      );
    });
  };
  // const renderFieldsdate = ({ singleItem, index }) => {
  //   return fields4.map((fields4) => {
  //     const isKey = typeof singleItem === "string";
  //     const fieldValue = singleItem[fields4];

  //     console.log(`Field: ${fields4}`);
  //     console.log(`isKey: ${isKey}`);
  //     console.log(`fieldValue: ${fieldValue}`);
  //     console.log("singleItem:", singleItem);

  //     return (
  //       <div key={fields4}>
  //         {(!isKey ||
  //           (fieldValue[fields4] !== undefined &&
  //             fieldValue[fields4] !== "")) && (
  //           <TextField
  //             id="outlined-search"
  //             type="date"
  //             style={{
  //               marginRight: "10px",
  //               width: "100%",
  //             }}
  //             name="date"
  //             // value={isKey ? "" : (singleItem && singleItem[fields4]) || ""}
  //             value={isKey ? "" : fieldValue || ""}
  //             onChange={(e) =>
  //               isKey
  //                 ? handlechangeadditemlist(e, index)
  //                 : handlechangeadditemlist(e, index)
  //             }
  //           />
  //         )}
  //       </div>
  //     );
  //   });
  // };
  // const renderFieldsdate = ({ singleItem, index }) => {
  //   return fields4.map((field) => {
  //     const isKey = typeof singleItem === "string";
  //     const fieldValue = singleItem[field];

  //     console.log(`Field: ${field}`);
  //     console.log(`isKey: ${isKey}`);
  //     console.log(`fieldValue: ${fieldValue}`);
  //     console.log("singleItemdate:", singleItem);

  //     return (
  //       <div key={field}>
  //         {(!isKey ||
  //           (fieldValue !== undefined && fieldValue[field] !== "")) && (
           
  //           <input
  //             type="date"
  //             name={field}
  //             className="p-4 border flex items-start ml-6 border-gray-300"
  //             value={isKey ? "" : (fieldValue && fieldValue[field]) || ""}
  //             onChange={(e) =>
  //               isKey
  //                 ? handlechangeadditemlist(e, index)
  //                 : handlechangeadditemlist(e, index)
  //             }
  //           />
  //         )}
  //       </div>
  //     );
  //   });
  // };

  // const renderFields = ({ singleItem, index }) => {
  //   return fields.map((field) => {
  //     const isKey = typeof singleItem === "string";
  //     console.log("singleItemdiscount:", singleItem);

  //     return (
  //       <div key={field}>
  //         {(!isKey ||
  //           (singleItem[field] !== undefined && singleItem[field] !== "")) && (
  //           <TextField
  //             id="outlined-search"
  //             type="text"
  //             label={field}
  //             style={{
  //               marginRight: "10px",
  //             }}
  //             className=" w-[500px]"
  //             name={field}
  //             value={isKey ? "" : (singleItem && singleItem[field]) || ""}
  //             onChange={(e) =>
  //               isKey
  //                 ? handlechangeadditemlist(e, index)
  //                 : handlechangeadditemlist(e, index)
  //             }
  //           />
  //         )}
  //       </div>
  //     );
  //   });
  // };

  // const renderFieldsdate = ({ singleItem, index }) => {
  //   return fields4.map((fields4) => (
  //     <div key={fields4}>
  //       {singleItem[fields4] !== undefined && singleItem[fields4] !== 0 && (
  //         <TextField
  //           id="outlined-search"
  //           type="date"
  //           style={{
  //             marginRight: "10px",
  //             width: "100%",
  //           }}
  //           name="date"
  //           value={singleItem[fields3]}
  //           onChange={(e) => handlechangeadditemlist(e, index)}
  //         />
  //       )}
  //     </div>
  //   ));
  // };

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

  // const renderSelecteddiscountFields = ({ singleItem, index }) => {
  //   return selecteddiscountFields.map((field) => {
  //     const isKey = typeof singleItem === "string";
  //     return (
  //       <div key={field}>
  //         {(!isKey ||
  //           (singleItem[field] !== undefined && singleItem[field] !== "")) && (
  //           <div key={field}>
  //             <TextField
  //               id="outlined-search"
  //               type="text"
  //               label="Discount"
  //               name="discount"
  //               style={{
  //                 marginRight: "10px",
  //                 width: "100%",
  //               }}
  //               value={isKey ? "" : (singleItem && singleItem[field]) || ""}
  //               onChange={(e) =>
  //                 isKey
  //                   ? handlechangeadditemlist(e, index)
  //                   : handlechangeadditemlist(e, index)
  //               }
  //             />
  //           </div>
  //         )}
  //       </div>
  //     );
  //   });
  // };
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
  if (lastData !== null && lastData.length > 0) {
    return <div>No data available</div>;
  }
  // const inputusersection5 = data[key]?.section5total?.inputuser5;
  const subtotal1 = data[key]?.section2.reduce((accumulator, item) => {
    if (item.discount) {
      return accumulator + (item.price * item.quantity * item.discount) / 100;
    }
    return accumulator + item.price * item.quantity;
  }, 0);
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
                          value={inputbusiness.fname || ""}
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
                          value={inputbusiness.lname || ""}
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
                        value={inputbusiness.businessname || ""}
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
                        value={inputbusiness.address1 || ""}
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
                        value={inputbusiness.address2 || ""}
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
                        value={inputbusiness.email || ""}
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
                        value={inputbusiness.website || ""}
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
                        value={inputbusiness.pin || ""}
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
                        value={inputbusiness.additionalinfo || ""}
                        onChange={handleChangesection6}
                      />
                    </div>
                    <div className="flex justify-center   mt-10">
                      {/* <button
                        className="text-white bg-[#003087] px-9 py-3  rounded-full    font-extrabold text-lg"
                        type="submit"
                        onClick={handleSubmitsection6}
                      >
                        Save
                      </button> */}
                      <input
                        className="px-8 py-3  rounded-3xl  bg-blue-900 text-white font-bold mx-auto cursor-pointer"
                        value={key ? "Update" : "Save"}
                        onClick={handleSubmitsection6}
                        type="submit"
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
                  Edit invoice no.
                  {inputuser5.invoicenumber}
                </p>
              </div>
              <div className=" flex items-center  justify-end ">
                <div className="flex items-center ">
                  <BsThreeDotsVertical className="mr-8 text-[23px] text-gray-600" />

                  <BsCamera className="mr-8 text-xl text-gray-600" />

                  <input
                    className="text-white bg-[#003087] px-9 py-3   mr-5 rounded-full font-extrabold text-lg cursor-pointer"
                    type="submit"
                    value={key ? "Update" : "Save"}
                  />
                </div>
              </div>
            </div>
            <div className="flex   w-[97%]  mx-auto gap-5  ">
              <div className="w-[75%]">
                <div className="border-2    h-auto rounded-xl bg-white ">
                  {/*===================================   section-1  =============================== */}
                  <div className="">
                    <div className=" flex justify-end w-full mt-3 pr-4">
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="currency-select-label">
                            Currency
                          </InputLabel>

                          <Select
                            labelId="currency-select-label"
                            id="currency-select"
                            value={data[key]?.countrycurrency || ""}
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
                    <div className="flex items-center p-3 ml-5">
                      <p className="font-extrabold text-xl">Bill To</p>
                    </div>

                    <div className="mx-auto  w-[97%]  border-2 h-36 rounded-xl">
                      <div className="flex items-center w-full   mt-10 pl-10">
                        <p className="text-2xl  w-full   font-semibold">
                          {" "}
                          {lastData && (
                            <>
                              {/* {lastData.email} */}
                              {data[key]?.section1?.email || (
                                <p className="flex w-64 ">
                                  Email not available
                                </p>
                              )}
                            </>
                          )}
                        </p>
                        <button
                          className="text-2xl   flex justify-end    pr-20 font-extrabold "
                          onClick={Deleteemail}
                        >
                          <RxCross1 />
                        </button>
                      </div>
                      {/* <button
                        className="mt-3 text-blue-600 pl-10  text-2xl   font-semibold"
                        onClick={() => {
                          navigate("");
                        }}
                      ></button> */}

                      <Link to={`/editcustomer/${key}`}>
                        <button className="mt-3 text-blue-600 pl-10  text-2xl   font-semibold">
                          Edit Customer information
                        </button>
                      </Link>
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
                    {/* {data[key]?.section2 ? (
                      data[key].section2.map((key, index) => (
                        <div className="flex">
                          <div
                            className="h-auto  w-[97%] mt-4  border-2 rounded-xl mx-auto  "
                            id="additems"
                            key={index}
                          >
                            {customiseui ? (
                              <div className="p-3   ">
                                <div className="   flex items-center ">
                                  <div className="flex gap-4">
                                    {renderFields({ singleItem: key, index })}
                                    {renderFields5({ singleItem: key, index })}
                                    {renderFields6({ singleItem: key, index })}
                                    {renderFields7({ singleItem: key, index })}

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
                              {key && (
                                <>
                                  <p className="font-bold text-md">
                                    Amounts: $
                                    {key.discount
                                      ? (key.price *
                                          key.quantity *
                                          key.discount) /
                                        100
                                      : key.price * key.quantity}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                          <button
                            className="text-2xl     font-extrabold"
                            onClick={() => removeItem(index)}
                          >
                            <RxCross1 />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>Section 2 data is missing or undefined</p>
                    )} */}
                    {data[key]?.section2 && data[key].section2.length > 0 ? (
                      data[key].section2.map((key, index) => (
                        <div className="flex" key={index}>
                          <div
                            className="h-auto  w-[97%] mt-4  border-2 rounded-xl mx-auto  "
                            id="additems"
                          >
                            {customiseui ? (
                              <div className="p-3   ">
                                <div className="   flex items-center ">
                                  <div className="flex gap-4">
                                    {renderFields({ singleItem: key, index })}
                                    {key.quantity !== undefined &&
                                      key.quantity !== "" &&
                                      key.quantity !== 0 &&
                                      renderFields5({ singleItem: key, index })}
                                    {key.price !== undefined &&
                                      key.price !== "" &&
                                      key.price !== 0 &&
                                      renderFields6({ singleItem: key, index })}

                                    {key.hours !== undefined &&
                                      key.hours !== "" &&
                                      key.hours !== 0 &&
                                      renderFields7({ singleItem: key, index })}

                                    {key.tax !== undefined &&
                                      key.tax !== "" &&
                                      key.tax !== 0 &&
                                      renderFieldstax({
                                        singleItem: key,
                                        index,
                                      })}
                                    {key.discount !== undefined &&
                                      key.discount !== "" &&
                                      key.discount !== 0 &&
                                      renderFieldsdiscount({
                                        singleItem: key,
                                        index,
                                      })}
                                    {key.date !== undefined &&
                                      key.date !== "" &&
                                      key.date !== 0 &&
                                      renderFieldsdate({
                                        singleItem: key,
                                        index,
                                      })}
                                  </div>
                                </div>
                                <div>
                                  {key.description !== undefined &&
                                    key.description !== "" &&
                                    key.description !== 0 &&
                                    renderFieldsdescription({
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
                                  {renderSelectedFields7({
                                    singleItem: key,
                                    index,
                                  })}
                                  {renderSelectedFields8({
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
                                  {renderSelecteddescriptionFields({
                                    singleItem: key,
                                    index,
                                  })}
                                </div>
                              </div>
                            )}
                            <div className="flex justify-end pr-7 pb-3">
                              {key && (
                                <>
                                  <p className="font-bold text-md">
                                    Amounts: $
                                    {key.discount
                                      ? (key.price *
                                          key.quantity *
                                          key.discount) /
                                        100
                                      : key.price * key.quantity}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                          <button
                            className="text-2xl     font-extrabold"
                            onClick={() => removeItem(index)}
                          >
                            <RxCross1 />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>Section 2 data is missing or undefined</p>
                    )}

                    {/* {key.length - 1 === index && (
                      <button
                        className=" ml-4 mt-3 text-blue-600  font-extrabold  flex items-center text-xl "
                        onClick={handleAddItem}
                      >
                        <AiOutlinePlus className="mr-2" /> Add items or Service
                      </button>
                    )} */}
                    <button
                      className=" ml-4 mt-3 text-blue-600  font-extrabold  flex items-center text-xl "
                      onClick={handleAddItem}
                    >
                      <AiOutlinePlus className="mr-2 " /> Add items or Service
                    </button>
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
                        value={input.section3messege || ""}
                        onChange={handleChangesection3}
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
                                value={inputuser4.memo || ""}
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
                </div>
              </div>

              <div className=" w-[25%]  text-center ">
                <div className="h-auto border rounded-xl bg-white">
                  <div className="flex items-center h-20   w-full">
                    <div className="flex items-center justify-start ml-3 mt-3 w-full">
                      <div>
                        {imageUrl && <img src={imageUrl} alt="Uploaded" />}
                        {imageUrl && (
                          <>{data[key]?.section6Businessinformation.imageUrl}</>
                        )}
                      </div>
                      <div>
                        {businessdata && (
                          <>
                            <div className="text-lg font-bold pl-5">
                              {" "}
                              {/* {businessname} */}
                              {
                                data[key]?.section6Businessinformation
                                  ?.lastDatasection6?.inputbusiness?.email
                              }
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
                        {businessdata && (
                          <div className="flex items-center">
                            <div className="text-2xl text-black  mt-2 pl-2 gap-3">
                              <p className="text-[20px] text-black flex  items-center ">
                                <i>
                                  {" "}
                                  <FaRegAddressCard className="text-blue-900 mr-3 text-3xl " />
                                </i>{" "}
                                {
                                  data[key]?.section6Businessinformation
                                    ?.lastDatasection6?.inputbusiness?.address2
                                }
                                {/* {address2} */}
                              </p>
                              <p className="text-[20px] text-black flex  items-center  pl-8">
                                {/* {pin} */}
                              </p>
                              <p className="text-[20px] text-black flex  items-center mt-3">
                                <i>
                                  {" "}
                                  <IoMdMail className="text-blue-900 mr-3 text-3xl " />
                                </i>{" "}
                                {/* {email} */}
                                {
                                  data[key]?.section6Businessinformation
                                    ?.lastDatasection6?.inputbusiness?.email
                                }
                              </p>

                              <p className="text-[20px] text-black flex items-center mt-3 mb-4 ">
                                <CgWebsite className="text-blue-900 mr-3 text-3xl " />
                                {/* {website} */}
                                {
                                  data[key]?.section6Businessinformation
                                    ?.lastDatasection6?.inputbusiness?.website
                                }
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center">
                          <input
                            type="file"
                            // onChange={(e) => setSelectedImage(e.target.files[0])}
                            onChange={handleImageChange}
                          />
                          {/* <button
                      className="text-blue-600 w-full text-lg font-bold"
                      onClick={handleImageUpload}
                    >
                      Upload
                    </button> */}

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
                  {" "}
                  {inputuser5 && (
                    <>
                      {" "}
                      <Box
                        component=""
                        sx={{
                          "& > :not(style)": { m: 1, width: "90%" },
                        }}
                        noValidate
                        autoComplete="off"
                        className="flex items-start pl-4"
                        name="invoicenumber"
                      >
                        <TextField
                          type="text"
                          id="outlined-uncontrolled"
                          label="Invoice Number"
                          name="invoicenumber"
                          value={inputuser5?.invoicenumber || ""}
                          onChange={handleChangesection5}
                        />
                      </Box>
                      <input
                        type="date"
                        name="invoicedate"
                        className="p-4 border flex items-start ml-6 border-gray-300"
                        value={inputuser5?.invoicedate || ""}
                        onChange={handleChangesection5}
                      />{" "}
                      <select
                        id="dropdown-select"
                        className="w-[90%] py-4 mt-2 px-3 text-base border border-gray-500 rounded-md box-border"
                        name="invoicedue"
                        value={inputuser5?.invoicedue || ""}
                        onChange={handleChangesection5}
                      >
                        <option defaultValue disabled value="">
                          ---select Due---
                        </option>
                        {days?.map((days, index) => (
                          <option key={index}>{days?.value}</option>
                        ))}
                      </select>
                      <div className="mx-auto mt-3  h-[300px] grid grid-cols-2">
                        <div>
                          <p className="font-semibold w-full text-lg p-3">
                            Subtotal{" "}
                          </p>
                          <p className="font-semibold text-lg p-3">
                            Other Discounts{" "}
                          </p>
                          <p className="font-semibold text-lg p-3">Shipping </p>
                          <p className="font-semibold text-lg p-3">
                            Other Amount{" "}
                          </p>
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
                              <p className="font-bold text-md">{subtotal1}</p>
                            </>
                          )}
                          {isVisiblehours && (
                            <>
                              <p className="font-bold text-md"></p>
                            </>
                          )}

                          {isVisibleaccount && (
                            <>
                              {" "}
                              <p className="font-bold text-md"></p>
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
                                    onChange={(e) =>
                                      setDiscount(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                      handleKeyDown(e, "discount")
                                    }
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
                                    onChange={(e) =>
                                      setShipping(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                      handleKeyDown(e, "shipping")
                                    }
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
                                    onChange={(e) =>
                                      setOtherAmount(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                      handleKeyDown(e, "otherAmount")
                                    }
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
                          <p className="p-3 font-extrabold ">
                            {/* {JSON.stringify(data[key].countrycurrency)} */}
                          </p>
                          {/* {isVisibleinvoicepage && <></>}
                          {isVisiblehours && (
                            <>
                              <p className="p-3 font-extrabold ">
                                {JSON.stringify(data[key].countrycurrency)}
                              </p>
                            </>
                          )}
                          {isVisibleaccount && (
                            <>
                              {" "}
                              <p className="p-3 font-bold ">
                                {JSON.stringify(data[key].countrycurrency)}
                              </p>
                            </>
                          )} */}
                        </div>
                      </div>
                    </>
                  )}
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
