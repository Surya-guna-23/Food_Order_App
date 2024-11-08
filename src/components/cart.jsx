import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "./cartcontext";
import { currencyFormatter } from "../utils/format.js";
import Button from "../UI/Button.jsx";
import Userprogresscontext from "../Store/Userprogresscontext.jsx";
import CarItem from "./CartItem.jsx";

export default function Cart() {
  const cartcx = useContext(CartContext);
  const userprogressctx = useContext(Userprogresscontext);
  console.log(userprogressctx.progress);
  const cartotal = cartcx.items.reduce(
    (totalprice, item) => totalprice + item.quantity * item.price,
    0
  );

  function handleclosecart() {
    userprogressctx.hideCart();
  }
  function handlegotocheckout() {
    userprogressctx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userprogressctx.progress === "cart"}
      onClose={userprogressctx.progress === "cart" ? handleclosecart : null}
    >
      <h2> Your cart</h2>
      <ul>
        {cartcx.items.map((item) => (
          <CarItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartcx.additem(item)}
            OnDecrease={() => cartcx.removeitem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-toatl">{currencyFormatter.format(cartotal)}</p>
      <p>
        <Button textOnly onClick={handleclosecart}>
          Close
        </Button>
        {cartcx.items.length > 0 && (
          <Button onClick={handlegotocheckout}>Go to Checkout </Button>
        )}
      </p>
    </Modal>
  );
}
