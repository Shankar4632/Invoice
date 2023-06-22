import React from "react";

const Demo = () => {
  return (
    <div className="w-full h-auto  border ">
      <div className="grid grid-cols-2  text-end  h-auto">
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
      <div className="w-[95%] mx-auto">
        <table className="w-full p-6 text-xs text-left whitespace-nowrap">
          <thead>
            <tr className="dark:bg-gray-700">
              <th className="p-3">A-Z</th>
              <th className="p-3">Name</th>
              <th className="p-3">Job title</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
            <tr>
              <td className="px-3 text-2xl font-medium dark:text-gray-400">
                A
              </td>
              <td className="px-3 py-2">
                <p>Dwight Adams</p>
              </td>
              <td className="px-3 py-2">
                <span>UI Designer</span>
                <p className="dark:text-gray-400">Spirit Media</p>
              </td>
              <td className="px-3 py-2">
                <p>555-873-9812</p>
              </td>
              <td className="px-3 py-2">
                <p>dwight@adams.com</p>
              </td>
            </tr>
            <tr>
              <td className="px-3 text-2xl font-medium dark:text-gray-400"></td>
              <td className="px-3 py-2">
                <p>Richie Allen</p>
              </td>
              <td className="px-3 py-2">
                <span>Geothermal Technician</span>
                <p className="dark:text-gray-400">Icecorps</p>
              </td>
              <td className="px-3 py-2">
                <p>555-129-0761</p>
              </td>
              <td className="px-3 py-2">
                <p>richie@allen.com</p>
              </td>
            </tr>
          </tbody>
          <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
            <tr>
              <td className="px-3 text-2xl font-medium dark:text-gray-400">
                B
              </td>
              <td className="px-3 py-2">
                <p>Alex Bridges</p>
              </td>
              <td className="px-3 py-2">
                <span>Administrative Services Manager</span>
                <p className="dark:text-gray-400">Smilectronics</p>
              </td>
              <td className="px-3 py-2">
                <p>555-238-9890</p>
              </td>
              <td className="px-3 py-2">
                <p>alex@bridges.com</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Demo;
