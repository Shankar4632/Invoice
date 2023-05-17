import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { MdModeEditOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

import { BsArrowLeft, BsThreeDotsVertical, BsCamera } from "react-icons/bs";

const InvoicePage = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
          <div className="border w-[75%] h-[1100px] rounded-xl bg-white ">
            <div className=" flex justify-end w-full mt-3 pr-4">
              <Box sx={{ minWidth: 150, marginRight: "20px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Templete
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Templete"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Currency
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Currency"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
            <div className="text-center">
              <input
                type="text"
                name="city"
                list="cityname"
                placeholder="Email Address or Name"
                className=" w-[97%] p-5 rounded-lg border border-gray-500 mx-auto "
              />
              <datalist id="cityname">
                <option value="1." className="w-full" />
                <option value="2." className="w-full" />
              </datalist>
            </div>
            <div className="flex items-center pl-3 pt-20">
              <p className="font-bold text-lg">Items</p>
              <button className=" text-blue-500 text-xl font-bold  rounded-full w-full flex justify-end items-center mr-3">
                <MdModeEditOutline className="mr-1" /> Customise
              </button>
            </div>
            <div className="h-64 w-[97%] mt-4 border rounded-xl mx-auto flex items-center ">
              <div className="flex">
                <input
                  type="text"
                  name="city"
                  list="cityname"
                  placeholder="item name"
                  className=" p-5 rounded-lg border border-gray-500  ml-7   "
                />
                <datalist id="cityname">
                  <option value="1." className="w-full" />
                  <option value="2." className="w-full" />
                </datalist>
              </div>
            </div>
            <button className="text-bold ml-4 mt-3 text-blue-600  font-bold flex items-center text-xl ">
              <AiOutlinePlus className="mr-2" /> Add items or Service
            </button>
            <div className="flex items-center p-3 mt-10">
              <p className="font-bold text-lg">Message To Customer</p>
            </div>
          </div>
          <div className="border w-[25%] rounded-xl bg-white ">
            <div className="h-[100px] border rounded-xl">1</div>
            <div className="h-[400px] border">2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
