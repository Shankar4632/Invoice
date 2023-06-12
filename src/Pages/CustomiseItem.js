import React from "react";
import { useState } from "react";
//import material UI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InvoicePage from "./InvoicePage";

//import reacticons
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//import Routes
import { useNavigate } from "react-router-dom";

const CustomiseItem = () => {
  //Hooks or states
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [fields, setFields] = useState(["name", "username", "password"]);
  const [fields1, setField1] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selecteddescriptionFields, setSelecteddescriptionFields] = useState(
    []
  );
  const [isSaved, setIsSaved] = useState(false);

  //for selection on checkbox change

  //function calling

  //checkbox selection only

  const navigate = useNavigate();
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
  // Handle save button click
  // const handleSaveClick = () => {
  //   Process the form data
  //   You can access the values using the field names and perform further actions
  //   setSelectedFields(fields);
  //   setSelecteddescriptionFields(fields1);
  //   navigate("/", {
  //     state: { selectedFields: fields, selectedDescriptionFields: fields1 },
  //   });
  // };
  const handleSaveClick = () => {
    setSelectedFields(fields);
    setSelecteddescriptionFields(fields1);
    setIsSaved(true);
  };

  // Render the form fields
  const renderFields = () => {
    return fields.map((field) => (
      <div key={field}>
        <input
          id="outlined-search"
          type="text"
          className="w-36  ml-2 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
          placeholder={field}
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

  // Render the selected fields below the form
  const renderSelectedFields = () => {
    return selectedFields.map((field) => (
      <div key={field}>
        <input
          id="outlined-search"
          type="text"
          className="w-36  ml-2 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
          placeholder={field}
          name={field}
          value={field}
          readOnly
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

  //////////////////////// return statement  /////////////////////////
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
              <MenuItem value="template1">Amounts only</MenuItem>
              <MenuItem value="template2">Hours</MenuItem>
              <MenuItem value="template3">Quantity</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div className="h-auto w-[95%] mx-auto mt-3 border-2 border-gray-300 rounded-xl">
          <div className="p-3   ">
            <div className="   flex items-center ">
              <div className="flex">{renderFields()}</div>
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
              onChange={handleCheckboxChange}
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
        {isSaved ? (
          <div className="h-auto w-[95%] mx-auto mt-3 border-2 border-gray-300 rounded-xl">
            <div className="p-3">
              <div className="flex items-center">{renderSelectedFields()}</div>
              <div>{renderSelecteddescriptionFields()}</div>
            </div>
          </div>
        ) : (
          <button
            className="px-8 py-3 rounded-3xl bg-blue-900 text-white font-bold mx-auto"
            type="submit"
            onClick={handleSaveClick}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomiseItem;
