import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Icart } from 'src/Interfaces/icart';
import { Icashier } from 'src/Interfaces/icashier';
import { IdeliveryBoy } from 'src/Interfaces/idelivery-boy';
import { Iorder, Status, UpdateOrderStatusModel } from 'src/Interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseURL:string = 'https://localhost:44300/api/orders';



  constructor(private http: HttpClient,private cookie:CookieService) {}

    getAll():Observable<Iorder[]>{
      return this.http.get<Iorder[]>(this.baseURL+ "/GetAll")
    }

    edit(id:number,prod:Iorder):Observable<object>  {
      return this.http.put(`${this.baseURL}/update/${id}`,prod);
     }

     getById(id:number):Observable<Iorder>{
      return this.http.get<Iorder>(`${this.baseURL}/${id}`)

    }


    updateStatus(id: number, status: Status): Observable<Iorder> {
      const updateModel: UpdateOrderStatusModel = { status };
      const headers = { 'Content-Type': 'application/json' };
      console.log("from service"+ {updateModel});
      console.log("from service"+ {status});

      console.log(status);

      return this.http.put<Iorder>(`${this.baseURL}/UpdateOrderStatus/${id}`, status, { headers });
    }

    //delivery boy
    getAllDeliveryBoy():Observable<IdeliveryBoy[]>{
      return this.http.get<IdeliveryBoy[]>(this.baseURL+ "/GetAllDeliveryBoy")
    }


    updateDeleiveryBoy(orderId:number,deliveryId:number):Observable<Iorder>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.put<Iorder>(`${this.baseURL}/UpdateDeliveryBoy/${orderId}`, deliveryId, { headers });

    }

    //cashier
    getAllcashier():Observable<Icashier[]>{
      return this.http.get<Icashier[]>(this.baseURL+ "/GetAllCashier")
    }


    updateCashier(orderId:number,cashierId:number):Observable<Iorder>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.put<Iorder>(`${this.baseURL}/UpdateCashier/${orderId}`, cashierId, { headers });
    }

    getOderDetail(orderId:number):Observable<Icart[]>{
      return this.http.get<Icart[]>(this.baseURL+ "/GetOrderDetail/"+orderId);
    }

}
