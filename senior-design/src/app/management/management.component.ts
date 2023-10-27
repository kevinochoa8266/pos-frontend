import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {
  products: any[] = []; // Define an array to store the retrieved products
  images: any[] = [];

  constructor(private productService: ProductService, private imageService: ImagesService) { }
  
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


  addtoFavProduct(name: string, indivPrice: number, bulkPrice: number) {
    this.imageService.getImage().subscribe(
        (data) => {
          this.images = data;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    const newFav = {
      name: name,
      individualPrice: indivPrice,
      bulkPrice: bulkPrice,
      picUrl: 'assets/img/circlelogo.png'
    };

    this.productService.addfavProduct(newFav);
  }
  
  //POST Image
  // uploadImage(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.imageService.postImage(file).subscribe(
  //       response => {
  //         console.log('Image uploaded successfully!', response);
  //       },
  //       error => {
  //         console.error('Error uploading image:', error);
  //       }
  //     );
  //   }
  // }


}
