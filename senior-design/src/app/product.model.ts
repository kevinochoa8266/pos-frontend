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
    currPrice: number;
    ogPrice: number;
    count: number;
    boughtInBulk: boolean;
    itemsInPacket: number;
  
    constructor(name: string, id: string, currPrice: number, ogPrice: number, bulk: boolean,  itemsInPacket: number) {
      this.name = name;
      this.id = id;
      this.currPrice = currPrice;
      this.ogPrice = ogPrice;
      this.count = 1;
      this.boughtInBulk = bulk;  
      this.itemsInPacket = itemsInPacket;
    }
  }
  
  