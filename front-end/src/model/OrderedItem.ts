class OrderedItem {
  _orderedItemID?: number;
  _orderID: string;
  _menuItemID: number;
  _price: number;
  _quantity: number;

  constructor(
    orderID: string,
    menuItemID: number,
    price: number,
    quantity: number
  ) {
    this._orderID = orderID;
    this._menuItemID = menuItemID;
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

  get menuItemID(): number {
    return this.menuItemID;
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

  set menuItemID(menuItemID: number) {
    this.menuItemID = menuItemID;
  }

  set price(price: number) {
    this._price = price;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }
}
