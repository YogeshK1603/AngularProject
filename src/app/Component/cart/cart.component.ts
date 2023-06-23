import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  quantity:any=1;
  products:any;
  total = 0 ;
  route: any;
  constructor(private api:ApiService){}

    ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem("Products") || '[]');
    this.calculateTotal();
    }

    calculateTotal(){
      this.total = 0;
      this.products.map((product:any)=>{
        this.total += product.quantity * product.Price;
      });
    }


    canceleCart(product:any){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

        }
      })
       this.products = this.products.filter((result:any)=>{
        if(product.id != result.id){
          return result;

        }
      })
      localStorage.setItem("Products",JSON.stringify(this.products))
  }


}
