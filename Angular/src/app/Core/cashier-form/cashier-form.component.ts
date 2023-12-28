import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Icashier } from 'src/Interfaces/icashier';
import { Iuser } from 'src/Interfaces/iuser';
import { CashierService } from 'src/Services/cashier.service';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-cashier-form',
  templateUrl: './cashier-form.component.html',
  styleUrls: ['./cashier-form.component.css']
})
export class CashierFormComponent {
  cashierForm: FormGroup = new FormGroup({
    id:new FormControl(0),
    name:new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email : new FormControl('', Validators.required),
    mobile :new FormControl("", [Validators.required, Validators.minLength(11)]),
    passward :new FormControl('', [Validators.required]),
    role :new FormControl('cashier')

  });
  cashierId: string = '';
 
  
  constructor(private activatedroute: ActivatedRoute,private user:UsersService, private cashierervice: CashierService, private router:Router ){}
 
 
 
  ngOnInit(): void {
   
    if(this.activatedroute.snapshot.params['email'])
    {
      this.cashierId = this.activatedroute.snapshot.params['email']
      this.user.getbyemail(this.cashierId).subscribe((data)=>{
        this.cashierForm.controls['name'].setValue(data.userName);
        this.cashierForm.controls['address'].setValue(data.address);
        this.cashierForm.controls['email'].setValue(data.email);
        this.cashierForm.controls['mobile'].setValue(data.mobile);
        this.cashierForm.controls['passward'].setValue(data.password);
        this.cashierForm.controls['role'].setValue(data.role);

      });
    }
  }
  get emailcontrol(){
    return  this.cashierForm.get('email');
  }
  get namecontrol(){
    return  this.cashierForm.get('name');
  }
  get addresscontrol(){
    return  this.cashierForm.get('address');
  }
  get mobilecontrol(){
    return  this.cashierForm.get('mobile');
  }
  get passwardcontrol(){
    return  this.cashierForm.get('passward');
  }

usin:Iuser={
  address:this.addresscontrol?.value,
  email:this.emailcontrol?.value,
  id:0,
  mobile:this.mobilecontrol?.value,
  password:this.passwardcontrol?.value,
  role:"cashier",
  userName:this.namecontrol?.value
}



  GetData(e: Event) {
    e.preventDefault();
 

    
   
    if (this.cashierForm.valid) {
      if (this.cashierId.length > 0) {
        // Edit existing item
        
        this.user.edit(this.cashierId, this.usin).subscribe();
       
      }
       
     else {
        // Add new item
      
        
        this.usin={
          address:this.addresscontrol?.value,
          email:this.emailcontrol?.value,
          id:0,
          mobile:this.mobilecontrol?.value,
          password:this.passwardcontrol?.value,
          role:"cashier",
          userName:this.namecontrol?.value
        }
      
        this.user.add(this.usin).subscribe(
          {
            next:(data)=>{console.log(data);
            },
            error:(e)=>console.log(e),
            complete:()=>{  this.router.navigate(['/admin']);}
          }
        );
          
         console.log(this.cashierForm.value)        }
      
      }
    }
  }
