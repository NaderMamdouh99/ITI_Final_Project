import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Iuser } from 'src/Interfaces/iuser';
import { UsersService } from 'src/Services/users.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:Iuser [] = [];
  constructor(private customersService: UsersService){}

   ngOnInit(): void {
    this.customersService.getall().subscribe({
     next:(data)=>{

      this.customers =data.filter(user=>user.role=='user')},
     error:(err) =>{console.log('Error:' + err)},
     complete: ()=>{},


    });
  }

delete(id:string){
  this.customersService.delete(id).subscribe();
 this.customers= this.customers.filter((data)=>data.email!=id);

}


}
