import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InteropObservable } from 'rxjs';
import { Ioffer } from 'src/Interfaces/ioffer';
import { OffersService } from 'src/Services/offers.service';


@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit{
 
 offerID:number = 0;
 offer:Ioffer|undefined;
 
 constructor(private activeroute: ActivatedRoute, private offerservice: OffersService){}
  ngOnInit(): void {
    console.log("data");
    this.offerID= this.activeroute.snapshot.params['id'];
    this.offerservice.getById(this.offerID).subscribe((data)=>{
console.log(data);

      this.offer = data });
  }

}