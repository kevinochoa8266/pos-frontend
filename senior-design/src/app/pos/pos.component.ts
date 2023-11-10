import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckoutItem } from '../product.model';
import { ProductService } from '../product.service';
import { PaymentService } from '../payment.service';
import Swal from 'sweetalert2';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent {
  search : String ="";
  opened = false;
  total: number;
  isButtonEnabled: boolean = true;
  products: any[] = []; // Define an array to store the retrieved products
  checkoutItems: CheckoutItem[] = []; //Array for Checkout Items
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

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
    console.log(this.products);
    Swal.fire({
      title: 'Do you want to buy Individual Product or in Bulk?',
      allowOutsideClick: false,
      showDenyButton: true,
      confirmButtonText: 'Bulk',
      denyButtonText: `Individual`,
    }).then((result) => {
      if (result.isConfirmed) {
        const newItem = new CheckoutItem(itemtext, itemID, bulkprice, true);
        this.productService.addCheckoutItem(newItem);
        this.productService.updateTotal(bulkprice);
        this.total = this.total + bulkprice;
        this.sidenav.open();
      }
      else{
        const newItem = new CheckoutItem(itemtext, itemID, itemprice, false);
        this.productService.addCheckoutItem(newItem);
        this.productService.updateTotal(itemprice);
        this.total = this.total + itemprice;
        this.sidenav.open();
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
    this.total = this.total - item.price;
    this.productService.updateTotal(item.price* -1);
    item.price /=2;
  }
  

  //Calls makePayment API Call; processes payment transaction
  //Uses SweeAlert Popup
  async makePayment() {
    let userEmail: string = '';
    Swal.fire({
      title: "Would you like a receipt?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed || result.isDenied) {
        if(result.isConfirmed){
          const { value: email } = await Swal.fire({
            title: "Input email address",
            input: "email",
            inputLabel: "Your email address",
            inputPlaceholder: "Enter your email address"
          });
          if (email) {
            Swal.fire(`Entered email: ${email}`);
            userEmail = email as string;
          }
        }
        console.log(userEmail);

        const paymentData = {
          orderTotal: this.total,
          products: this.checkoutItems.map(item => ({
            productId: item.id,
            quantity: item.count,
            price: item.price,
            boughtInBulk: item.boughtInBulk
          })),
          // email: userEmail,
          customerId: "cus_OwkAvKmcmctUfZ",
          readerId:"tmr_FUNvywWDqIlIJo"
        };
      
        Swal.fire({
          title: 'Do you want to submit this order?',
          text: 'Total is: ' + this.total + '¢',
          allowOutsideClick: false,
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `Go back to checkout`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Processing payment',
              allowOutsideClick: false,
              showConfirmButton: false,
              willOpen: () => {
                Swal.showLoading();
              },
            });
    
            this.paymentService.makePayment(paymentData).subscribe(
              (response) => {
                //If payment is successful, clear checkout items, clear total, and close sidenav
                console.log('Paymsent successful:', response);  
                Swal.fire('Payment successful!', '', 'success');
                this.checkoutItems = [];
                this.total = 0;
                this.productService.clearCheckoutItems();
                this.productService.updateTotal(this.productService.getTotal() * -1);
                this.sidenav.close();
              },
              (error) => {
                console.error('Error making payment:', error);
                Swal.fire('Error making payment', '', 'error')
              }
            ); 
          } 
        })
      } 
      else {
        // Handle the case when the user clicks "Cancel" (outside click or close button)
        console.log('User canceled the action.');
      }
    });
    

    
  }
}
