import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Imeal } from 'src/Interfaces/imeal';
import { MealService } from 'src/Services/meal.service';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit{

  meals:Imeal[] =[]
// products:Observable<IProduct[]> =[];

  //1-inject api services
constructor(private mealervice:MealService ,private cookie:CookieService){}

   //connect with api using  api service
  ngOnInit(): void {
   //2-subscribe
   this.mealervice.getAll().subscribe({
    // three callback functions   
    next:(data)=>{this.meals = data},
    error:(err)=>console.log('Error:' +err),
    complete:()=>{}
   });
  
   

  }

  add(id:number){
    this.mealervice.AddToCart(id);
  }
 
}