import { Component } from '@angular/core';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent {
  search : String ="";
  opened = false;
  items = [
    { id: 1, text: 'Item 1', price: '$1', pic: "assets/img/logo1.png"},
    { id: 2, text: 'Item 2', price: '$2', pic: "assets/img/localStorage.png"},
    { id: 3, text: 'Item 3', price: '$3', pic: "assets/img/localStorage.png"},
    { id: 1, text: 'Item 1', price: '$1', pic: "assets/img/logo1.png"},
    { id: 2, text: 'Item 2', price: '$2', pic: "assets/img/localStorage.png"},
    { id: 3, text: 'Item 3', price: '$3', pic: "assets/img/localStorage.png"},
    { id: 1, text: 'Item 1', price: '$1', pic: "assets/img/logo1.png"},
    { id: 2, text: 'Item 2', price: '$2', pic: "assets/img/localStorage.png"},
    { id: 3, text: 'Item 3', price: '$3', pic: "assets/img/localStorage.png"},
    { id: 1, text: 'Item 1', price: '$1', pic: "assets/img/logo1.png"},
    { id: 2, text: 'Item 2', price: '$2', pic: "assets/img/localStorage.png"},
    { id: 3, text: 'Item 3', price: '$3', pic: "assets/img/localStorage.png"},
    { id: 1, text: 'Item 1', price: '$1', pic: "assets/img/logo1.png"},
    { id: 2, text: 'Item 2', price: '$2', pic: "assets/img/localStorage.png"},
    { id: 3, text: 'Item 3', price: '$3', pic: "assets/img/localStorage.png"},
    { id: 1, text: 'Item 1', price: '$1', pic: "assets/img/logo1.png"},
    { id: 2, text: 'Item 2', price: '$2', pic: "assets/img/localStorage.png"},
    { id: 3, text: 'Item 3', price: '$3', pic: "assets/img/localStorage.png"},
    
  ];
}
