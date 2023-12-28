import { Component, OnInit } from '@angular/core';
import { Ioffer } from 'src/Interfaces/ioffer';
import { MealService } from 'src/Services/meal.service';
import { OffersService } from 'src/Services/offers.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offers: Ioffer[] = [];
  constructor(private offerService: OffersService,private offerservice:OffersService) {}

  ngOnInit(): void {

     this.offerService.getAll().subscribe({
      next: (data) => {
        var i=0;
        data.forEach((data)=>{
            this.offers[i]=data;
            this.offers[i].startdate=data.startdate.substring(0, 10)
            this.offers[i].enddate=data.enddate.substring(0, 10)

            i++;
        })

      },
      error: (err) => {
        console.log('Error:' + err);
      },

      complete: () => {},
    });
  }
  add(id:number){
    this.offerservice.AddToCart(id);
        }
}
