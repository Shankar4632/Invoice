import React from "react";
//import from reactjs package
import { useState, useEffect } from "react";
//import reacticons
import { FaPaypal } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
//import Routes
import { useNavigate, useParams } from "react-router-dom";
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
const EditCustomer = () => {
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
    dselectcountry,
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

  // const handleSubmitAll = (e) => {
  //   e.preventDefault();

  //   const formData = {
  //     section1: {
  //       firstname,
  //       lastname,
  //       businessname,
  //       email,
  //       phone,
  //       countrycode,
  //       selectcountry,
  //       address1,
  //       address2,
  //       city,
  //       state1,
  //       pincode,
  //       dfirstname,
  //       dlastname,
  //       dbusinessname,
  //       dselectcountry,
  //       daddress1,
  //       daddress2,
  //       dcity,
  //       dstate,
  //       dpincode,
  //       lselectcountry,
  //       lselectlanguage,
  //       ldescription,
  //     },
  //   };
  //   if (!formData) {
  //     toast.error("please enter the values");
  //   } else {
  //     if (!key) {
  //       dataRef
  //         .ref()
  //         .child("Allsections")
  //         .push(formData, (err) => {
  //           if (err) {
  //             toast.error(err);
  //           } else {
  //             toast.success("Successfully added");
  //             navigate(`/addedit/${key}`);
  //           }
  //         });
  //     } else {
  //       dataRef
  //         .ref()
  //         .child(`Allsections/${key}`)
  //         .set(formData, (err) => {
  //           if (err) {
  //             toast.error(err);
  //           } else {
  //             toast.success("Successfully updated ");
  //             navigate(`/addedit/${key}`);
  //           }
  //         });
  //     }
  //   }
  // };
  const handleSubmitAll = (e) => {
    e.preventDefault();

    const updatedSection1 = {
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
      dselectcountry,
      daddress1,
      daddress2,
      dcity,
      dstate,
      dpincode,
      lselectcountry,
      lselectlanguage,
      ldescription,
    };

    const updatedFormData = {
      ...data[key], // Keep the rest of the sections unchanged
      section1: updatedSection1, // Update only section1
    };

    if (!updatedFormData) {
      toast.error("Please enter the values");
    } else {
      if (!key) {
        dataRef
          .ref()
          .child("Allsections")
          .push(updatedFormData, (err) => {
            if (err) {
              toast.error(err);
            } else {
              toast.success("Successfully added");
              navigate(`/addedit/${key}`);
            }
          });
      } else {
        dataRef
          .ref()
          .child(`Allsections/${key}`)
          .set(updatedFormData, (err) => {
            if (err) {
              toast.error(err);
            } else {
              toast.success("Successfully updated");
              navigate(`/addedit/${key}`);
            }
          });
      }
    }
  };

  //fetch data from db
  const { key } = useParams();

  useEffect(() => {
    const dataRef1 = dataRef.ref("Allsections");
    dataRef1.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
        console.log("Data:", snapshot.val());
      } else {
        setData({});
      }
      setIsLoading(false);
    });
    return () => {
      setData({});
    };
  }, [key]);
  useEffect(() => {
    if (data && key && data[key] && data[key].section1) {
      setState({ ...data[key].section1 });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
      console.log("Updated Data4:", data);
    };
  }, [key, data]);

  //fetch data of country in json format

  //loading
  if (isLoading) {
    return (
      // <div className="text-center text-3xl text-black">
      //   Loading<span className="text-yellow-500"> . . .</span>
      // </div>
      <div className=" shadow  rounded-md p-4 w-[70%] h-screen mx-auto">
        <div className="animate-pulse flex space-x-4 w-[60%] mx-auto mt-28">
          <div className="flex-1 space-y-6 py-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-4  bg-gray-300 rounded"></div>
              <div className="h-4  bg-gray-300 rounded"></div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-4   bg-gray-300 rounded col-span-2"></div>
                <div className="h-4   bg-gray-300 rounded col-span-2"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-4  bg-gray-300 rounded"></div>
                <div className="h-4  bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className=" mt-96 space-y-3 ">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
            <div className=" mt-96 space-y-3 border">
              <div className="h-4   bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }
  return (
    <div className="bg-white h-auto w-[70%] mx-auto border">
      <div className="flex items-center  mt-4 ">
        <i className="w-full flex justify-center text-blue-600  ">
          <FaPaypal className="text-3xl" />
        </i>
        <i
          className="flex  justify-end pr-3 cursor-pointer"
          onClick={() => {
            navigate(`/addedit/${key}`);
          }}
        >
          <RxCross1 className="text-xl" />
        </i>
      </div>
      <p className="text-center text-3xl mt-3 font-semibold">
        {" "}
        Edit Customer information{" "}
      </p>

      <form className="" onSubmit={handleSubmitAll}>
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
                value={state.firstname || ""}
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
                value={state.lastname || ""}
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
              value={businessname || ""}
            />
          </div>
          <div className="w-full  text-center">
            {" "}
            <input
              id="outlined-search"
              type="email"
              name="email"
              onChange={handleinputchange}
              className="w-[98%] mt-3 border border-gray-400 rounded-md py-4 px-3 placeholder-black"
              placeholder="Email address"
              value={email || ""}
            />
          </div>
          <div className="grid grid-cols-2 w-full  mt-3 text-center">
            <div>
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
                onChange={handleinputchange}
                name="countrycode"
                value={countrycode || ""}
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
                value={phone || ""}
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
              value={selectcountry || ""}
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
              value={address1 || ""}
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
              value={address2 || ""}
            />
          </div>
          <div className="grid grid-cols-2 w-full mt-3 text-center">
            <div className="">
              <select
                id="dropdown-select"
                className="w-[95%] py-4 px-3 text-base border border-gray-500 rounded-md box-border"
                onChange={handleinputchange}
                name="city"
                value={city || ""}
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
                value={state1 || ""}
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
              value={pincode || ""}
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
                value={dfirstname || ""}
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
                value={dlastname || ""}
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
              value={dbusinessname || ""}
            />
          </div>
          <div className="w-full  text-center mt-4">
            {" "}
            <select
              id="dropdown-select"
              className="w-[98%] py-4 px-3 text-black border border-gray-500 rounded-md box-border"
              name="dselectcountry"
              onChange={handleinputchange}
              value={dselectcountry || ""}
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
              value={daddress1 || ""}
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
              value={daddress2 || ""}
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
                value={dcity || ""}
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
              value={dstate || ""}
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
              value={dpincode || ""}
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
              value={lselectcountry || ""}
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
                value={lselectlanguage || ""}
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
              value={ldescription || ""}
            ></textarea>
          </div>
          <div className="text-center pb-10 mt-10">
            {/* <button
              className="px-8 py-3 rounded-3xl  bg-blue-900 text-white font-bold mx-auto "
              type="submit"
              value={key ? "Update" : "Save"}
            >
              Save
            </button> */}
            <input
              className="px-8 py-3 rounded-3xl  bg-blue-900 text-white font-bold mx-auto cursor-pointer"
              value={key ? "Update" : "Save"}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
