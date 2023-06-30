import React from "react";
import { useState, useRef } from "react";

//import reacticons
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//import Routes
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const [input, setInput] = useState({
    fname: "",
    description: "",
    tax: "",
    price: "",
  });

  //function calling
  const navigate = useNavigate();
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const titles = useRef("");
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    titles.current.value = "";
    setInput({
      fname: "",
      description: "",
      tax: "",
      price: "",
    });
    const data = {
      fname: input.fname,
      description: input.description,
      price: input.price,
      tax: input.tax,
    };
    let str = JSON.stringify(data);
    console.log(str);
    navigate("/", { state: { itemdata: str } });
  };
  return (
    <div className="bg-white  w-[70%] h-screen mx-auto border">
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
      <div className="w-[60%] mx-auto ">
        <form className="m-1" onSubmit={(event) => handlesubmit(event)}>
          <div className="w-25">
            <input
              id="outlined-required"
              className="w-full mt-3 py-4 px-3 border border-gray-500 rounded-md"
              type="text"
              placeholder="item name"
              name="fname"
              onChange={handleChange}
              value={input.fname}
              ref={titles}
            />
          </div>
          <textarea
            className="peer block min-h-[auto] w-full mt-3 mx-auto border border-gray-500 rounded  text-black py-4 px-3  "
            id="exampleFormControlTextarea1"
            rows="4"
            placeholder="Description(optional)"
            name="description"
            onChange={handleChange}
            value={input.description}
            ref={titles}
          >
            {" "}
          </textarea>
          <div className="w-25">
            <input
              id="outlined-required"
              className="w-full mt-3 py-4 px-3 border border-gray-500 rounded-md placeholder-gray-500"
              type="text"
              placeholder="Price"
              name="price"
              onChange={handleChange}
              value={input.price}
              ref={titles}
            />
          </div>
          <select
            id="dropdown-select"
            className="w-full py-4 px-3 text-base mt-3 border text-gray-500 border-gray-500 rounded-md box-border"
            name="tax"
            onChange={handleChange}
            value={input.tax}
            ref={titles}
          >
            <option value="">No Tax</option>
            <option value="option1">Tax able</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <div className="text-center mt-20   ">
            <button
              type="submit"
              className="px-8 py-3 rounded-3xl  bg-blue-900 text-white font-bold mx-auto "
            >
              Save items
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
