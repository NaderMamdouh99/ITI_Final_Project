import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdeliveryBoy } from 'src/Interfaces/idelivery-boy';

@Injectable({
  providedIn: 'root'
})
export class DeliveryBoyService {

  baseURL:string =  'https://localhost:44300/api/delivery-boys';

  constructor(private http: HttpClient) {}

getAll():Observable<IdeliveryBoy[]>{
  return this.http.get<IdeliveryBoy[]>(this.baseURL)

}

getById(id:number):Observable<IdeliveryBoy>{
  return this.http.get<IdeliveryBoy>(`${this.baseURL}/${id}`)

}

add( deliveryBoy:IdeliveryBoy){

  console.log(deliveryBoy);

  return this.http.post(this.baseURL, deliveryBoy)

}
edit(id:number, deliveryBoy:IdeliveryBoy){
return this.http.put(`${this.baseURL}/${id}`, deliveryBoy)

}
delete(id:number){
  return this.http.delete(`${this.baseURL}/${id}`)


}
}
