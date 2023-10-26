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

  constructor(private productService: ProductService, private paymentService: PaymentService) { }

  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  

  convertToDollars(pesoAmount: number): number {
    const exchangeRate = 0.056; // 1 peso = 0.05 dollars
    return pesoAmount * exchangeRate;
  }

  addtoCheckout(itemtext: string, itemprice: number, count: number) {
    // this.checkoutList.push({text: itemtext, price: itemprice, pic: "assets/img/logo1.png"});
    const newItem = new CheckoutItem(itemtext, this.convertToDollars(itemprice));

    this.checkoutItems.push(newItem);
    // this.checkoutList.push({ name: itemtext, price: itemprice, pic: "assets/img/logo1.png" });

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
      id: "123456",
      orderTotal: this.total,
      products: this.checkoutItems.map(item => ({
        productId: item.name,
        quantity: item.count,
        price: item.price,
        boughtInBulk: item.boughtInBulk
      })),
      customerId: 123,
      date: "2023-10-14T14:30:00Z",
      readerId: "tmr_FTOPRQP39zuh2R"
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
