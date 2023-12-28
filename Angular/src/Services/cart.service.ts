import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icart } from 'src/Interfaces/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:number[][] = [ ];
  baseUrl:string ="https://localhost:44300/api/Orders";
  headers={
    headers:new HttpHeaders({
      'Content-Tyep':'application/json'
    }),
    withCredentials:true,
  };
  //1-inject httpClient in constructor
  constructor(private http:HttpClient) {
    //http => return observable
  }

  //2-subscribe=> next() & error() & complete()
  //create normal services or functions
  getAll():Observable<Icart[]>{
    //get => return observable
    //get => get array of products from this url (api)
    return this.http.get<Icart[]>(`${this.baseUrl}/getAll`);
  }
  getById(id:number):Observable<Icart>{
    //next() = returned data from get()
    return this.http.get<Icart>(`${this.baseUrl}/getById/${id}`);
  }

  add(prod:Icart):Observable<object>{
    //if post return data like error message , we will receive this data in next() function
     return this.http.post(`${this.baseUrl}/create`,prod);
  }

  edit(id:number,prod:Icart):Observable<object>  {
   return this.http.put(`${this.baseUrl}/${id}`,prod);
  }
  delete(id:number):Observable<object>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }

  createOrder(cart:Icart){

    return this.http.post(`${this.baseUrl}`,cart);

  }

}
