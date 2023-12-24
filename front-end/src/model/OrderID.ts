class OrderID {
  _orderID: string;
  _customerID: number;
  _orderStatus: string;
  _orderPlacedDate: Date;
  _orderCompletedDate: Date;

  constructor(
    orderID: string,
    customerID: number,
    orderStatus: string,
    orderPlacedDate: Date,
    orderCompletedDate: Date
  ) {
    this._orderID = orderID;
    this._customerID = customerID;
    this._orderStatus = orderStatus;
    this._orderCompletedDate = orderCompletedDate;
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

  get orderCompletedDate(): Date {
    return this._orderCompletedDate;
  }

  get orderPlacedDate(): Date {
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

  set orderCompletedDate(orderCompletedDate: Date) {
    this._orderCompletedDate = orderCompletedDate;
  }

  set orderPlacedDate(orderPlacedDate: Date) {
    this._orderPlacedDate = orderPlacedDate;
  }
}
