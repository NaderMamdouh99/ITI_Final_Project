import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ioffer } from 'src/Interfaces/ioffer';
import { OffersService } from 'src/Services/offers.service';

@Component({
  selector: 'app-offer-admin',
  templateUrl: './offer-admin.component.html',
  styleUrls: ['./offer-admin.component.css']
})
export class OfferAdminComponent implements OnInit {
  offers:Ioffer [] = [];
  constructor(private offerService: OffersService, private activerouter: ActivatedRoute, private router:Router){}

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
     error:(err) =>{console.log('Error:' + err)},
     complete: ()=>{},
    });
   }
   delete(id: number) {
    var result = confirm('Do You Need Delete This Product');
    if (result) {
      this.offerService.delete(id).subscribe(
        {
        complete:()=>{ this.offerService.getAll().subscribe({ next: (data) => {this.offers = data}}) }
        });
    }
  }


}
