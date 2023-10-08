import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const url = `${this.baseUrl}/products`;
    // return this.http.get(url);
    return this.http.get<any[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Error loading data:', error);
        return throwError(error);
      })
    );
  }
}
