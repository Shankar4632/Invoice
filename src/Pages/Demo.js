import React from "react";

const Demo = () => {
  return (
    <div className="w-full h-auto  border bg-white ">
      <div className="grid grid-cols-2  text-end  bg-white h-auto">
        <div className=""></div>
        <div className="pr-6">
          <h1 className="text-[50px] font-semibold ">INVOICE</h1>
          <p className="text-2xl font-semibold p-1">
            Company Name :XYZ Company
          </p>
          <p className="text-2xl font-semibold p-1">Address:</p>
          <p className="text-2xl font-semibold p-1">TIN/PAN</p>
          <p className="text-2xl font-semibold p-1">Phone No. :XXXXXXXXXXX</p>
          <p className="text-2xl font-semibold p-1">Email ID. :XXXXXXXXXXX</p>
          <p className="text-2xl font-semibold p-1">Website :</p>
        </div>
      </div>
      <div className="h-48 w-[95%] mx-auto bg-gray-200">
        <div className="grid grid-cols-2  h-full">
          <div className="  ">
            <p className="text-2xl font-semibold p-2">Invoice no.</p>
            <p className="text-2xl font-semibold p-2">Invoice date.</p>
            <p className="text-2xl font-semibold p-2">Reference</p>
            <p className="text-2xl font-semibold pl-2">Due date.</p>
          </div>
          <div className="text-[35px] font-semibold flex justify-end items-end">
            <p>AMOUNT DUE</p>
          </div>
        </div>
      </div>
      <div className=" w-[95%] mx-auto">
        <div className="grid grid-cols-2 mt-5 h-auto">
          <div className=" ">
            <p className="text-2xl font-bold p-1">BILL TO</p>

            <p className="text-2xl  font-semibold  p-1">Business Name</p>
            <p className="text-2xl  font-semibold  p-1">Fname Lname</p>
            <p className="text-2xl  font-semibold p-1 ">Address1 Address2</p>
            <p className="text-2xl  font-semibold  p-1">Email Id.</p>
            <p className="text-2xl  font-semibold pl-1  ">Phone No.</p>
          </div>
          <div className=" ">
            <p className="text-2xl font-bold p-1">SEND TO</p>

            <p className="text-2xl  font-semibold  p-1">Business Name</p>
            <p className="text-2xl  font-semibold  p-1">Fname Lname</p>
            <p className="text-2xl  font-semibold p-1 ">Address1 Address2</p>
          </div>
        </div>
      </div>
      <div className="w-[95%] mx-auto mt-5">
        <table className="w-full p-6 text-xl    text-left whitespace-nowrap">
          <thead>
            <tr className="dark:bg-gray-700 border-b-4 border-gray-300">
              <th className="p-3">No.</th>
              <th className="p-3">ITMES AND DESCRIPTION</th>
              <th className="p-3">QTY/HRS</th>
              <th className="p-3">PRICE</th>
              <th className="p-3">AMOUNTS$</th>
            </tr>
          </thead>
          <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
            <tr>
              <td className="px-3 text-2xl font-medium dark:text-gray-400">
                1
              </td>
              <td className="px-3 py-2">
                <p>Item 1</p>
              </td>
              <td className="px-3 py-2">
                <span>2</span>
                <p className="dark:text-gray-400"></p>
              </td>
              <td className="px-3 py-2">
                <p>$100</p>
              </td>
              <td className="px-3 py-2">
                <p>$20</p>
              </td>
            </tr>
            <tr>
              <td className="px-3 text-2xl font-medium dark:text-gray-400"></td>
              <td className="px-3 py-2">
                <p>Description 1</p>
              </td>
              <td className="px-3 py-2">
                <span></span>
                <p className="dark:text-gray-400"></p>
              </td>
              <td className="px-3 py-2">
                <p></p>
              </td>
              <td className="px-3 py-2">
                <p></p>
              </td>
            </tr>
          </tbody>
          <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
            <tr>
              <td className="px-3 text-2xl font-medium dark:text-gray-400">
                2
              </td>
              <td className="px-3 py-2">
                <p>Item 2</p>
              </td>
              <td className="px-3 py-2">
                <span>5</span>
                <p className="dark:text-gray-400"></p>
              </td>
              <td className="px-3 py-2">
                <p>$100</p>
              </td>
              <td className="px-3 py-2">
                <p>$20</p>
              </td>
            </tr>
            <tr>
              <td className="px-3 text-2xl font-medium dark:text-gray-400"></td>
              <td className="px-3 py-2">
                <p>Description 1</p>
              </td>
              <td className="px-3 py-2">
                <span></span>
                <p className="dark:text-gray-400"></p>
              </td>
              <td className="px-3 py-2">
                <p></p>
              </td>
              <td className="px-3 py-2">
                <p></p>
              </td>
            </tr>
          </tbody>
          <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
            <tr>
              <td className="px-3 text-2xl font-medium dark:text-gray-400">
                3
              </td>
              <td className="px-3 py-2">
                <p>Item 3</p>
              </td>
              <td className="px-3 py-2">
                <span>10</span>
                <p className="dark:text-gray-400"></p>
              </td>
              <td className="px-3 py-2">
                <p>$300</p>
              </td>
              <td className="px-3 py-2">
                <p>$50</p>
              </td>
            </tr>
            <tr>
              <td className="px-3 text-2xl font-medium dark:text-gray-400"></td>
              <td className="px-3 py-2">
                <p>Description 3</p>
              </td>
              <td className="px-3 py-2">
                <span></span>
                <p className="dark:text-gray-400"></p>
              </td>
              <td className="px-3 py-2">
                <p></p>
              </td>
              <td className="px-3 py-2">
                <p></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="">
        <div className="grid grid-cols-2 ">
          <div className=" h-48"></div>
          <div className=" h-48 ">
            <p className="text-xl p-2 font-semibold flex justify-end">
              Subtotal <span className="pr-10">$200</span>
            </p>
            <p className="text-xl p-2 font-semibold border-b-4 border-gray-200 flex justify-end">
              Shipping <span className="pr-10">$20</span>
            </p>
            <p className="font-bold text-2xl p-4 pr-10 flex justify-end border-b-4 border-gray-200">
              ToTal $220 USD
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2">
          <div className=" h-80">
            <p className="text-3xl font-bold  p-3">NOTES TO CUSTOMER</p>
            <p className="text-3xl font-semibold  p-2">
              sellers note to customer
            </p>
            <p className="text-3xl font-bold  p-2">TERMS AND CONDITIONS</p>
            <p className="text-3xl font-semibold  p-2">
              Seller's terms And conditions
            </p>
            <p className="text-3xl font-bold  p-2">ATTACHMENTS</p>
            <p className="text-3xl font-semibold  p-2">newnxs-logo.png</p>
          </div>
          <div className=" h-80"></div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
