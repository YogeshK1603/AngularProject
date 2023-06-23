import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

declare var Razorpay:any;


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
 products:any
  total = 0;
  userdata: any;
  Orders:any;
  id = 0;
  order: any;



   options = {
    "key": "rzp_live_Ay9af2dQeUH8A6", // Enter the Key ID generated from the Dashboard
    "amount": "200", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "I GAp Technologies", //your business name
    "description": "Order placed on Ecommerce Website",
    "image": "https://lms.igaptechnologies.com/assets/images/logo.png",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",

    "handler": function (response:any){
      console.log(response);
      var event = new CustomEvent('payement.success',{detail:response, bubbles:true, cancelable:true});
      window.dispatchEvent(event);

    // alert(response.razorpay_payment_id);
    // alert(response.razorpay_order_id);
    // alert(response.razorpay_signature)

  },
    "prefill": {
        "name": "", //your customer's name
        "email": "",
        "contact": ""
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
constructor(private api:ApiService){}
  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem("Products") || '[]');
    this.calculateTotal();

    this.userdata = new FormGroup({
      firstname: new FormControl("",Validators.compose([Validators.required])),
      lastname : new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl("", Validators.compose([Validators.required])),
      towncity : new FormControl("", Validators.compose([Validators.required])),
      State : new FormControl("", Validators.compose([Validators.required])),
      email : new FormControl("", Validators.compose([Validators.required, Validators.email])),
      zip : new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)])),
      Phone : new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)]))

    })

  }
  calculateTotal(){
    this.total = 0;
    this.products.map((product:any)=>{
      this.total += product.quantity * product.Price;
    });
  }
  placeorder(){
   this.order ={...this.userdata.value, products:this.products,total:this.total,status:"unpaid"}
    this.api.post("Orders",this.order).subscribe((result:any)=>{
      // console.log(result);
      this.id = result.id;
      console.log(this.id);
      this.options.amount ="200"; //  (this.total* 100).toString();
      this.options.prefill.name=this.order.name;
      this.options.prefill.email=this.order.email;
      this.options.prefill.contact=this.order.Phone;
      var razorpay =new Razorpay(this.options);
      razorpay.open();
      razorpay.on('payement.failed',(response : any)=>{
        alert("Payement ailed");
      });
    })
    }
    @HostListener('window:payemnt.success',['$event'])
    onPayementSucess(event:any):void{
      console.log("payement Recived");
      this.api.put("/orders/" + this.id, {...this.order, status:"paid"}).subscribe((result:any)=>{
        console.log ("Status Updated")
        console.log (result);
      })
    }



  }




