//import from reactjs package
import React from "react";
import { useState, useEffect } from "react";
//import reacticons
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//import Routes
import { useNavigate } from "react-router-dom";
//import from firebase
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
//import from country json
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
  });

  //function calling

  //input to db
  const handlesubmit = (event) => {
    event.preventDefault();
    if (
      inputs.firstname === "" ||
      inputs.lastname === "" ||
      inputs.email === "" ||
      inputs.businessname === "" ||
      inputs.phone === ""
    ) {
      alert(
        <div
          className="flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Warning alert!</span> Change a few
            things up and try submitting again.
          </div>
        </div>
      );
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
    });
  };
  //on Change action event
  const handleChange = (event) => {
    const firstname = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [firstname]: value }));
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

  if (!users) {
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
            <select
              id="dropdown-select"
              className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
            >
              <option selected disabled="true" value="option1">
                ---select code---
              </option>
              {countrydata.map((country, index) => (
                <option value="option1" key={index}>
                  +{country.code}
                </option>
              ))}
            </select>
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
            >
              <option selected disabled="true" value="option1">
                ---select country---
              </option>
              {countrydata.map((country, index) => (
                <option value="option1" key={index}>
                  {country.country}
                </option>
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
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
              >
                <option selected disabled="true" value="option1">
                  ---select city---
                </option>
                {states.map((name, index) => (
                  <option value="option1" key={index}>
                    {name.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
              >
                <option selected disabled="true" value="option1">
                  ---select states---
                </option>
                {states.map((state, index) => (
                  <option value="option1" key={index}>
                    {state.state}
                  </option>
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
              className="w-[98%] py-4 px-3 text-black border border-gray-500 rounded-md box-border"
            >
              <option selected disabled="true" value="option1">
                ---select country---
              </option>
              {countrydata.map((country, index) => (
                <option value="option1" key={index}>
                  {country.country}
                </option>
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
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
              >
                <option selected disabled="true" value="option1">
                  ---select city---
                </option>
                {states.map((name, index) => (
                  <option value="option1" key={index}>
                    {name.name}
                  </option>
                ))}
              </select>
            </div>
            <select
              id="dropdown-select"
              className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
            >
              <option selected disabled="true" value="option1">
                ---select states---
              </option>
              {states.map((state, index) => (
                <option value="option1" key={index}>
                  {state.state}
                </option>
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
            >
              <option selected disabled="true" value="option1">
                ---select country---
              </option>
              {countrydata.map((country, index) => (
                <option value="option1" key={index}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 w-full mt-3 text-center">
            <div className="">
              <select
                id="dropdown-select"
                className="w-[98%] py-4 px-3 text-black border border-gray-500 rounded-md box-border"
              >
                <option selected disabled="true" value="option1">
                  ---select language---
                </option>
                {language.map((languages, index) => (
                  <option value="option1" key={index}>
                    {languages.name}
                  </option>
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
              onChange={handleTextareaChange}
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
