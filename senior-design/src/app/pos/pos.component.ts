import { Component, OnInit } from '@angular/core';
import { CheckoutItem } from '../product.model';
import { ProductService } from '../product.service';
import { PaymentService } from '../payment.service';
import Swal from 'sweetalert2';

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
  checkoutItems: CheckoutItem[] = []; //Array for Checkout Items

  //When page is loaded, favorite products and current items in checkout are loaded and displayed
  constructor(private productService: ProductService, private paymentService: PaymentService) {
    this.products = this.productService.getFavProducts();
    this.checkoutItems = this.productService.getCheckoutItems();
  }

  
  ngOnInit(): void {
  }
  

  convertToDollars(pesoAmount: number): number {
    const exchangeRate = 0.056; // 1 peso = 0.05 dollars
    return pesoAmount * exchangeRate;
  }

  //Adds Product to Checkout Item Array and updates pricing
  addtoCheckout(itemtext: string, itemID: string, itemprice: number, count: number) {
    const newItem = new CheckoutItem(itemtext, itemID, this.convertToDollars(itemprice));
    // this.checkoutItems.push(newItem);
    this.productService.addCheckoutItem(newItem);

    this.subtotal = this.subtotal + this.convertToDollars(itemprice);
    this.updatePrice();
  }

  //Increments desired product and updates pricing
  plusCount(item: CheckoutItem){
    item.count++;
    this.subtotal = this.subtotal + item.price;
    item.price *=2;
    this.updatePrice();
  }

  //Decrements desired product and updates pricing
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
  
  //Updates Pricing
  updatePrice(){
    this.tax = 0.7 * this.subtotal;
    this.total = this.subtotal + this.tax;
  }

  //Calls makePayment API Call; processes payment transaction
  //Uses SweeAlert Popup
  makePayment() {
    const paymentData = {
      orderTotal: this.total,
      products: this.checkoutItems.map(item => ({
        productId: item.name,
        quantity: item.count,
        // price: item.price,
        price: item.price,
        boughtInBulk: item.boughtInBulk
      })),
      customerId: 123,
      readerId: "tmr_FTjfRARmJXBs3P"
    };

    Swal.fire({
      title: 'Do you want to submit this order?',
      text: 'Total is: ' + this.total,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Go back to checkout`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.paymentService.makePayment(paymentData).subscribe(
          (response) => {
            console.log('Payment successful:', response);  
            Swal.fire('Payment successful!', '', 'success')
          },
          (error) => {
            console.error('Error making payment:', error);
            Swal.fire('Error making payment', '', 'error')
          }
        ); 
      } 
    })
  }
}
