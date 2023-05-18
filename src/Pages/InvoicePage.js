import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { MdModeEditOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { RxDividerVertical } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";

import { BsArrowLeft, BsThreeDotsVertical, BsCamera } from "react-icons/bs";

const InvoicePage = () => {
  const [selectedTemplate, setSelectedTemplate] = React.useState("");
  const [currency, setCurrency] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [textareaValue, setTextareaValue] = useState("");

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

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
                    <MenuItem value="template1">Ten</MenuItem>
                    <MenuItem value="template2">Twenty</MenuItem>
                    <MenuItem value="template3">Thirty</MenuItem>
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
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="RUPEE">RUPEE</MenuItem>
                    <MenuItem value="EUROS">EUROS</MenuItem>
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
            <div className="mx-auto w-full ">
              <Autocomplete
                id="grouped-demo"
                options={options.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.title}
                sx={{
                  width: 250,
                  minWidth: "97%",

                  marin: "0 auto",
                }}
                renderInput={(params) => (
                  <TextField {...params} label="With categories" />
                )}
              />
            </div>
            <div className="flex items-center pl-3 pt-20">
              <p className="font-bold text-lg">Items</p>
              <button className=" text-blue-500 text-xl font-bold  rounded-full w-full flex justify-end items-center mr-3">
                <MdModeEditOutline className="mr-1" /> Customise
              </button>
            </div>
            <div className="h-64 w-[97%] mt-4  border-2 rounded-xl mx-auto  ">
              <div className="flex items-center mx-auto  w-[97%] mt-3">
                <Box sx={{ width: 500, maxWidth: "25%" }}>
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
                    marginRight: "10px",
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
                    defaultValue="EUR"
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
                className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]"
                id="exampleFormControlTextarea1"
                rows="5"
                placeholder="Description(optional)"
                value={textareaValue}
                onChange={handleTextareaChange}
              ></textarea>
            </div>
            <button className="text-bold ml-4 mt-3 text-blue-600  font-bold flex items-center text-xl ">
              <AiOutlinePlus className="mr-2" /> Add items or Service
            </button>
            <div className=" p-3 mt-10">
              <p className="font-bold text-lg">Message To Customer</p>
              <div className="relative mb-2" data-te-input-wrapper-init>
                <textarea
                  className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
                  id="exampleFormControlTextarea1"
                  rows="6"
                  value={textareaValue}
                  onChange={handleTextareaChange}
                  placeholder="Seller note to customer"
                >
                  {" "}
                </textarea>
                <div className="flex items-center ">
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
            <div className="p-3 mt-10 flex items-center">
              <p className=" text-[27px] font-semibold w-full">More Options</p>
              <div className="flex justify-end w-full">
                <button>
                  {" "}
                  <IoIosArrowUp className="text-2xl text-gray-500" />{" "}
                </button>
              </div>
            </div>
            <hr className="border w-[97%] mx-auto" />
            <div className="">
              <p className="text-xl p-3 font-bold">Attachments</p>
              <button className="text-[#003087] ml-3  font-bold border-2 border-[#003087] px-4 py-1 rounded-full text-sm">
                Upload files
              </button>
              <p className="text-sm font-semibold p-3 text-gray-800">
                JPG GIF PNG PDF | Up to 5 files , 4MB per file
              </p>
            </div>
            <div className=" p-3 mt-10 mb-4">
              <p className="font-bold text-lg">Memo To Self</p>
              <div className="relative mb-2" data-te-input-wrapper-init>
                <textarea
                  className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
                  id="exampleFormControlTextarea1"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
const top100Films = [
  { title: "The Shawshank Redemption" },
  { title: "The Godfather" },
  { title: "The Godfather: Part II" },
  { title: "The Dark Knight" },
  { title: "12 Angry Men" },
];
