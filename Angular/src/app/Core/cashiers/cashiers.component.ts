import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/Interfaces/iuser';
import { CashierService } from 'src/Services/cashier.service';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-cashiers',
  templateUrl: './cashiers.component.html',
  styleUrls: ['./cashiers.component.css']
})
export class CashiersComponent implements OnInit {
  cashiers:Iuser [] = [];
  constructor(private cashierservice: CashierService,private user:UsersService){}
  ngOnInit(): void {
    this.user.getall().subscribe({
      next:(data)=>{
        
        data.forEach((data1)=>
        {
          if(data1.role=="cashier")
        this.cashiers.push(data1)
       
        }
       )
      },
      error:(err) =>{console.log('Error:' + err)},
       
      complete: ()=>{},
      
     });
  }


  delete(id:number){

    this.cashierservice.delete(id).subscribe();
    this.cashiers.filter(c=>c.id != id)
   
   
   }


}
