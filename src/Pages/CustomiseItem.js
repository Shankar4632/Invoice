import React from "react";
import { useState } from "react";
//import material UI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//import reacticons
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//import Routes
import { useNavigate } from "react-router-dom";

const CustomiseItem = () => {
  //Hooks or states
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  //function calling
  const navigate = useNavigate();
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleselectedTemplate = (event) => {
    setSelectedTemplate(event.target.value);
  };
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
  // return statement
  return (
    <div className="bg-white h-auto w-[70%] mx-auto border">
      <div className="flex items-center  mt-4">
        <i className="w-full flex justify-center text-blue-600  ">
          <FaPaypal className="text-3xl" />
        </i>
        <i
          className="flex  justify-end pr-3 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
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
            <InputLabel id="template-select-label">Choose Type</InputLabel>

            <Select
              labelId="template-select-label"
              id="template-select"
              value={selectedTemplate}
              label="Choose Type"
              onChange={handleselectedTemplate}
            >
              <MenuItem value="template1">Ten</MenuItem>
              <MenuItem value="template2">Twenty</MenuItem>
              <MenuItem value="template3">Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div className="h-56 w-[95%] mx-auto mt-3 border-2 border-gray-300 rounded-xl">
          <div className="p-3 ">
            <div className=" max-w-1/4 flex items-center w-full">
              <select
                id="dropdown-select"
                className="w-60 py-4 px-3 text-base border border-gray-300 rounded-md box-border"
              >
                <option value="">None</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
              <input
                id="outlined-search"
                type="search"
                className=" w-1/4 ml-6 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
                placeholder="Quantity"
              />
              <input
                id="outlined-search"
                type="search"
                className=" w-1/4 ml-6 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
                placeholder="Price"
              />
              <form className="ml-6">
                <div className="w-full">
                  <select
                    id="outlined-select-currency"
                    className="w-full py-4 px-3 border border-gray-400 rounded-md"
                  >
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </div>
          <div className="">
            <textarea
              className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
              id="exampleFormControlTextarea1"
              rows="4"
              placeholder="Description(optional)"
              value={textareaValue}
              onChange={handleTextareaChange}
            >
              {" "}
            </textarea>
          </div>
        </div>
        <div className="w-[97%] p-5  mx-auto mt-5">
          <p className="text-lg font-semibold text-gray-700">
            Choose item field
          </p>
          <div>
            <input
              type="checkbox"
              id="Discount"
              name="Discount"
              value="Discount"
              className="mt-5 p-3 h-5 w-5  text-center"
            />
            <label
              for="vehicle1"
              className="text-lg font-semibold text-gray-700"
            >
              {" "}
              Discount
            </label>
            <br />
            <input
              type="checkbox"
              id="vehicle2"
              name="vehicle2"
              value="Car"
              className="mt-5 h-5 w-5"
            />
            <label
              for="vehicle2"
              className="text-lg font-semibold text-gray-700"
            >
              {" "}
              Tax
            </label>
            <br />
            <input
              type="checkbox"
              id="vehicle3"
              name="vehicle3"
              value="Boat"
              className="mt-5 h-5 w-5"
            />
            <label
              for="vehicle3"
              className="text-lg font-semibold pl-1 text-gray-700"
            >
              Description
            </label>
            <br />
            <input
              type="checkbox"
              id="vehicle3"
              name="vehicle3"
              value="Boat"
              className="mt-5 h-5 w-5 "
            />
            <label
              for="vehicle3"
              className="text-lg font-semibold text-gray-700"
            >
              {" "}
              Date
            </label>
          </div>
        </div>{" "}
      </form>
      <div className="text-center pb-10">
        <button className="px-8 py-3 rounded-3xl  bg-blue-800 text-white font-bold mx-auto ">
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomiseItem;
