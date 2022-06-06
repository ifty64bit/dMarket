import { useState, useRef } from "react";
import Button from "./Button";
import Alart from "./Alart";

function Refund({ contract, account }) {
  const input = useRef();
  const [sucPop, setSucPop] = useState(false);
  const [ordDet, setOrdDet] = useState();
  const updatePop = () => {
    setSucPop(!sucPop);
  };
  const onClick = () => {
    if (!input.current.value) {
      return;
    }
    contract.methods
      .refund(input.current.value)
      .send({ from: account[0] })
      .then((res) => console.log(res))
        .catch((err) => {
            var errorMessageInJson = JSON.parse(
                err.message.slice(58, err.message.length - 2)
              );
      
              var errorMessageToShow =
                errorMessageInJson.data.data[
                  Object.keys(errorMessageInJson.data.data)[0]
                ].reason;
          console.log(errorMessageToShow);
              setOrdDet(errorMessageToShow);
              setSucPop(!sucPop);
              return;
      });
  };
  return (
    <div>
      {sucPop && <Alart data={ordDet} close={updatePop} />}
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col">
          <label>Enter Order ID</label>
          <input
            ref={input}
            className="mb-4 outline-none border-black border-2 rounded px-2"
            type="text"
          />
          <Button onClick={onClick} product={input}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Refund;
