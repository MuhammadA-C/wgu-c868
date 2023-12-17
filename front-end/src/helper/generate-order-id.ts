function generateRandomNum(min: number, max: number): number {
  min = Math.ceil(min); //Rounds the min up to the nearest integer
  max = Math.floor(max); //Rounds the max down to the nearest integer

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateOrderID(): string {
  //Note: The order id pattern is XXX-XXXXXX-XXXX (0-9)
  const XXX: number = generateRandomNum(100, 999);
  const XXXXXX: number = generateRandomNum(100000, 999999);
  const XXXX: number = generateRandomNum(1000, 9999);

  return `${XXX}-${XXXXXX}-${XXXX}`;
}

export default generateOrderID;
