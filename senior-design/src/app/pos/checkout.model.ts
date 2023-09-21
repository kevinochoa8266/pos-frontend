export class CheckoutItem {
    name: string;
    price: number;
    count: number;
  
    constructor(name: string, price: number) {
      this.name = name;
      this.price = price;
      this.count = 1;
    }
  }