import React from "react";
import Button from "./Button";

function Alart({ data, close }) {
  console.log("Alart "+data);
  return (
    <div className="absolute inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm">
      <div className=" w-1/2 h-1/4 bg-green-400 rounded-xl ">
        <div className="flex flex-col h-full justify-center items-center">
          { Boolean(data.insertId) && true ? (
            <>
              <div>Order Placed</div>
              <div>Order ID: {data.insertId}</div>
            </>
          ) : (
            <div>{data}</div>
          )}

          <Button onClick={close}>OK</Button>
        </div>
      </div>
    </div>
  );
}

export default Alart;
