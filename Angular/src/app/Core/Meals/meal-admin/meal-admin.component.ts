import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Imeal } from 'src/Interfaces/imeal';
import { CartService } from 'src/Services/cart.service';
import { MealService } from 'src/Services/meal.service';

@Component({
  selector: 'app-meal-admin',
  templateUrl: './meal-admin.component.html',
  styleUrls: ['./meal-admin.component.css']
})
export class MealAdminComponent {


  meals:Imeal[] =[]
  // products:Observable<IProduct[]> =[];

    //1-inject api services
  constructor(private mealervice:MealService, private cartService:CartService ,private cookie:CookieService){}

     //connect with api using  api service
    ngOnInit(): void {

     //2-subscribe
     this.mealervice.getAll().subscribe({
      // three callback functions
      next:(data)=>this.meals = data,
      error:(err)=>console.log('Error:' +err),
      complete:()=>{   }
     });

    }

   delete(id:number){
    var result = confirm('Do You Need Delete This Product');
    if (result) {
      this.mealervice.delete(id).subscribe(
        {
        complete:()=>{ this.mealervice.getAll().subscribe({ next: (data) => {this.meals = data}}) }
        });
    }
    }
}
