import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSerializer } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id:any
  show:any;
  result:any;

  quantity:any=1;


  constructor(private api:ApiService,private route:ActivatedRoute , private toster:ToastrService){
    this.id=this.route.snapshot.paramMap.get("id");
  }
  ngOnInit(): void {
    this.show = JSON.parse(localStorage.getItem("Products")|| "[]");
    if(this.id != null){

    this.api.get("/Products/" + this.id).subscribe((result:any)=>{
      this.result=result;


    })

    }



  }

  addcart(){

    let add = {
      name:this.result.name,
      id:this.result.id,
      Mrp:this.result.Mrp,
      Price:this.result.Price,
      quantity:this.quantity
    }
    let prdadd =false;

     for(let i=0;i<this.show.length;i++){
      if(this.show[i].id==add.id){

        prdadd= true;

      }
     }
     if(!prdadd){
      this.show.push(add);
      localStorage.setItem("Products",JSON.stringify(this.show));
      this.toster.success("product added" , "Success",{
        timeOut: 3000,
        positionClass:"toast-top-center",
        progressBar:true


      });
     }
     else{
      this.toster.error("product already added in cart","Error",{ timeOut: 3000,
        progressBar:true
})
     }

  }
  decriment(){
    if(this.quantity>1){
      this.quantity--;
    }
  }
  Increment(){
    this.quantity++;
  }






}
