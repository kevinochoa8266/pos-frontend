import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentURL = 'http://localhost:8080/payments';

  constructor(private http: HttpClient) { }
  
  makePayment(paymentData: any): Observable<any> {

    return this.http.post(this.paymentURL, paymentData);
  }
}
