import Item from "./Item";

class CartItem extends Item {
  _menuItemID: number;
  _quantity: number;
  _total?: number;

  constructor(
    menuItemID: number,
    name: string,
    quantity: number,
    price: number
  ) {
    super(name, price);
    this._menuItemID = menuItemID;
    this._quantity = quantity;
  }

  get total(): number {
    return this.price * this.quantity;
  }

  get menuItemID(): number {
    return this.menuItemID;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  get name(): string {
    return this._name;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }
}

export default CartItem;
