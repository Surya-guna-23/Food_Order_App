import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  additem: (item) => {},
  removeitem: (id) => {},
  clearcart:()=>{}
});

function cartreducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingitemindex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updateitems = [...state.items];
    if (existingitemindex > -1) {
      const existingitem = state.items[existingitemindex];
      const updateitem = {
        ...existingitem,
        quantity: existingitem.quantity + 1,
      };
      updateitems[existingitemindex] = updateitem;
      return { ...state, items: updateitems };
    } else {
      updateitems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updateitems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingitemindex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingcartitem = state.items[existingitemindex];
    const updateitems = [...state.items];
    if (existingcartitem.quantity === 1) {
      updateitems.splice(existingitemindex, 1);
    } else {
      const updateitem = {
        ...existingcartitem,
        quantity: existingcartitem.quantity - 1,
      };
      updateitems[existingitemindex] = updateitem;
    }
    return { ...state, items: updateitems };
  }

  if(action.type==='CLEAR_CART'){
    return{...state,items:[]}
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchaction] = useReducer(cartreducer, { items: [] });
  function additem(item) {
    dispatchaction({ type: "ADD_ITEM", item });
  }
  function removeitem(id) {
    dispatchaction({ type: "REMOVE_ITEM", id });
  }

  function clearcart(){
    dispatchaction({type:'CLEAR_CART'})
  }
  const CartContextValue = {
    items: cart.items,
    additem,
    removeitem,
    clearcart
  };
  return (
    <CartContext.Provider value={CartContextValue}>
      {children}
    </CartContext.Provider>
  );
}
export default CartContext;
