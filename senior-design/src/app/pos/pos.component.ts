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
  total: number;
 
  products: any[] = []; // Define an array to store the retrieved products
  checkoutItems: CheckoutItem[] = []; //Array for Checkout Items

  //When page is loaded, favorite products and current items in checkout are loaded and displayed
  constructor(private productService: ProductService, private paymentService: PaymentService) {
    this.products = this.productService.getFavProducts();
    this.checkoutItems = this.productService.getCheckoutItems();
    this.total = this.productService.getTotal();
  }

  
  ngOnInit(): void {
  }
  

  // convertToDollars(pesoAmount: number): number {
  //   const exchangeRate = 0.056; // 1 peso = 0.05 dollars
  //   return pesoAmount * exchangeRate;
  // }

  //Adds Product to Checkout Item Array and updates pricing
  addtoCheckout(itemtext: string, itemID: string, itemprice: number, bulkprice: number, count: number) {
    Swal.fire({
      title: 'Do you want to buy Individual Product or in Bulk?',
      showDenyButton: true,
      confirmButtonText: 'Bulk',
      denyButtonText: `Individual`,
    }).then((result) => {
      if (result.isConfirmed) {
        const newItem = new CheckoutItem(itemtext, itemID, itemprice, true);
        this.productService.addCheckoutItem(newItem);
        this.productService.updateTotal(itemprice);
        this.total = this.total + itemprice;
      }
      else{
        const newItem = new CheckoutItem(itemtext, itemID, bulkprice, false);
        this.productService.addCheckoutItem(newItem);
        this.productService.updateTotal(bulkprice);
        this.total = this.total + bulkprice;
      }
    })

    
  }

  //Increments desired product and updates pricing
  plusCount(item: CheckoutItem){
    item.count++;
    this.total = this.total + item.price;
    this.productService.updateTotal(item.price);
    item.price *=2;
  }

  //Decrements desired product and updates pricing
  minusCount(item: CheckoutItem){
    item.count--;
    const index = this.checkoutItems.indexOf(item);

    if(item.count == 0 && index != -1){
      this.checkoutItems.splice(index, 1);
    }
    item.price /=2;
    this.total = this.total - item.price;
    this.productService.updateTotal(item.price* -1);
  }
  

  //Calls makePayment API Call; processes payment transaction
  //Uses SweeAlert Popup
  makePayment() {
    const paymentData = {
      orderTotal: this.total,
      products: this.checkoutItems.map(item => ({
        productId: item.name,
        quantity: item.count,
        price: item.price,
        boughtInBulk: item.boughtInBulk
      })),
      customerId: "cus_OwkAvKmcmctUfZ",
      // readerId: "tmr_FTjfRARmJXBs3P"
      readerId:"tmr_FUNvywWDqIlIJo"
    };

    Swal.fire({
      title: 'Do you want to submit this order?',
      text: 'Total is: ' + this.total + '¢',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Go back to checkout`,
    }).then((result) => {
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
