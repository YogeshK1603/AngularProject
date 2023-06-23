import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formdata: any;
  constructor( private api:ApiService , private router:Router){}
  ngOnInit(): void {
    this.formdata=new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required])),
      password:new FormControl("",Validators.compose([Validators.required]))
    })

  }

  login(data:any)
  {
    if(data.name=="admin" && data.password =="admin")
    {
      // alert ("login sucessfully")
    localStorage.setItem("usertype","admin");
    this.router.navigate(["/admin"]);
    }
    else{
      alert("Error 404")
    }

}
}
