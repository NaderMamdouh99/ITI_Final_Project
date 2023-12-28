import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Ioffer } from 'src/Interfaces/ioffer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  baseURL:string =  'https://localhost:44300/api/Offers';



  constructor(private http: HttpClient,private cookie:CookieService) {}

getAll():Observable<Ioffer[]>{
  return this.http.get<Ioffer[]>(this.baseURL)

}

getById(id:number):Observable<Ioffer>{
  return this.http.get<Ioffer>(`${this.baseURL}/${id}`)

}

add( offer:Ioffer){
  return this.http.post(this.baseURL, offer)

}
edit(id:number, offer:Ioffer){
return this.http.put(`${this.baseURL}/${id}`, offer)

}
delete(id:number){
  return this.http.delete(`${this.baseURL}/${id}`)


}

AddToCart(Id: number) {
  if(this.cookie.get('offerItems')){
    console.log("if");

        // Retrieve the existing cart items from cookies
        let cartItems: { offerId: number; quantity: number}[] = JSON.parse(this.cookie.get('offerItems')) || [];

        // Check if the offer is already in the cart
        const existingItem = cartItems.find((item) => item.offerId === Id);

        if (existingItem) {
          // If the meal is already in the cart, increase its quantity
          existingItem.quantity++;
        } else {
          // If the meal is not in the cart, add it as a new item
          cartItems.push({ offerId: Id, quantity: 1 });
        }

        // Save the updated cart items back to cookies
        this.cookie.set('offerItems', JSON.stringify(cartItems));

     }
  else{

    let cartItems: { offerId: number; quantity: number }[]=[];
    cartItems.push({ offerId: Id, quantity: 1 });
    this.cookie.set('offerItems', JSON.stringify(cartItems));

  }

}



}
