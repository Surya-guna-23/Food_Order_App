import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "./cartcontext";
import { currencyFormatter } from "../utils/format";

import Input from "./Input";
import Button from "../UI/Button";
import Userprogresscontext from "../Store/Userprogresscontext";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressctx = useContext(Userprogresscontext);
  console.log("check out " + userProgressctx.progress);
  const cartotal = cartCtx.items.reduce(
    (totalprice, item) => totalprice + item.quantity * item.price,
    0
  );

  function handleclose() {
    userProgressctx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerdata = Object.fromEntries(fd.entries());

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

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleclose}>
            Close
          </Button>
          <Button type="sumbit">Sumbit order</Button>
        </p>
      </form>
    </Modal>
  );
}
