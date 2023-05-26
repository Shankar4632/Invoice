import React from "react";
import { useState, useEffect } from "react";
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
  //for selection on checkbox change
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [fieldVisibility, setFieldVisibility] = useState({
    Discount: false,
    Tax: false,
    date: false,
    description: false,
  });

  //function calling

  //checkbox selection only
  useEffect(() => {
    const updatedFieldVisibility = {
      Discount: selectedCheckboxes.includes("Discount"),
      Tax: selectedCheckboxes.includes("Tax"),
      date: selectedCheckboxes.includes("date"),
      description: selectedCheckboxes.includes("description"),
    };
    setFieldVisibility(updatedFieldVisibility);
  }, [selectedCheckboxes]);

  const navigate = useNavigate();
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleselectedTemplate = (event) => {
    setSelectedTemplate(event.target.value);
  };
  const handleSave = () => {
    console.log(selectedCheckboxes);
    navigate("/", {
      state: { selectedCheckboxes },
    });
  };
  const tax = [
    {
      value: "No Tax",
      label: "No Tax",
    },
    {
      value: "Tax able",
      label: "Tax able",
    },
  ];
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
              <select
                id="dropdown-select"
                name="selectoptions"
                className="w-1/2  py-4 px-3 text-base border border-gray-300 rounded-md box-border"
              >
                <option value="" defaultValue disabled>
                  Item Name
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>

              <input
                id="outlined-search"
                type="search"
                className="w-1/2  ml-6 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
                placeholder="Quantity"
                name="Quantity"
              />

              <input
                id="outlined-search"
                type="search"
                className="w-1/2 ml-4 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
                placeholder="Price"
                name="Price"
              />

              {fieldVisibility.Discount && (
                <input
                  id="outlined-search"
                  type="search"
                  className="w-1/2 ml-4 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
                  placeholder="Discount"
                  name="Discount"
                />
              )}
              {fieldVisibility.date && (
                <input
                  id="outlined-search"
                  type="date"
                  className="w-1/2 ml-4 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
                  placeholder="Price"
                  name="Price"
                />
              )}

              <div className="w-full">
                {selectedCheckboxes.includes("Tax") && (
                  <select
                    id="outlined-select-currency"
                    name="taxes"
                    className="w-1/2 ml-4 py-4 px-3   border border-gray-400 rounded-md"
                  >
                    {tax.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
          <div className="">
            {fieldVisibility.description && (
              <textarea
                className="peer block min-h-[auto] mb-3 w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
                id="exampleFormControlTextarea1"
                rows="4"
                placeholder="Description(optional)"
                value={textareaValue}
                onChange={handleTextareaChange}
              >
                {" "}
              </textarea>
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
              id="Discount"
              name="Discount"
              value="Discount"
              className="mt-5 p-3 h-5 w-5  text-center"
              onChange={(event) => {
                const checkboxValue = event.target.value;
                setSelectedCheckboxes((prevCheckboxes) => {
                  if (prevCheckboxes.includes(checkboxValue)) {
                    return prevCheckboxes.filter(
                      (value) => value !== checkboxValue
                    );
                  } else {
                    return [...prevCheckboxes, checkboxValue];
                  }
                });
              }}
            />
            <label
              htmlFor="Tax"
              className="text-lg font-semibold text-gray-700"
            >
              {" "}
              Discount
            </label>
            <br />
            <input
              type="checkbox"
              id="Tax"
              name="Tax"
              value="Tax"
              className="mt-5  h-5 w-5"
              onChange={(event) => {
                const checkboxValue = event.target.value;
                setSelectedCheckboxes((prevCheckboxes) => {
                  if (prevCheckboxes.includes(checkboxValue)) {
                    return prevCheckboxes.filter(
                      (value) => value !== checkboxValue
                    );
                  } else {
                    return [...prevCheckboxes, checkboxValue];
                  }
                });
              }}
            />
            <label
              htmlFor="Quantity"
              className="text-lg font-semibold text-gray-700"
            >
              {" "}
              Tax
            </label>

            <br />
            <input
              type="checkbox"
              id="description"
              name="description"
              value="description"
              className="mt-5  h-5 w-5"
              onChange={(event) => {
                const checkboxValue = event.target.value;
                setSelectedCheckboxes((prevCheckboxes) => {
                  if (prevCheckboxes.includes(checkboxValue)) {
                    return prevCheckboxes.filter(
                      (value) => value !== checkboxValue
                    );
                  } else {
                    return [...prevCheckboxes, checkboxValue];
                  }
                });
              }}
            />
            <label
              htmlFor="Quantity"
              className="text-lg font-semibold text-gray-700"
            >
              {" "}
              Description
            </label>
            <br />
            <input
              type="checkbox"
              id="date"
              name="date"
              value="date"
              className="mt-5 h-5 w-5 "
              onChange={(event) => {
                const checkboxValue = event.target.value;
                setSelectedCheckboxes((prevCheckboxes) => {
                  if (prevCheckboxes.includes(checkboxValue)) {
                    return prevCheckboxes.filter(
                      (value) => value !== checkboxValue
                    );
                  } else {
                    return [...prevCheckboxes, checkboxValue];
                  }
                });
              }}
            />
            <label
              htmlFor="Item"
              className="text-lg font-semibold text-gray-700"
            >
              {" "}
              Date
            </label>
          </div>
        </div>{" "}
      </form>
      <div className="text-center pb-10">
        <button
          className="px-8 py-3 rounded-3xl  bg-blue-900 text-white font-bold mx-auto "
          type="submit"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomiseItem;
