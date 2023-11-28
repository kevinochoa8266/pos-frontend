import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Product } from './product.model';
import { CheckoutItem } from './product.model';
import Swal from 'sweetalert2';

interface favProduct {
  id: string;
  name: string;
  individualPrice: number;
  bulkPrice: number;
  picUrl: string;
}

@Injectable({
  providedIn: 'root'
})

//Class that gets, adds, deletes, and updates product list
export class ProductService {
  private baseURL = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  //Gets Current List of Products
  getProducts(): Observable<any> {
    const getProductURL = `${this.baseURL}/products`;
    return this.http.get<any[]>(getProductURL).pipe(
      catchError(error => {
        console.error('Error loading data:', error);
        return throwError(error);
      })
    );
  }

  //Adds Product to Product List
  addProduct(productData: any): Observable<any>{
    const postProductURL = `${this.baseURL}/products`;
    return this.http.post(postProductURL, productData).pipe(
      catchError(error => {
        // console.error('Error adding product:', error);
        return throwError(error);
      })
    );
  }

  //Deletes Product from Product List
  deleteProduct(product: Product): Observable<any> {
    const deleteProductURL = `${this.baseURL}/products`;
    console.log("From service: ", product);
    return this.http.delete(deleteProductURL, { body: product });
  }

  editProduct(productData: any): Observable<any> {
    const editProductURL = `${this.baseURL}/products`;
    console.log("From service: ", productData);
    return this.http.put(editProductURL, productData);
  }




  private favproducts: favProduct[] = []; //Array for Favorited Products
  //Adds Product to List of favorite products displayed on 'Shop Candy' Page
  addfavProduct(product: favProduct) {
    
    const existingItemIndex = this.favproducts.findIndex(item => item.name === product.name);
    if (existingItemIndex == -1) {
      this.favproducts.push(product);
      // Swal.fire()
      Swal.fire(`${product.name} added to favorites`);
      // Swal.close();
    }
    else{
      Swal.fire("Product is already a favorite");
      // Swal.close();
    }
  }
  // removeFavProduct(favproduct: favProduct): void {
  //   // Find the index of the product in the favProducts array
  //   const index = this.favproducts.findIndex(product => product.id === favproduct.id);
  //   if (index !== -1) {
  //     // Remove the product from the array using splice
  //     this.favproducts.splice(index, 1);
  //     // You might also want to update the backend or perform any necessary actions here
  //   }
  // }


  //Gets Favorite Products to display on 'Shop Candy' page
  getFavProducts() {
    return this.favproducts;
  }

  
  private checkoutItems: CheckoutItem[] = []; //Array for Checkout Items
  private checkoutTotal: number = 0;
  //Adds CheckoutItem to checkout side navigation bar
  addCheckoutItem(item: CheckoutItem) {
    this.checkoutItems.push(item);
  }

  editCheckoutItem(item: CheckoutItem){
    
  }

  clearCheckoutItems(){
    this.checkoutItems = [];
  }
  //Gets CheckoutItem List to display on checkout side navigation bar
  getCheckoutItems() {
    return this.checkoutItems;
  }

  updateTotal(total: number){
    this.checkoutTotal += total;
  }

  getTotal(){
    return this.checkoutTotal;
  }

}




// only add to favorites if adding an image