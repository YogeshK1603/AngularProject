import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private api:ApiService,private route:ActivatedRoute){
    this.category=this.route.snapshot.paramMap.get("category");
  }
       result: any;
        category: any;



    ngOnInit(): void {
this.load();


  }
  load() {
    this.api.get("Products").subscribe((result:any)=>{
      this.result=result;

      if(this.category !=null){
        this.result= this.result.filter((Products:any)=>{
          if(Products.category == this.category)
          return Products;

        })
      }
    })


      }




}
