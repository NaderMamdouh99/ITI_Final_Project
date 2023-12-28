import { Component } from '@angular/core';
import { IdeliveryBoy } from 'src/Interfaces/idelivery-boy';
import { Iuser } from 'src/Interfaces/iuser';
import { DeliveryBoyService } from 'src/Services/delivery-boy.service';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-delivery-boy',
  templateUrl: './delivery-boy.component.html',
  styleUrls: ['./delivery-boy.component.css']
})
export class DeliveryBoyComponent {

  deliveryBoys:Iuser [] = [];
  constructor(private deliveryBoyservice: DeliveryBoyService,private user:UsersService){}
 
   ngOnInit(): void {
    this.user.getall().subscribe({
     next:(data)=>{
      data.forEach((data1)=>
      {
        if(data1.role=="delivery")
      this.deliveryBoys.push(data1)
     
      }
      )
     },
     error:(err) =>{console.log('Error:' + err)},
      
     complete: ()=>{},
    
 
    });


}


delete(id:number){


 this.deliveryBoyservice.delete(id).subscribe();
 this.deliveryBoys.filter(b=>b.id != id)


}

}
