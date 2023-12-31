class OrderID {
  _orderID: string;
  _customerID: number;
  _orderStatus: string;
  _orderPlacedDate: string;
  _orderCompletedDate?: string;

  constructor(
    orderID: string,
    customerID: number,
    orderStatus: string,
    orderPlacedDate: string
  ) {
    this._orderID = orderID;
    this._customerID = customerID;
    this._orderStatus = orderStatus;
    this._orderPlacedDate = orderPlacedDate;
  }

  get orderID(): string {
    return this._orderID;
  }

  get customerID(): number {
    return this._customerID;
  }

  get orderStatus(): string {
    return this._orderStatus;
  }

  get orderCompletedDate(): string | undefined {
    return this._orderCompletedDate;
  }

  get orderPlacedDate(): string {
    return this._orderPlacedDate;
  }

  set orderID(orderID: string) {
    this._orderID = orderID;
  }

  set customerID(customerID: number) {
    this._customerID = customerID;
  }

  set orderStatus(orderStatus: string) {
    this._orderStatus = orderStatus;
  }

  set orderCompletedDate(orderCompletedDate: string) {
    this._orderCompletedDate = orderCompletedDate;
  }

  set orderPlacedDate(orderPlacedDate: string) {
    this._orderPlacedDate = orderPlacedDate;
  }
}

export default OrderID;
