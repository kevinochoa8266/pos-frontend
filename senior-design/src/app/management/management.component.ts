import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ImagesService } from '../images.service';
import { Product } from '../product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {

  products: Product[] = []; // Define an array to store the retrieved products
  images: any[] = [];

  constructor(private productService: ProductService, private imageService: ImagesService) { }
  
  //When page is loaded, getProducts() gets list of products and displays
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

  //Users can favorite a product so that its image will appear on the 'Shop Candy' page
  // Function adds product details to an array of favorite products in the product service
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

  //Function calls addProduct API Call to add a product to the current list of products
  //Uses a SweetAlert popup to get necessary input from user
  async addProduct(){
    const { value: formValues } = await Swal.fire({
      title: 'Add Product',
      customClass: {
        title: 'title-class',
      },
      html:
        '<label for="id-input">ID</label>' +
        '<input id="id-input" class="swal2-input">' + 
        '<br>' +
        '<label for="name-input">Name</label>' +
        '<input id="name-input" class="swal2-input">' +
        '<br>' +
        '<label for="unitprice-input">Unit Price</label>' +
        '<input id="unitprice-input" class="swal2-input">' + 
        '<br>' +
        '<label for="bulkprice-input">Bulk Price</label>' +
        '<input id="bulkprice-input" class="swal2-input">' +
        '<br>' +
        '<label for="inventory-input">Inventory</label>' +
        '<input id="inventory-input" class="swal2-input">' +
        '<br>' +
        '<label for="num-input">Items in Packet</label>' +
        '<input id="num-input" class="swal2-input">' +
        '<br>' +
        '<label for="storeID-input">Store ID</label>' +
        '<input id="storeID-input" class="swal2-input">',

      focusConfirm: false,
      preConfirm: () => {
          const id = document.getElementById('id-input') as HTMLInputElement;
          const name = document.getElementById('name-input') as HTMLInputElement;
          const unitPrice = parseFloat((document.getElementById('unitprice-input') as HTMLInputElement).value);
          const bulkPrice = parseFloat((document.getElementById('bulkprice-input') as HTMLInputElement).value);
          const inventory = parseFloat((document.getElementById('inventory-input') as HTMLInputElement).value);
          const numinPacket = parseFloat((document.getElementById('num-input') as HTMLInputElement).value);
          const storeID = parseFloat((document.getElementById('storeID-input') as HTMLInputElement).value);

          if (!id.value || !name.value || !unitPrice || !bulkPrice || 
            !inventory || !numinPacket || !storeID) {
            Swal.showValidationMessage('All inputs are required');
          }
          const newProduct = new Product(id.value, name.value, unitPrice, bulkPrice, inventory, numinPacket, storeID);
          this.productService.addProduct(newProduct);
          return [id.value, name.value, unitPrice, bulkPrice, 
            inventory, numinPacket, storeID];   
      }
    })
  }

  //Function calls deleteProduct Api call to permanently delete a product from the list
  //Uses SweetAlert Popup
  deleteProduct(product: Product){
    Swal.fire({
      title: 'Are you sure you want to delete this product?',
      text: "The product will be permanently deleted",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        // this.productService.deleteProduct(product);
        Swal.fire(
          'Deleted!',
          product.name + ' has been deleted.',
          'success'
        )
      }
    })
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

//HAVE TO EDIT CHECKOUT TOAL INFO TO PERSIST
//ADD PRODUCT TO WORK?
//STOREID IS A INT ON ADD PRODUCT BUT NOT ON GET PRODUCT
//favorite button
//work on pennies, remove taxrs and subottal

