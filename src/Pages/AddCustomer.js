//import from reactjs package
import React, { useState, useEffect } from "react";
//import reacticons
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//import Routes
import { useNavigate } from "react-router-dom";
//import from firebase
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
//import from  json
import countrydata from "../json file/countriesdata.json";
import states from "../json file/states.json";
import language from "../json file/language.json";

const AddCustomer = () => {
  //hooks or states
  const [isLoading, setIsLoading] = useState(true);
  const [textareaValue, setTextareaValue] = useState("");
  const [users, setUsers] = useState([]);
  const usersdetails = collection(db, "users");
  const [inputs, setInput] = useState({
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
    state: "",
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
  });

  //function calling

  //input to db
  const handlesubmit = (event) => {
    event.preventDefault();
    const isInputValid = Object.values(inputs).every(
      (value) => value.trim() !== ""
    );

    if (isInputValid) {
      createuser();
      navigate("/");
    } else {
      alert("Warning alert! Fill in all the required fields.");
    }
    if (
      inputs.firstname === "" ||
      inputs.lastname === "" ||
      inputs.email === "" ||
      inputs.businessname === "" ||
      inputs.phone === "" ||
      inputs.countrycode === "" ||
      inputs.selectcountry === "" ||
      inputs.city === "" ||
      inputs.state === ""
    ) {
      alert("Warning alert! Change a few things up and try submitting again.");
    } else {
      createuser();

      navigate("/");
    }
  };
  const createuser = async () => {
    await addDoc(usersdetails, {
      firstname: inputs.firstname,
      lastname: inputs.lastname,
      email: inputs.email,
      businessname: inputs.businessname,
      phone: inputs.phone,
      countrycode: inputs.countrycode,
      address1: inputs.address1,
      address2: inputs.address2,
      selectcountry: inputs.selectcountry,
      city: inputs.city,
      state: inputs.state,
      pincode: inputs.pincode,
      dfirstname: inputs.dfirstname,
      dlastname: inputs.dlastname,
      dbusinessname: inputs.dbusinessname,
      dselectcountry: inputs.dselectcountry,
      daddress1: inputs.daddress1,
      daddress2: inputs.daddress2,
      dcity: inputs.dcity,
      dstate: inputs.dstate,
      dpincode: inputs.dpincode,
      lselectcountry: inputs.lselectcountry,
      lselectlanguage: inputs.lselectlanguage,
      ldescription: inputs.ldescription,
    });
  };
  //on Change action event
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  //fetch data from db
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersdetails);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };
    getUsers();
  }, [usersdetails]);

  const navigate = useNavigate();
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  //fetch data of country in json format

  //loading
  if (isLoading) {
    return (
      <div className="text-center text-3xl text-black">
        Loading<span className="text-yellow-500"> . . .</span>
      </div>
    );
  }

  if (users.length === 0) {
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

      {users.map((user, i) => {
        return (
          <div key={i}>
            <h1 className="text-3xl text-black">{user.firstname}</h1>
            <h1 className="text-3xl text-black">{user.lastname}</h1>
            <h1 className="text-3xl text-black">{user.businessname}</h1>
            <h1 className="text-3xl text-black">{user.email}</h1>
            <h1 className="text-3xl text-black">{user.phone}</h1>
            <h1 className="text-3xl text-black">{user.countrycode}</h1>
            <h1 className="text-3xl text-black">{user.address1}</h1>
            <h1 className="text-3xl text-black">{user.address2}</h1>
            <h1 className="text-3xl text-black">{user.selectcountry}</h1>
            <h1 className="text-3xl text-black">{user.pincode}</h1>
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
                onChange={handleChange}
                type="search"
                className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
                placeholder="First name"
                required
              />
            </div>
            <div className="">
              {" "}
              <input
                id="outlined-search"
                name="lastname"
                onChange={handleChange}
                type="search"
                className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
                placeholder="Last name"
                required
              />
            </div>
          </div>
          <div className="w-full  text-center">
            {" "}
            <input
              id="outlined-search"
              type="search"
              name="businessname"
              onChange={handleChange}
              className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Business name"
              required
            />
          </div>
          <div className="w-full  text-center">
            {" "}
            <input
              id="outlined-search"
              type="search"
              name="email"
              onChange={handleChange}
              className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Email address"
              required
            />
          </div>
          <div className="grid grid-cols-2 w-full  mt-3 text-center">
            <div>
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
                onChange={handleChange}
                name="countrycode"
                value={inputs.countrycode}
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
                onChange={handleChange}
                className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
                placeholder="Phone number"
                required
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
              onChange={handleChange}
              name="selectcountry"
              value={inputs.selectcountry}
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
              onChange={handleChange}
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
              onChange={handleChange}
              name="address2"
            />
          </div>
          <div className="grid grid-cols-2 w-full mt-3 text-center">
            <div className="">
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
                onChange={handleChange}
                name="city"
                value={inputs.city}
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
                onChange={handleChange}
                name="state"
                value={inputs.state}
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
              onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            <div className="">
              {" "}
              <input
                id="outlined-search"
                type="search"
                className=" w-[95%]  border border-gray-400 rounded-md py-4 px-3 placeholder-black"
                placeholder="Last name"
                name="dLastname"
                onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <div className="w-full  text-center mt-4">
            {" "}
            <select
              id="dropdown-select"
              className="w-[98%] py-4 px-3 text-black border border-gray-500 rounded-md box-border"
              name="dselectcountry"
              onChange={handleChange}
              value={inputs.dselectcountry}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 w-full mt-3 text-center">
            <div className="">
              {" "}
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
                name="dcity"
                onChange={handleChange}
                value={inputs.dcity}
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
              onChange={handleChange}
              value={inputs.dstate}
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
              onChange={handleChange}
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
              value={inputs.lselectcountry}
              onChange={handleChange}
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
                value={inputs.lselectlanguage}
                onChange={handleChange}
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
              className="peer block min-h-[auto] w-[97%] mx-auto border border-gray-500 rounded mt-5 text-black px-3 py-[0.32rem]  "
              id="exampleFormControlTextarea1"
              rows="4"
              placeholder="Additional customer information"
              value={textareaValue}
              // onChange={handleTextareaChange}
              name="ldescription"
              onChange={handleChange}
            >
              {" "}
            </textarea>{" "}
          </div>
          <div className="text-center pb-10 mt-10">
            <button
              className="px-8 py-3 rounded-3xl  bg-blue-900 text-white font-bold mx-auto "
              type="submit"
              onClick={createuser}
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
