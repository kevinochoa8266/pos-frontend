import { Component, OnInit } from '@angular/core';
import { CheckoutItem } from './checkout.model';
import { ProductService } from '../product.service';
import { PaymentService } from '../payment.service';

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
 

  products: any[] = []; // Define an array to store the retrieved products
  checkoutItems: CheckoutItem[] = [];

  constructor(private productService: ProductService, private paymentService: PaymentService) {
    this.products = this.productService.getFavProducts();
  }

  
  ngOnInit(): void {
    // this.productService.getProducts().subscribe(
    //   (data) => {
    //     this.products = data;
    //   },
    //   (error) => {
    //     console.error('Error fetching products:', error);
    //   }
    // );
  }
  

  convertToDollars(pesoAmount: number): number {
    const exchangeRate = 0.056; // 1 peso = 0.05 dollars
    return pesoAmount * exchangeRate;
  }

  addtoCheckout(itemtext: string, itemID: string, itemprice: number, count: number) {
    const newItem = new CheckoutItem(itemtext, itemID, this.convertToDollars(itemprice));
    console.log(this.convertToDollars(itemprice));
    this.checkoutItems.push(newItem);
    console.log(newItem);

    this.subtotal = this.subtotal + this.convertToDollars(itemprice);
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

  makePayment() {
    const paymentData = {
      orderTotal: "500",
      products: this.checkoutItems.map(item => ({
        productId: item.name,
        quantity: item.count,
        // price: item.price,
        price: 500,
        boughtInBulk: item.boughtInBulk
      })),
      customerId: 123,
      readerId: "tmr_FTjfRARmJXBs3P"
    };

    this.paymentService.makePayment(paymentData).subscribe(
      (response) => {
        console.log('Payment successful:', response);  
        // Handle successful payment response here
      },
      (error) => {
        console.error('Error making payment:', error);
        // Handle errors here
      }
    );
  }

  

}
