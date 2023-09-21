import { Component } from '@angular/core';
import { CheckoutItem } from './checkout.model';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent {
  search : String ="";
  opened = false;
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  items = [
    { id: 1, text: 'Item 1', price: '1', pic: "assets/img/logo1.png"},
    { id: 2, text: 'Item 2', price: '2', pic: "assets/img/localStorage.png"},
    { id: 3, text: 'Item 3', price: '3', pic: "assets/img/localStorage.png"},
    { id: 1, text: 'Item 1', price: '1', pic: "assets/img/logo1.png"},
    { id: 2, text: 'Item 2', price: '2', pic: "assets/img/localStorage.png"},
    { id: 3, text: 'Item 3', price: '3', pic: "assets/img/localStorage.png"},
    { id: 1, text: 'Item 1', price: '1', pic: "assets/img/logo1.png"},
    { id: 2, text: 'Item 2', price: '2', pic: "assets/img/localStorage.png"},
    { id: 3, text: 'Item 3', price: '3', pic: "assets/img/localStorage.png"},
    { id: 1, text: 'Item 1', price: '1', pic: "assets/img/logo1.png"},
    { id: 2, text: 'Item 2', price: '2', pic: "assets/img/localStorage.png"},
    { id: 3, text: 'Item 3', price: '3', pic: "assets/img/localStorage.png"},
    { id: 1, text: 'Item 1', price: '1', pic: "assets/img/logo1.png"},
    { id: 2, text: 'Item 2', price: '2', pic: "assets/img/localStorage.png"},
    { id: 3, text: 'Item 3', price: '3', pic: "assets/img/localStorage.png"},
    
    
  ];

  // checkoutItem: Checkout;

  // constructor(name:string, price:number) {
  //   // Initialize the checkoutItem object
  //   this.checkoutItem = new Checkout(name, price, 1); // Example values
  // }


 
  // checkoutList = [
  //   { text: 'Item 1', price: 1, pic: "assets/img/logo1.png"},
  // ];
  checkoutItems: CheckoutItem[] = [];

  // checkoutList : any[] = [];

  addtoCheckout(itemtext: string, itemprice: number, count: number) {
    // this.checkoutList.push({text: itemtext, price: itemprice, pic: "assets/img/logo1.png"});
    const newItem = new CheckoutItem(itemtext, itemprice);
    this.checkoutItems.push(newItem);
    // this.checkoutList.push({ name: itemtext, price: itemprice, pic: "assets/img/logo1.png" });

    this.subtotal = this.subtotal + itemprice;
    this.updatePrice();
  }
  plusCount(item: CheckoutItem){
    item.count++;
    this.subtotal = this.subtotal + item.price;
    item.price *=2;
    this.updatePrice();
  }

  minusCount(item: CheckoutItem){
    item.count--;
    const index = this.checkoutItems.indexOf(item);

    if(item.count == 0 && index != -1){
      this.checkoutItems.splice(index, 1);
    }
    item.price /=2;
    this.subtotal = this.subtotal - item.price;
    this.updatePrice();
  }

  updatePrice(){
    this.tax = 0.7 * this.subtotal;
    this.total = this.subtotal + this.tax;
  }

  

}
