//Reactjs Library imports
import * as React from "react";
import { useState } from "react";
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

import { BsArrowLeft, BsThreeDotsVertical, BsCamera } from "react-icons/bs";
//Reat Router Dom
import { useNavigate } from "react-router-dom";
// import currencies json
import Currencydata from "../json file/currencies.json";
const Hours = () => {
  //hooks or States
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [currency, setCurrency] = React.useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showAddButton, setShowAddButton] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  //Function Calling
  const navigate = useNavigate();
  const handleClick = () => {
    setShowAddButton(true);
  };
  const handleselectedTemplate = (event) => {
    setSelectedTemplate(event.target.value);
  };
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  const handlecurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const receipt = [
    {
      value: "on receipt",
      label: "on receipt",
    },
    {
      value: "without receipt ",
      label: "without receipt",
    },
  ];
  //Return Statements
  return (
    <div>
      <div className=" ">
        <div className="grid grid-cols-2 h-40 ">
          <div className="  ">
            <div className="pt-8 pl-3  flex items-center">
              <BsArrowLeft className="text-2xl" />
              <span className="font-bold text-blue-600 text-lg pl-2 ">
                Back to invoice
              </span>
            </div>

            <p className="pl-3 text-[43px] font-semibold mt-1">
              New invoice No (23/23-03)
            </p>
          </div>
          <div className=" flex items-center  justify-end ">
            <div className="flex items-center ">
              <BsThreeDotsVertical className="mr-8 text-[23px] text-gray-600" />
              <BsCamera className="mr-8 text-xl text-gray-600" />
              <button className="text-white bg-[#003087] px-9 py-3   mr-5 rounded-full    font-extrabold text-lg">
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="flex   w-[97%]  mx-auto  gap-5 ">
          <div className="border w-[75%] h-auto rounded-xl bg-white ">
            <div className=" flex justify-end w-full mt-3 pr-4">
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
            <div className="flex items-center p-3">
              <p className="font-bold text-lg">Bill To</p>
              <button className="rounded-full bg-[#003087] px-3 py-1 text-white font-bold ml-3">
                invoice single customer
              </button>
              <button className="rounded-full border-2 border-[#003087]  px-3 py-1 text-[#003087] font-bold ml-3">
                invoice multiple customer
              </button>
            </div>
            <div className="mx-auto w-[97%] ">
              <input
                required
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
            <div className="flex items-center pl-3 pt-20">
              <p className="font-bold text-lg">Items</p>
              <button
                className=" text-blue-500 text-xl font-bold  rounded-full w-full flex justify-end items-center mr-3"
                onClick={() => navigate("/customise")}
              >
                <MdModeEditOutline className="mr-1" /> Customise
              </button>
            </div>
            <div className="h-64 w-[97%] mt-4  border-2 rounded-xl mx-auto  ">
              <div className="flex items-center mx-auto  w-[97%] mt-3 gap-10">
                <Box sx={{ width: 500, maxWidth: "100%", border: "" }}>
                  <FormControl fullWidth>
                    <InputLabel id="dropdown-label">Item Name</InputLabel>
                    <Select
                      labelId="dropdown-label"
                      id="dropdown-select"
                      value={selectedOption}
                      label="Dropdown"
                      onChange={handleOptionChange}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  id="outlined-uncontrolled"
                  label="Hours"
                  defaultValue="1"
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
              </div>
              <textarea
                className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]"
                id="exampleFormControlTextarea1"
                rows="5"
                placeholder="Description(optional)"
                value={textareaValue}
                onChange={handleTextareaChange}
              ></textarea>
            </div>
            <button
              className="text-bold ml-4 mt-3 text-blue-600  font-bold flex items-center text-xl "
              onClick={() => navigate("/additems")}
            >
              <AiOutlinePlus className="mr-2" /> Add items or Service
            </button>
          </div>
          <div className=" w-[25%]  ">
            <div className="h-[200px] border rounded-xl bg-white">1</div>
            <div className="h-[700px] border rounded-xl bg-white mt-4 pt-8 pl-4 ">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "90%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-uncontrolled"
                  label="Invoice Number"
                  defaultValue="23/24-03"
                />
              </Box>
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
                  label="Due"
                  defaultValue="EUR"
                >
                  {receipt.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <div className="mx-auto mt-3 border h-[350px] grid grid-cols-2 ">
                <div>
                  <p className="font-semibold w-full text-lg p-3">Subtotal </p>
                  <p className="font-semibold text-lg p-3">Other Discounts </p>
                  <p className="font-semibold text-lg p-3">Shipping </p>
                  <p className="font-semibold text-lg p-3">Other Amount </p>
                  <p className="font-semibold text-lg p-3">Total </p>
                </div>
                <div className="">
                  <p className="p-3">$0.00</p>
                  <p className="p-3">
                    <i className="p-2 text-blue-600 rounded-xl text-lg font-bold not-italic cursor-pointer">
                      Add
                    </i>
                  </p>
                  <p className="p-3 mt-8">
                    <i className=" p-2 text-blue-600 rounded-xl text-lg font-bold not-italic cursor-pointer">
                      Add
                    </i>
                  </p>
                  <p className="p-3">
                    <i className="p-2 text-blue-600 rounded-xl text-lg font-bold not-italic cursor-pointer">
                      Add
                    </i>
                  </p>
                  <p className="p-3"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hours;
