import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Product } from './product.model';

interface favProduct {
  name: string;
  individualPrice: number;
  bulkPrice: number;
  picUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = 'http://localhost:8080'; // Replace with your API endpoint
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    // return this.http.get(url);
    const getProductURL = `${this.baseURL}/products`;
    return this.http.get<any[]>(getProductURL).pipe(
      catchError(error => {
        console.error('Error loading data:', error);
        return throwError(error);
      })
    );
  }

  deleteProduct(product: Product): Observable<any> {
    const deleteProductURL = `${this.baseURL}/products`;
    return this.http.delete(deleteProductURL, { body: product });
  }
  private favproducts: favProduct[] = [];
  addfavProduct(product: favProduct) {
    this.favproducts.push(product);
  }

  getFavProducts() {
    return this.favproducts;
  }

}




// only add to favorites if adding an image