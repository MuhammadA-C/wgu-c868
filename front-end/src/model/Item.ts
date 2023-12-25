abstract class Item {
  _name: string;
  _price: number;

  constructor(name: string, price: number) {
    this._name = name;
    this._price = price;
  }

  abstract get name(): string;
  abstract get price(): number;
}

export default Item;
