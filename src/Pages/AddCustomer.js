import React from "react";
import { useState } from "react";
// import { useState } from "react";
//import reacticons
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//import Routes
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  //hooks or states
  const [textareaValue, setTextareaValue] = useState("");

  //function calling

  const navigate = useNavigate();
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  //return statement
  return (
    <div className="bg-white h-auto w-[70%] mx-auto border">
      <div className="flex items-center  mt-4 ">
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
        Customer information{" "}
      </p>
      <div className="mx-auto w-[60%]  h-auto mt-10">
        <p className="font-bold text-md  "> Customer information</p>
        <div className="grid grid-cols-2 w-full mt-3 text-center">
          <div className="">
            {" "}
            <input
              id="outlined-search"
              type="search"
              className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="First name"
            />
          </div>
          <div className="">
            {" "}
            <input
              id="outlined-search"
              type="search"
              className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="w-full  text-center">
          {" "}
          <input
            id="outlined-search"
            type="search"
            className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
            placeholder="Business name"
          />
        </div>
        <div className="w-full  text-center">
          {" "}
          <input
            id="outlined-search"
            type="search"
            className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
            placeholder="Email address"
          />
        </div>
        <div className="grid grid-cols-2 w-full border mt-3 text-center">
          <select
            id="dropdown-select"
            className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
          >
            <option value="">code</option>
            <option value="option1">+91</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <div className="">
            {" "}
            <input
              id="outlined-search"
              type="number"
              className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Phone number"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto w-[60%]  h-auto mt-5">
        <p className="font-bold text-md  "> Billing Address</p>

        <div className="w-full  text-center mt-4">
          {" "}
          <select
            id="dropdown-select"
            className="w-[98%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
          >
            <option value="">Country</option>
            <option value="option1">USA</option>
            <option value="option2">India</option>
            <option value="option3">Germany</option>
          </select>
        </div>
        <div className="w-full  text-center">
          {" "}
          <input
            id="outlined-search"
            type="search"
            className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
            placeholder="Address line 1"
          />
        </div>
        <div className="w-full  text-center">
          {" "}
          <input
            id="outlined-search"
            type="search"
            className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
            placeholder="Address line 2"
          />
        </div>
        <div className="grid grid-cols-2 w-full mt-3 text-center">
          <div className="">
            {" "}
            <input
              id="outlined-search"
              type="text"
              className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Town/City"
            />
          </div>
          <select
            id="dropdown-select"
            className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
          >
            <option value="">State</option>
            <option value="option1">option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="w-full  text-center">
          {" "}
          <input
            id="outlined-search"
            type="search"
            className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
            placeholder="Pin code"
          />
        </div>
      </div>
      <div className="mx-auto w-[60%]  h-auto mt-5">
        <p className="font-bold text-md  "> Delivery address</p>
        <div className="grid grid-cols-2 w-full mt-3 text-center">
          <div className="">
            {" "}
            <input
              id="outlined-search"
              type="search"
              className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="First name"
            />
          </div>
          <div className="">
            {" "}
            <input
              id="outlined-search"
              type="search"
              className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="w-full  text-center">
          {" "}
          <input
            id="outlined-search"
            type="search"
            className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
            placeholder="Busiiness name(optional)"
          />
        </div>
        <div className="w-full  text-center mt-4">
          {" "}
          <select
            id="dropdown-select"
            className="w-[98%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
          >
            <option value="">Country</option>
            <option value="option1">USA</option>
            <option value="option2">India</option>
            <option value="option3">Germany</option>
          </select>
        </div>
        <div className="w-full  text-center">
          {" "}
          <input
            id="outlined-search"
            type="search"
            className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
            placeholder="Address line 1"
          />
        </div>
        <div className="w-full  text-center">
          {" "}
          <input
            id="outlined-search"
            type="search"
            className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
            placeholder="Address line 2"
          />
        </div>
        <div className="grid grid-cols-2 w-full mt-3 text-center">
          <div className="">
            {" "}
            <input
              id="outlined-search"
              type="text"
              className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Town/City"
            />
          </div>
          <select
            id="dropdown-select"
            className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
          >
            <option value="">State</option>
            <option value="option1">option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="w-full  text-center">
          {" "}
          <input
            id="outlined-search"
            type="search"
            className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
            placeholder="Pin code"
          />
        </div>
      </div>
      <div className="mx-auto w-[60%]  h-auto mt-5">
        <p className="font-bold text-md  "> Language</p>

        <div className="w-full  text-center mt-4">
          {" "}
          <select
            id="dropdown-select"
            className="w-[98%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
          >
            <option value="">Country</option>
            <option value="option1">USA</option>
            <option value="option2">India</option>
            <option value="option3">Germany</option>
          </select>
        </div>

        <div className="grid grid-cols-2 w-full mt-3 text-center">
          <div className="">
            <select
              id="dropdown-select"
              className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
            >
              <option value="">Language</option>
              <option value="option1">option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mx-auto w-[60%]  h-auto mt-5">
        <p className="font-bold text-md  "> Additional notes</p>

        <div className="w-full  text-center mt-4">
          <textarea
            className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
            id="exampleFormControlTextarea1"
            rows="4"
            placeholder="Additional customer information"
            value={textareaValue}
            onChange={handleTextareaChange}
          >
            {" "}
          </textarea>{" "}
        </div>
        <div className="text-center pb-10 mt-10">
          <button className="px-8 py-3 rounded-3xl  bg-blue-900 text-white font-bold mx-auto ">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
