import React from "react";
//import reacticons
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//import Routes
import { useNavigate } from "react-router-dom";

const Demo = () => {
  //function calling
  const navigate = useNavigate();
  return (
    <div className="w-[700px] bg-white border  h-screen">
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
      <p className="text-center text-[48px] mt-3 font-semibold">
        {" "}
        Business <br /> information{" "}
      </p>
      <div className="w-[70%] border mx-auto h-full">
        {" "}
        <div className="grid grid-cols-2 w-full mt-3 text-center">
          <div className="">
            {" "}
            <input
              id="outlined-search"
              name="firstname"
              type="search"
              className=" w-[95%]  border border-gray-400 rounded-md py-5 px-3 placeholder-black focus:border-blue-400"
              placeholder="First name"
            />
          </div>
          <div className="">
            {" "}
            <input
              id="outlined-search"
              name="lastname"
              type="search"
              className=" w-[95%]  border border-gray-400 rounded-md py-5 px-3 placeholder-black"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="flex  justify-center mt-3">
          <input
            id="outlined-search"
            name="lastname"
            type="search"
            className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
            placeholder="Business name"
          />
        </div>
        <div className="flex  justify-center mt-3">
          <input
            id="outlined-search"
            name="lastname"
            type="text"
            className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
            placeholder="Website"
          />
        </div>
        <div className="flex  justify-center mt-3">
          <input
            id="outlined-search"
            name="lastname"
            type="text"
            className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
            placeholder="TIN / PIN"
          />
        </div>
        <div className="flex  justify-center mt-3">
          <input
            id="outlined-search"
            name="lastname"
            type="text"
            className=" w-[95%]  border border-gray-400  rounded-md py-5 px-3 placeholder-black"
            placeholder="Additional information"
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
