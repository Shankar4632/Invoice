import React from "react";
import { useState } from "react";
//import reacticons
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//import Routes
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [textareaValue, setTextareaValue] = useState("");

  //function calling
  const navigate = useNavigate();
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  return (
    <div className="bg-white h-screen w-[70%] mx-auto border">
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
      <p className="text-center text-3xl mt-3 font-semibold"> Add a new item</p>
      <div className="w-[60%] mx-auto">
        <form class="m-1">
          <div class="w-25">
            <input
              required
              id="outlined-required"
              class="w-full mt-3 py-4 px-3 border border-gray-500 rounded-md"
              type="text"
              placeholder="item name"
            />
          </div>
          <textarea
            className="peer block min-h-[auto] w-full mt-3 mx-auto border border-gray-500 rounded  text-black py-4 px-3  "
            id="exampleFormControlTextarea1"
            rows="4"
            placeholder="Description(optional)"
            value={textareaValue}
            onChange={handleTextareaChange}
          >
            {" "}
          </textarea>
          <div class="w-25">
            <input
              required
              id="outlined-required"
              class="w-full mt-3 py-4 px-3 border border-gray-500 rounded-md placeholder-gray-500"
              type="text"
              placeholder="Price"
            />
          </div>
          <select
            id="dropdown-select"
            className="w-full py-4 px-3 text-base mt-3 border text-gray-500 border-gray-500 rounded-md box-border"
          >
            <option value="">None</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </form>
      </div>
      <div className="text-center mt-16 pb-10">
        <button className="px-8 py-3 rounded-3xl  bg-blue-900 text-white font-bold mx-auto ">
          Save items
        </button>
      </div>
    </div>
  );
};

export default AddItem;
