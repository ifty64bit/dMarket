import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";
import abi from "./Test.json";
import Admin from "./components/Admin/Admin";
import Header from "./components/Header";
import Product from "./components/Product";
import Home from "./components/Home";
import Confirm from "./components/Confirm";
import Alart from "./components/Alart";
import Refund from "./components/Refund";

function App() {
  const web3 = useRef();
  const contract = useRef();
  const [account, setAccount] = useState();
  const [sucPop, setSucPop] = useState(false);
  const [ordDet, setOrdDet] = useState();

  const buy = (product, val) => {
    let data;
    axios
      .get("http://localhost:8080/getCount")
      .then((res) => {
        //console.log(res.data[0].order_id);
        //console.log(res.data[0].count);
        contract.current.methods
          .addUnit(res.data[0].order_id + 1, product.owner)
          .send({
            from: account[0],
            value: web3.current.utils.toWei(String(val)),
          })
          .then((res) => {
            product.buyer = account[0];
            axios
              .post("http://localhost:8080/placeOrder", product)
              .then((res) => {
                //console.log(res.data);
                data = res.data;
                setOrdDet(data);
                setSucPop(!sucPop);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const confirm = (id, val) => {
    contract.current.methods
      .deliveryConfirm(id)
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
        setOrdDet(errorMessageToShow);
        setSucPop(!sucPop);
        return;
      });
    //contract.current.methods.products(id).call({ from: account[0] }, (err, res) => {
    //  console.log(res);
    //})
  };

  const updatePop = () => {
    setSucPop(!sucPop);
  };

  useEffect(() => {
    if (window.ethereum) {
      web3.current = new Web3(window.ethereum);
      web3.current.eth
        .getAccounts()
        .then((e) => {
          console.log(e);
          if (e.length === 0) {
            window.ethereum.request({ method: "eth_requestAccounts" });
          } else {
            setAccount(e);
          }
          window.ethereum.on("accountsChanged", function (accounts) {
            console.log(accounts);
            setAccount(accounts);
          });
        })
        .catch((e) => console.log(e));
      contract.current = new web3.current.eth.Contract(
        abi.abi,
        "0xF72EEf42b9EC95D9BC007C319CEdDDe1Fb8d29bf"
      );
      console.log(contract.current);
    } else {
      console.log("Install Metamask");
    }
  }, []);

  return (
    <div>
      <Header account={account} />
      {sucPop && <Alart data={ordDet} close={updatePop} />}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product button={buy} />} />
          <Route path={`/confirm`} element={<Confirm confirm={confirm} />} />
          <Route
            path={`/refund`}
            element={<Refund contract={contract.current} account={account} />}
          />
          <Route path={`/admin`} element={<Admin account={account} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
