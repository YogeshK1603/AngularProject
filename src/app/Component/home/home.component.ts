import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  result:any
  category:any
  constructor(private api:ApiService,private route:ActivatedRoute){
    this.category=this.route.snapshot.paramMap.get("category");
  }
  ngOnInit(): void {
   this.api.get("Products").subscribe((result:any)=>{
    this.result=result;

   });
  }

}
