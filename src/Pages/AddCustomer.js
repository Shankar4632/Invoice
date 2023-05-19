import React from "react";
// import { useState } from "react";
//import reacticons
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//import Routes
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  //hooks or states
  //function calling

  const navigate = useNavigate();

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
      <div className="mx-auto w-[60%] border h-auto mt-10">
        <p className="font-bold text-md  "> Customer information</p>
        <div className="grid grid-cols-2 w-full mt-3">
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
      </div>
    </div>
  );
};

export default AddCustomer;
