//import from reactjs package
import React, { useState, useEffect } from "react";
//import reacticons
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//import Routes
import { useNavigate } from "react-router-dom";
//import from firebase

//import from  json
import countrydata from "../json file/countriesdata.json";
import states from "../json file/states.json";
import language from "../json file/language.json";
//import toster

import { dataRef } from "../firebase-config";
import { toast } from "react-toastify";

const initialState = {
  firstname: "",
  lastname: "",
  businessname: "",
  email: "",
  phone: "",
  countrycode: "",
  selectcountry: "",
  address1: "",
  address2: "",
  city: "",
  state1: "",
  pincode: "",
  dfirstname: "",
  dlastname: "",
  dbusinessname: "",
  dselectcountry: "",
  daddress1: "",
  daddress2: "",
  dcity: "",
  dstate: "",
  dpincode: "",
  lselectcountry: "",
  lselectlanguage: "",
  ldescription: "",
};
const AddCustomer = () => {
  //hooks or states
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const {
    firstname,
    lastname,
    businessname,
    email,
    phone,
    countrycode,
    selectcountry,
    address1,
    address2,
    city,
    state1,
    pincode,
    dfirstname,
    dlastname,
    dbusinessname,
    daddress1,
    daddress2,
    dcity,
    dstate,
    dpincode,
    lselectcountry,
    lselectlanguage,
    ldescription,
  } = state;

  //function calling
  const navigate = useNavigate();
  //on Change action event
  const handleinputchange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  //input to db
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!firstname || !email || !lastname || !businessname || !phone) {
      toast.error(<div className="">Please enter the values!</div>);
    } else {
      dataRef
        .ref()
        .child("users")
        .push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Successfully added");
            navigate("/");
          }
        });
    }
  };
  //fetch data from db
  useEffect(() => {
    dataRef
      .ref()
      .child("users")
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
        setIsLoading(false);
      });
    return () => {
      setData({});
    };
  }, []);

  //fetch data of country in json format

  //loading
  if (isLoading) {
    return (
      <div className="text-center text-3xl text-black">
        Loading<span className="text-yellow-500"> . . .</span>
      </div>
    );
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

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

      {Object.keys(data).map((id, index) => {
        return (
          <div key={id}>
            <h1 className="text-3xl text-black">{index + 1}</h1>
            <h1 className="text-3xl text-black">{data[id].firstname}</h1>
            <h1 className="text-3xl text-black">{data[id].lastname}</h1>
            <h1 className="text-3xl text-black">{data[id].email}</h1>
          </div>
        );
      })}
      <form className="" onSubmit={handlesubmit}>
        <div className="mx-auto w-[60%]  h-auto mt-10">
          <p className="font-bold text-md  "> Customer information</p>

          <div className="grid grid-cols-2 w-full mt-3 text-center">
            <div className="">
              {" "}
              <input
                id="outlined-search"
                name="firstname"
                onChange={handleinputchange}
                type="search"
                className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black focus:border-blue-400"
                placeholder="First name"
              />
            </div>
            <div className="">
              {" "}
              <input
                id="outlined-search"
                name="lastname"
                onChange={handleinputchange}
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
              name="businessname"
              onChange={handleinputchange}
              className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Business name"
            />
          </div>
          <div className="w-full  text-center">
            {" "}
            <input
              id="outlined-search"
              type="search"
              name="email"
              onChange={handleinputchange}
              className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Email address"
            />
          </div>
          <div className="grid grid-cols-2 w-full  mt-3 text-center">
            <div>
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
                onChange={handleinputchange}
                name="countrycode"
                value={initialState.countrycode}
              >
                <option defaultValue disabled value="">
                  ---select code---
                </option>
                {countrydata.map((country, index) => (
                  <option key={index}>+{country.code}</option>
                ))}
              </select>
            </div>
            <div className="">
              {" "}
              <input
                id="outlined-search"
                type="number"
                name="phone"
                onChange={handleinputchange}
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
              className="w-[98%] py-4 px-3 text-black border border-gray-500 rounded-md box-border"
              onChange={handleinputchange}
              name="selectcountry"
              value={initialState.selectcountry}
            >
              <option defaultValue disabled value="">
                ---select country---
              </option>
              {countrydata.map((country, index) => (
                <option key={index}>{country.country}</option>
              ))}
            </select>
          </div>
          <div className="w-full  text-center">
            {" "}
            <input
              id="outlined-search"
              type="search"
              className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Address line 1"
              onChange={handleinputchange}
              name="address1"
            />
          </div>
          <div className="w-full  text-center">
            {" "}
            <input
              id="outlined-search"
              type="search"
              className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Address line 2"
              onChange={handleinputchange}
              name="address2"
            />
          </div>
          <div className="grid grid-cols-2 w-full mt-3 text-center">
            <div className="">
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
                onChange={handleinputchange}
                name="city"
                value={initialState.city}
              >
                <option defaultValue disabled value="">
                  ---select city---
                </option>
                {states.map((name, index) => (
                  <option key={index}>{name.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
                onChange={handleinputchange}
                name="state1"
                value={initialState.state1}
              >
                <option defaultValue disabled value="">
                  ---select states---
                </option>
                {states.map((state, index) => (
                  <option key={index}>{state.state}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full  text-center">
            {" "}
            <input
              id="outlined-search"
              type="search"
              className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Pin code"
              onChange={handleinputchange}
              name="pincode"
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
                name="dfirstname"
                onChange={handleinputchange}
              />
            </div>
            <div className="">
              {" "}
              <input
                id="outlined-search"
                type="search"
                className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
                placeholder="Last name"
                name="dlastname"
                onChange={handleinputchange}
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
              name="dbusinessname"
              onChange={handleinputchange}
            />
          </div>
          <div className="w-full  text-center mt-4">
            {" "}
            <select
              id="dropdown-select"
              className="w-[98%] py-4 px-3 text-black border border-gray-500 rounded-md box-border"
              name="dselectcountry"
              onChange={handleinputchange}
              value={initialState.dselectcountry}
            >
              <option defaultValue disabled value="">
                ---select country---
              </option>
              {countrydata.map((country, index) => (
                <option key={index}>{country.country}</option>
              ))}
            </select>
          </div>
          <div className="w-full  text-center">
            {" "}
            <input
              id="outlined-search"
              type="search"
              className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Address line 1"
              name="daddress1"
              onChange={handleinputchange}
            />
          </div>
          <div className="w-full  text-center">
            {" "}
            <input
              id="outlined-search"
              type="search"
              className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Address line 2"
              name="daddress2"
              onChange={handleinputchange}
            />
          </div>
          <div className="grid grid-cols-2 w-full mt-3 text-center">
            <div className="">
              {" "}
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
                name="dcity"
                onChange={handleinputchange}
                value={initialState.dcity}
              >
                <option defaultValue disabled value="">
                  ---select city---
                </option>
                {states.map((name, index) => (
                  <option key={index}>{name.name}</option>
                ))}
              </select>
            </div>
            <select
              id="dropdown-select"
              className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
              name="dstate"
              onChange={handleinputchange}
              value={initialState.dstate}
            >
              <option defaultValue disabled value="">
                ---select states---
              </option>
              {states.map((state, index) => (
                <option key={index}>{state.state}</option>
              ))}
            </select>
          </div>
          <div className="w-full  text-center">
            {" "}
            <input
              id="outlined-search"
              type="search"
              className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Pin code"
              name="dpincode"
              onChange={handleinputchange}
            />
          </div>
        </div>
        <div className="mx-auto w-[60%]  h-auto mt-5">
          <p className="font-bold text-md  "> Language</p>

          <div className="w-full  text-center mt-4">
            {" "}
            <select
              id="dropdown-select"
              className="w-[98%] py-4 px-3 text-black border border-gray-500 rounded-md box-border"
              name="lselectcountry"
              value={initialState.lselectcountry}
              onChange={handleinputchange}
            >
              <option defaultValue disabled value="">
                ---select country---
              </option>
              {countrydata.map((country, index) => (
                <option key={index}>{country.country}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 w-full mt-3 text-center">
            <div className="">
              <select
                id="dropdown-select"
                className="w-[98%] py-4 px-3 text-black border border-gray-500 rounded-md box-border"
                name="lselectlanguage"
                value={initialState.lselectlanguage}
                onChange={handleinputchange}
              >
                <option defaultValue disabled value="">
                  ---select language---
                </option>
                {language.map((languages, index) => (
                  <option key={index}>{languages.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mx-auto w-[60%]  h-auto mt-5">
          <p className="font-bold text-md  "> Additional notes</p>

          <div className="w-full  text-center mt-4">
            <textarea
              className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]"
              id="exampleFormControlTextarea1"
              rows="4"
              placeholder="Additional customer information"
              name="ldescription"
              defaultValue=""
              onChange={handleinputchange} // Set the initial value here
            ></textarea>
          </div>
          <div className="text-center pb-10 mt-10">
            <button
              className="px-8 py-3 rounded-3xl  bg-blue-900 text-white font-bold mx-auto "
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
