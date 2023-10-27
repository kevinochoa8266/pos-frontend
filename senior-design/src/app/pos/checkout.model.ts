export class CheckoutItem {
    name: string;
    id: string;
    price: number;
    count: number;
    boughtInBulk: boolean;
  
    constructor(name: string, id: string, price: number) {
      this.name = name;
      this.id = id;
      this.price = price;
      this.count = 1;
      this.boughtInBulk = false;  
    }
  }
  