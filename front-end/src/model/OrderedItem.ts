class OrderedItem {
  _orderedItemID?: number;
  _orderID: string;
  _menuItemName: string;
  _price: number;
  _quantity: number;

  constructor(
    orderID: string,
    menuItemName: string,
    price: number,
    quantity: number
  ) {
    this._orderID = orderID;
    this._menuItemName = menuItemName;
    this._price = price;
    this._quantity = quantity;
  }

  get OrderedItem(): number {
    if (this._orderedItemID != undefined) {
      return this._orderedItemID;
    }
    return -1; // -1 will be used to let the user know that the id was never set
  }

  get orderID(): string {
    return this._orderID;
  }

  get menuItemName(): string {
    return this._menuItemName;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  set orderedItemID(orderedItemID: number) {
    this._orderedItemID = orderedItemID;
  }

  set orderID(orderID: string) {
    this._orderID = orderID;
  }

  set menuItemName(menuItemName: string) {
    this._menuItemName = menuItemName;
  }

  set price(price: number) {
    this._price = price;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }
}

export default OrderedItem;
