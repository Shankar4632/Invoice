import React, { useState } from "react";

const Demo = () => {
  const [additems, setAdditems] = useState([
    { additems: "" },
    { additems: "" },
  ]);
  return (
    <div>
      {additems.map((item, index) => {
        return (
          <div key={index}>
            <input id="additems" type="text" name="additems" />;
          </div>
        );
      })}
    </div>
  );
};

export default Demo;
