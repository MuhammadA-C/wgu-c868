import CartItem from "../model/CartItem";

// Note: I will use local storage to store this instead of this singleton!
class Cart {
  static cartItems: CartItem[];
}

export default Cart;
