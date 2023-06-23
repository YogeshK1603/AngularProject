import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "https://64251c249e0a30d92b294836.mockapi.io/api/V1/";



  constructor(private http:HttpClient) { }

  get(path:any){
  return this.http.get(this.baseurl + path);
}

  post(path:any, data:any){
  return this.http.post(this.baseurl+ path,data);
}
  put(path:any,data:any){
  return this.http.put(this.baseurl+ path,data);
}

  delete(path:any){
  return this.http.delete(this.baseurl+ path);
}

}
