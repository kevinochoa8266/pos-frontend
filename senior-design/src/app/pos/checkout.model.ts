export class CheckoutItem {
    name: string;
    price: number;
    count: number;
    boughtInBulk: boolean;
  
    constructor(name: string, price: number) {
      this.name = name;
      this.price = price;
      this.count = 1;
      this.boughtInBulk = false;  
    }
  }