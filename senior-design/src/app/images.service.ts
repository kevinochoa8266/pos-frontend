import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

//Used for favorites with images
//Not implemented
export class ImagesService {
  private baseURL = 'http://localhost:8080'; // Replace with your API endpoint
  constructor(private http: HttpClient) { }

  getImage(): Observable<any> {
    const getImageURL = `${this.baseURL}/images`;
    return this.http.get<any[]>(getImageURL).pipe(
      catchError(error => {
        console.error('Error loading data:', error);
        return throwError(error);
      })
    );
  }

  postImage(imageFile: File): Observable<any> {
    const postImageURL = `${this.baseURL}/images/2`;
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    // Make the POST request with form data
    return this.http.post(postImageURL, formData);
  }
  
}


  

  

