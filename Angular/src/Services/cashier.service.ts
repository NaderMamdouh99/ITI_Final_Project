import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icashier } from 'src/Interfaces/icashier';

@Injectable({
  providedIn: 'root'
})
export class CashierService {


baseURL:string = 'https://localhost:44300/api/cashiers';


  constructor(private http: HttpClient) {}

getAll():Observable<Icashier[]>{
  return this.http.get<Icashier[]>(this.baseURL)

}

getById(id:number):Observable<Icashier>{
  return this.http.get<Icashier>(`${this.baseURL}/${id}`)

}

add( cashier:Icashier){

  console.log(cashier);

  return this.http.post(this.baseURL, cashier)

}
edit(id:number, cashier:Icashier){
return this.http.put(`${this.baseURL}/${id}`, cashier)

}
delete(id:number){
  return this.http.delete(`${this.baseURL}/${id}`)


}
}
