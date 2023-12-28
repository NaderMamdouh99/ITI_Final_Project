import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iextra } from 'src/Interfaces/iextra';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {

  baseURL:string = 'https://localhost:44300/api/Extra';
  constructor( private http:HttpClient)
  { }

  getall():Observable<Iextra[]>{
    return this.http.get<Iextra[]>(`${this.baseURL}`)
  }

  getbyid(id:number):Observable<Iextra>{
    return this.http.get<Iextra>(`${this.baseURL}/${id}`)
  }


  add(extra:Iextra){
    return this.http.post(this.baseURL, extra)
  }

  edit(id:number,extra:Iextra){
    return this.http.put(`${this.baseURL}/${id}`,extra)
  }

  delete(Id:number){
    return this.http.delete(`${this.baseURL}/${Id}`)
  }
}
