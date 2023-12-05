//Classes for Product and CheckoutItem
export class Product {
  id: string;
  name: string;
  unitPrice: number;
  bulkPrice: number;
  inventory: number;
  itemsInPacket: number;
  storeId: string;

  constructor(id: string, name: string, unitPrice: number, bulkPrice: number, inventory: number, itemsInPacket: number, storeId: string) {
    this.id = id;
    this.name = name;
    this.unitPrice = unitPrice;
    this.bulkPrice = bulkPrice;
    this.inventory = inventory;
    this.itemsInPacket = itemsInPacket;
    this.storeId = storeId;
  }
}

export class CheckoutItem {
    name: string;
    id: string;
    price: number;
    count: number;
    boughtInBulk: boolean;
  
    constructor(name: string, id: string, price: number, bulk: boolean) {
      this.name = name;
      this.id = id;
      this.price = price;
      this.count = 1;
      this.boughtInBulk = bulk;  
    }
  }
  
  