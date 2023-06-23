import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  prodata:any;
  id:any;
  isactive:boolean=false;
  constructor(private api:ApiService, private router:Router, private route:ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get("id");
  }
  ngOnInit(): void {
    this.prodata = new FormGroup({
      name : new FormControl("",Validators.compose([Validators.required])),
      Description : new FormControl("", Validators.compose([Validators.required])),
      MRP : new FormControl("", Validators.compose([Validators.required])),
      Price : new FormControl("", Validators.compose([Validators.required])),
      Image : new FormControl("", Validators.compose([Validators.required])),
      Isactive : new FormControl(false, Validators.compose([Validators.required])),
      category : new FormControl("", Validators.compose([Validators.required]))


    })
    if(this.id !=null){
      this.api.get("/Products/" + this.id).subscribe((result:any)=>{
        this.prodata.patchValue({
          name:result.name,
          Description:result.Description,
          MRP:result.MRP,
          Price:result.Price,
          Image:result.Image,
          Isactive:result.Isactive,
          category:result.category
        })

      })
    }
    }
    click(data:any){
      if(this.id==null){

     this.api.post("Products",data).subscribe((result:any)=>{
        // console.log(result);
        this.router.navigate(["/products"])

      })
    }
    else{
      this.api.put("Products/"+this.id,data).subscribe((result:any)=>{
        // console.log(result);
        this.router.navigate(["/products"]);

      })
    }


    }
}
