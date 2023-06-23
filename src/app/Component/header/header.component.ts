import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cart=0;

  constructor(private api:ApiService){}


  ngOnInit(): void {

    if(localStorage.getItem("Products")|| "[]"){
      let addcart = JSON.parse(localStorage.getItem("Products")|| "[] ")
      this.cart = addcart.length;
    }


  }

}
