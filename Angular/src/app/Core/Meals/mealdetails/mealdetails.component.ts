
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Imeal } from 'src/Interfaces/imeal';
import { MealService } from 'src/Services/meal.service';


@Component({
  selector: 'app-mealdetails',
  templateUrl: './mealdetails.component.html',
  styleUrls: ['./mealdetails.component.css']
})
export class MealdetailsComponent implements OnInit {
  MealId = 0 ;
Meal:Imeal|undefined;
constructor(private activeted:ActivatedRoute, private extraService:MealService){}
  ngOnInit(): void {
    this.MealId = this.activeted.snapshot.params['id'];
    this.extraService.getById(this.MealId).subscribe((data) => {this.Meal =  data})
  }
}
