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
  
  export class Product {
    id: string;
    name: string;
    unitPrice: number;
    bulkPrice: number;
    inventory: number;
    itemsInPacket: number;
    storeId: string;

    constructor(data: any) {
      this.id = data.id;
      this.name = data.name;
      this.unitPrice = data.unitPrice;
      this.bulkPrice = data.bulkPrice;
      this.inventory = data.inventory;
      this.itemsInPacket = data.itemsInPacket;
      this.storeId = data.storeId;
    }
 
  }