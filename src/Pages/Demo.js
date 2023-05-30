import React, { useState } from "react";

const Demo = () => {
  const [fields, setFields] = useState(["name", "username", "password"]);
  const [selectedFields, setSelectedFields] = useState([]);

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Add or remove the field based on checkbox selection
    if (checked) {
      setFields((prevFields) => [...prevFields, value]);
    } else {
      setFields((prevFields) => prevFields.filter((field) => field !== value));
    }
  };

  // Handle save button click
  const handleSaveClick = () => {
    // Process the form data
    // You can access the values using the field names and perform further actions
    setSelectedFields(fields);
  };

  // Render the form fields
  const renderFields = () => {
    return fields.map((field) => (
      <div key={field}>
        <label>{field}</label>
        <input type="text" name={field} />
      </div>
    ));
  };

  // Render the selected fields below the form
  const renderSelectedFields = () => {
    return selectedFields.map((field) => (
      <div key={field}>
        <label>{field}</label>
        <input type="text" name={field} value={field} readOnly />
      </div>
    ));
  };

  return (
    <div>
      <label>
        <input type="checkbox" value="email" onChange={handleCheckboxChange} />
        Email
      </label>
      <label>
        <input
          type="checkbox"
          value="address"
          onChange={handleCheckboxChange}
        />
        Address
      </label>
      {renderFields()}
      <button onClick={handleSaveClick}>Save</button>
      <div>
        <h3>Selected Fields:</h3>
        {renderSelectedFields()}
      </div>
    </div>
  );
};

export default Demo;
