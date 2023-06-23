import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    constructor(private api:ApiService){

    }
    result:any;
    ngOnInit(): void {
  this.load()

    }

  load(){
    this.api.get("Products").subscribe((replay:any)=>{
      this.result = replay;
      console.log(replay);


    })
  }

  delete(id:any){
    if(confirm("sure to delete")){
      this.api.delete("Products/"+ id).subscribe((replay:any)=>{
        alert("recored deleted")
        this.load();
      })
    }

  }

  }














