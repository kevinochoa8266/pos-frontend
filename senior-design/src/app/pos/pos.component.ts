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
  searchTerm: string = '';
  checkoutItems: CheckoutItem[] = []; //Array for Checkout Items
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  //When page is loaded, favorite products and current items in checkout are loaded and displayed
  constructor(private productService: ProductService, private paymentService: PaymentService) {
    this.products = this.productService.getFavProducts();
    this.checkoutItems = this.productService.getCheckoutItems();
    this.total = this.productService.getTotal();
    console.log('Products: ', this.products)
  }

  
  ngOnInit(): void {
  }
  
  //For search bar, returns filtered search
  get filteredProducts(): any[] {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  //Adds Product to Checkout Item Array and updates pricing
  addtoCheckout(itemtext: string, itemID: string, itemprice: number, bulkprice: number, count: number) {
    console.log(itemID, itemtext);
    if(itemprice > 0){
      Swal.fire({
        title: 'Do you want to buy Individual Product or in Bulk?',
        allowOutsideClick: false,
        showDenyButton: true,
        confirmButtonText: 'Bulk',
        denyButtonText: `Individual`,
      }).then((result) => {
        if (result.isConfirmed) {
          //Bulk is chosen
          const existingItemIndex = this.checkoutItems.findIndex(item => item.id === itemID);
          console.log("ExistingIndex", existingItemIndex, "   Item ID", itemID);
          // Item with the same ID already exists, update its price
          if (existingItemIndex !== -1) {
            if(this.checkoutItems[existingItemIndex].boughtInBulk == true){
              console.log(this.checkoutItems[existingItemIndex].name);
              this.checkoutItems[existingItemIndex].price *= 2;
              this.checkoutItems[existingItemIndex].count++;
            }
            else{
              const newItem = new CheckoutItem(itemtext, itemID, bulkprice, true);
              // this.checkoutItems.push(newItem);
              console.log("pushed here 3");
              this.productService.addCheckoutItem(newItem);
              this.productService.updateTotal(bulkprice);
              this.total = this.total + bulkprice;
            } 
          } 
          //New Checkout Item
          // Item with the same ID does not exist, add a new item to the list
          else {

            const newItem = new CheckoutItem(itemtext, itemID, bulkprice, true);
            console.log("pushed here 4");
            // this.checkoutItems.push(newItem);
            this.productService.addCheckoutItem(newItem);
            this.productService.updateTotal(bulkprice);
            this.total = this.total + bulkprice;
          } 
          this.sidenav.open();
        }
        //Individual is chosen
        else{
          const existingItemIndex = this.checkoutItems.findIndex(item => item.id === itemID);
          if (existingItemIndex !== -1) {
            // Item with the same ID already exists, update its price
            if(this.checkoutItems[existingItemIndex].boughtInBulk == false){
              this.checkoutItems[existingItemIndex].price *= 2;
              this.checkoutItems[existingItemIndex].count++;
            }
            else{
              console.log("pushed here 2");
              const newItem = new CheckoutItem(itemtext, itemID, itemprice, false);
              // this.checkoutItems.push(newItem);
              this.productService.addCheckoutItem(newItem);
              this.productService.updateTotal(itemprice);
              this.total = this.total + itemprice;
            } 
          } 
          else{
            console.log("pushed here 1");
            const newItem = new CheckoutItem(itemtext, itemID, itemprice, false);
            // this.checkoutItems.push(newItem);
            this.productService.addCheckoutItem(newItem);
            this.productService.updateTotal(itemprice);
            this.total = this.total + itemprice;
          }
          
          this.sidenav.open();
        }
      })
    }
    else{
      const existingItemIndex = this.checkoutItems.findIndex(item => item.id === itemID);
          if (existingItemIndex !== -1) {
            // Item with the same ID already exists, update its price
            console.log('exists');
            this.checkoutItems[existingItemIndex].price *= 2;
            this.checkoutItems[existingItemIndex].count++;
          } 
          else{
            const newItem = new CheckoutItem(itemtext, itemID, bulkprice, true);
            // this.checkoutItems.push(newItem);
            this.productService.addCheckoutItem(newItem);
            this.productService.updateTotal(bulkprice);
            this.total = this.total + bulkprice;
            this.sidenav.open();
          }
    }
    console.log(this.checkoutItems);
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
      title: "Do you want to submit this order?",
      text: 'Total is: ' + this.total + '¢',
      allowOutsideClick: false,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Go back to checkout`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Would you like a receipt?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`
        }).then(async (result) => {
          if (result.isConfirmed || result.isDenied) {
            if (result.isConfirmed) {
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
              email: userEmail,
              customerId: "cus_OwkAvKmcmctUfZ",
              readerId: "tmr_FUNvywWDqIlIJo"
            };

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
                console.log('Payment successful:', response);
                Swal.fire('Payment successful!', '', 'success');
                this.checkoutItems = [];
                this.total = 0;
                this.productService.clearCheckoutItems();
                this.productService.updateTotal(this.productService.getTotal() * -1);
                this.sidenav.close();
              },
              (error) => {
                console.error('Error making payment:', error);
                Swal.fire('Error making payment', '', 'error');
              }
            );
          }
        });
      } else {
        console.log('User canceled the action.');
      }
    });
  }

}
