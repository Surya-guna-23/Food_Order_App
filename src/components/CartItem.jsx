import { currencyFormatter } from "../utils/format.js";

export default function CarItem({
  name,
  quantity,
  price,
  onIncrease,
  OnDecrease,
}) {
  return (
    <li className="car-item">
      <p>
        {name}-{quantity}*{currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={OnDecrease}> -</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
