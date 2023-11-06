import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    navbarfixed:boolean = false;

    //If user scrolls, header will still appear in top position due to HostListener
    @HostListener('window:scroll', ['$event']) onscroll(){
      if(window.scrollY > 100){
        this.navbarfixed = true;
      }
      else{
        this.navbarfixed = false;
      }
    }
}
