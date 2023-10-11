import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {
  products: any[] = []; // Define an array to store the retrieved products

  constructor(private productService: ProductService) { }
  
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
}
