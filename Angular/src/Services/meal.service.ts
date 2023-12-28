import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Imeal } from 'src/Interfaces/imeal';

@Injectable({
  providedIn: 'root'
})
export class MealService {

 //1- get url for api
  //we will create service for each endpoint in api like(products & users& category)
  //here we will create service for products endpoint in api , so we will get url for products api

  baseUrl:string ="https://localhost:44300/api/Meals";
  headers={
    headers:new HttpHeaders({
      'Content-Tyep':'application/json'
    }),
    withCredentials:true,
  };
  //1-inject httpClient in constructor
  constructor(private http:HttpClient,private cookie:CookieService) {
    //http => return observable
  }

  //2-subscribe=> next() & error() & complete()
  //create normal services or functions
  getAll():Observable<Imeal[]>{
    //get => return observable
    //get => get array of products from this url (api)
    return this.http.get<Imeal[]>(`${this.baseUrl}/getAll`);
  }
  getById(id:number):Observable<Imeal>{
    //next() = returned data from get()
    return this.http.get<Imeal>(`${this.baseUrl}/getById/${id}`);
  }
  getMeal(id:number):Observable<Imeal>{

    return this.http.get<Imeal>(this.baseUrl +'/getById/' + id).pipe();
  }
  add(prod:Imeal):Observable<object>{
    //if post return data like error message , we will receive this data in next() function
     return this.http.post(`${this.baseUrl}/create`,prod);
  }
  // add3(formdata:FormData):Observable<object>{
  //   //if post return data like error message , we will receive this data in next() function
  //    return this.http.post(`${this.baseUrl}/create2`,formdata);//I removed ,{withCredentials:true}
  // }
  edit(id:number,prod:Imeal):Observable<object>  {
   return this.http.put(`${this.baseUrl}/${id}`,prod);
  }
  delete(id:number):Observable<object>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }

  // UploadImage(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('photo', file);

  //   return this.http.post<any>(`${this.baseUrl}/create`, formData);
  // }
  // add2(prod: Imeal, photo: File): Observable<object> {
  //   const formData = new FormData();
  //   // إضافة البيانات العادية من الوجبة إلى الـ FormData
  //   formData.append('Id','1');
  //   formData.append('name', prod.name);
  //   formData.append('details', prod.details);
  //   formData.append('price', prod.price.toString());
  //   formData.append('discount', prod.discount.toString());
  //   formData.append('categoryId', prod.categoryId.toString());

  //   // إضافة الملف (الصورة) إلى الـ FormData
  //   if (photo) {
  //     formData.append('photo', photo);
  //   }

  //   // إرسال طلب POST إلى الـ API
  //   return this.http.post(`${this.baseUrl}/create2`, formData);
  // }

    AddToCart(Id: number) {
    if(this.cookie.get('cartItems')){
      console.log("if");

          // Retrieve the existing cart items from cookies
          let cartItems: { mealId: number; quantity: number }[] = JSON.parse(this.cookie.get('cartItems')) || [];

          // Check if the meal is already in the cart
          const existingItem = cartItems.find((item) => item.mealId === Id);

          if (existingItem) {
            // If the meal is already in the cart, increase its quantity
            existingItem.quantity++;
          } else {
            // If the meal is not in the cart, add it as a new item
            cartItems.push({ mealId: Id, quantity: 1 });
          }

          // Save the updated cart items back to cookies
          this.cookie.set('cartItems', JSON.stringify(cartItems));

          console.log('Item added to cart:');
          console.log(cartItems);
       }
    else{
      console.log("else");
      let cartItems: { mealId: number; quantity: number }[]=[];
      cartItems.push({ mealId: Id, quantity: 1 });
      this.cookie.set('cartItems', JSON.stringify(cartItems));
      console.log(cartItems);
    }

  }
}
