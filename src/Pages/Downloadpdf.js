import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataRef } from "../firebase-config";

const Downloadpdf = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await dataRef.ref("Allsections").once("value");
        const fetchedData = snapshot.val();
        setData(fetchedData);
        setIsLoading(false);
        console.log("Fetched Data:", fetchedData);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated Data:", data);
  }, [data]);
  //loading
  if (isLoading) {
    return (
      <>
        <div className="flex justify-center text-3xl">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="text-blue-800  ">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="w-full h-auto  border bg-white ">
      {Object.keys(data).map((key, index) => {
        if (selectedKey === key) {
          return (
            <>
              <div
                key={key}
                className="grid grid-cols-2  text-end  bg-white h-auto"
              >
                <div className="flex justify-start items-center ml-20 ">
                  {data[key].section6Businessinformation.imageUrl && (
                    <img
                      src={data[key].section6Businessinformation.imageUrl}
                      alt="Business Logo"
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </div>
                <div className="pr-6">
                  <h1 className="text-[50px] font-semibold ">INVOICE</h1>
                  <p className="text-2xl font-semibold p-1">
                    Company Name :
                    {
                      data[key].section6Businessinformation.inputbusiness
                        .businessname
                    }
                  </p>
                  <p className="text-2xl font-semibold p-1">
                    Address:
                    {
                      data[key].section6Businessinformation.inputbusiness
                        .address1
                    }
                  </p>
                  <p className="text-2xl font-semibold p-1">TIN/PAN </p>
                  <p className="text-2xl font-semibold p-1">
                    Phone No. :
                    {data[key].section6Businessinformation.inputbusiness.pin}
                  </p>
                  <p className="text-2xl font-semibold p-1">
                    Email ID. :
                    {data[key].section6Businessinformation.inputbusiness.email}
                  </p>
                  <p className="text-2xl font-semibold p-1">
                    Website :
                    {
                      data[key].section6Businessinformation.inputbusiness
                        .website
                    }
                  </p>
                </div>
              </div>

              <div className="h-48 w-[95%] mx-auto bg-gray-200">
                <div className="grid grid-cols-2  h-full">
                  <div className="  ">
                    <p className="text-2xl font-semibold p-2">
                      Invoice no.
                      {data[key].section5total.inputuser5.invoicenumber}
                    </p>
                    <p className="text-2xl font-semibold p-2">
                      Invoice date.{" "}
                      {data[key].section5total.inputuser5.invoicedate}
                    </p>
                    <p className="text-2xl font-semibold p-2">Reference</p>
                    <p className="text-2xl font-semibold pl-2">
                      Due date.
                      {data[key].section5total.inputuser5.invoicedue}
                    </p>
                  </div>
                  <div className=" font-semibold grid justify-end items-end  ">
                    <div className=" mt-10 text-[45px]">
                      ${data[key].section5total.total}.00
                    </div>
                    <div className=" text-[35px] font-bold">AMOUNT DUE</div>
                  </div>
                </div>
              </div>
              <div className=" w-[95%] mx-auto">
                <div className="grid grid-cols-2 mt-5 h-auto">
                  <div className=" ">
                    <p className="text-2xl font-bold p-1">BILL TO</p>

                    <p className="text-2xl  font-semibold  p-1">
                      {data[key].section1.businessname}
                    </p>
                    <p className="text-2xl  font-semibold  p-1">
                      {data[key].section1.firstname}
                    </p>
                    <p className="text-2xl  font-semibold  p-1">
                      {data[key].section1.lastname}
                    </p>
                    <p className="text-2xl  font-semibold p-1 ">
                      Address1 :{data[key].section1.address1}
                    </p>
                    <p className="text-2xl  font-semibold p-1 ">
                      Address2 :{data[key].section1.address2}
                    </p>
                    <p className="text-2xl  font-semibold  p-1">
                      Email Id:-{data[key].section1.email}
                    </p>
                    <p className="text-2xl  font-semibold pl-1  ">
                      Phone No:- {data[key].section1.phone}
                    </p>
                  </div>
                  <div className=" ">
                    <p className="text-2xl font-bold p-1">SEND TO</p>

                    <p className="text-2xl  font-semibold  p-1">
                      {data[key].section1.dbusinessname}
                    </p>
                    <p className="text-2xl  font-semibold  p-1">
                      {data[key].section1.dfirstname}
                    </p>
                    <p className="text-2xl  font-semibold  p-1">
                      {data[key].section1.dlastname}
                    </p>
                    <p className="text-2xl  font-semibold p-1 ">
                      {data[key].section1.daddress1}
                    </p>
                    <p className="text-2xl  font-semibold p-1 ">
                      {data[key].section1.daddress2}
                    </p>
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
                  {data[key].section2.map((key, index) => (
                    <tbody key={key} className="cursor-pointer">
                      <tr className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  ">
                        <td className="px-3 text-2xl font-medium dark:text-gray-400 py-3 ">
                          {index + 1}
                        </td>
                        <td className="px-3 text-2xl font-medium dark:text-gray-400 py-3 ">
                          {key?.ItemName}
                        </td>

                        <td className="px-3 py-2 ">
                          <span> {key?.quantity}</span>
                          <p className="dark:text-gray-400"></p>
                        </td>
                        <td className="px-3 py-2">
                          <p>${key?.price}</p>
                        </td>
                        <td className="px-10 py-2">
                          <p>${key?.amount}</p>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="">
                <div className="grid grid-cols-2 ">
                  <div className=" h-48"></div>
                  <div className=" h-48 ">
                    <p className="text-xl p-2 font-semibold flex justify-end">
                      Subtotal{" "}
                      <span className="pr-10">
                        ${data[key].section5total.subtotal}
                      </span>
                    </p>
                    <p className="text-xl p-2 font-semibold border-b-4 border-gray-200 flex justify-end">
                      Shipping{" "}
                      <span className="pr-10">
                        ${data[key].section5total.shipping}
                      </span>
                    </p>
                    <p className="font-bold text-2xl p-4 pr-10 flex justify-end border-b-4 border-gray-200">
                      ToTal ${data[key].section5total.total}USD
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
                    <p className="text-3xl font-bold  p-2">
                      TERMS AND CONDITIONS
                    </p>
                    <p className="text-3xl font-semibold  p-2">
                      Seller's terms And conditions
                    </p>
                    <p className="text-3xl font-bold  p-2">ATTACHMENTS</p>
                    <p className="text-3xl font-semibold  p-2">
                      newnxs-logo.png
                    </p>
                  </div>
                  <div className=" h-80"></div>
                </div>
              </div>
            </>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Downloadpdf;
