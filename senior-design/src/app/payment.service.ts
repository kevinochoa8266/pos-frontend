import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Class to make payments
export class PaymentService {
  private paymentURL = 'http://localhost:8080/payments';

  constructor(private http: HttpClient) { }
  
  //Make Payment API Call
  makePayment(paymentData: any): Observable<any> {
    return this.http.post(this.paymentURL, paymentData);
  }
}
