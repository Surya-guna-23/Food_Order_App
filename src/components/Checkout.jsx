import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "./cartcontext";
import { currencyFormatter } from "../utils/format";
import Error from "./Error.jsx";
import Input from "./Input";
import Button from "../UI/Button";
import Userprogresscontext from "../Store/Userprogresscontext";
import useHttp from "./hooks/useHttp";

const requestconfig ={
  method:'POST',
  headers: {
    'Content-Type':'application/json'
  }
}

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressctx = useContext(Userprogresscontext);

  const{data,isloading:isSending  ,error,sendRequest,cleardata}=useHttp('http://localhost:3000/orders',requestconfig)
  console.log("check out " + userProgressctx.progress);
  const cartotal = cartCtx.items.reduce(
    (totalprice, item) => totalprice + item.quantity * item.price,
    0
  );

  function handleclose() {
    userProgressctx.hideCheckout();
  }

  function handlefinish(){
    userProgressctx.hideCheckout();
    cartCtx.clearcart();
    cleardata();
  }
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerdata = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerdata,
        },
      }),
    )
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerdata,
        },
      }),
    });
  }

  let actions =(
    <>
    <Button type="button" textOnly onClick={handleclose}>
            Close
          </Button>
          <Button type="sumbit">Sumbit order</Button>
     
      </>

      
  );
  if (isSending){
    actions=<span> Sending order data...</span>
  }
      
  if(data&& !error){
    return<Modal open={userProgressctx.progress ==='checkout'} onClose={handlefinish}>
      <h2>Success!</h2>
      <p>your order was submitted successfully</p>
      <p>we will get back with you with more details via email within few minutes</p>
      <p className="modal-actions">
        <Button onClick={handlefinish}>okay</Button>
      </p>
    </Modal>
  }
  return (
    <Modal open={userProgressctx.progress === "checkout"} onClose={handleclose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount {currencyFormatter.format(cartotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="postal code" type="text" id="postal-code" />
          <Input label="city" type="text" id="city" />
        </div>

      {error && <Error title="Failed to sumbit order" message={error}/>}
        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  );
}
