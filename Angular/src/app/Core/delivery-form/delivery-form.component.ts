import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/Interfaces/iuser';
import { DeliveryBoyService } from 'src/Services/delivery-boy.service';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent {
  deliveryForm: FormGroup = new FormGroup({
    id:new FormControl(0),
    name:new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email : new FormControl('', Validators.required),
    mobile :new FormControl(0, [Validators.required, Validators.minLength(11)]),
    passward :new FormControl('', [Validators.required]),
    role :new FormControl('delivery'),

  });
  deliveryemail: string = "";
 
  
  constructor(private activatedroute: ActivatedRoute,private user:UsersService, private deliveryservice: DeliveryBoyService, private router: Router ){}
 
 
 
  ngOnInit(): void {
    this.deliveryemail = this.activatedroute.snapshot.params['id']
    if(this.activatedroute.snapshot.params['email'])
    {
      this.deliveryemail = this.activatedroute.snapshot.params['email']

      this.user.getbyemail(this.deliveryemail).subscribe((data)=>{
        this.deliveryForm.controls['name'].setValue(data.userName);
        this.deliveryForm.controls['address'].setValue(data.address);
        this.deliveryForm.controls['email'].setValue(data.email);
        this.deliveryForm.controls['mobile'].setValue(data.mobile);
        this.deliveryForm.controls['passward'].setValue(data.password);
      

      

      });
    }
  }
  get emailcontrol(){
    return  this.deliveryForm.get('email');
  }
  get namecontrol(){
    return  this.deliveryForm.get('name');
  }
  get addresscontrol(){
    return  this.deliveryForm.get('address');
  }
  get mobilecontrol(){
    return  this.deliveryForm.get('mobile');
  }
  get passwardcontrol(){
    return  this.deliveryForm.get('passward');
  }


  usin:Iuser={
    address:this.addresscontrol?.value,
    email:this.emailcontrol?.value,
    id:0,
    mobile:this.mobilecontrol?.value,
    password:this.passwardcontrol?.value,
    role:"delivery",
    userName:this.namecontrol?.value
  }

  GetData(e: Event) {
    e.preventDefault();


   this.deliveryForm.controls['role'].setValue('delivery')
    if (this.deliveryForm.valid) {



      if (this.deliveryemail != undefined&&this.deliveryemail!='') {
        // Edit existing item

       
        this.user.edit(this.deliveryemail, this.deliveryForm.value).subscribe();
        console.log("Hello1");
      }
       
     else {
        // Add new item
        this.usin={
          address:this.addresscontrol?.value,
          email:this.emailcontrol?.value,
          id:0,
          mobile:this.mobilecontrol?.value,
          password:this.passwardcontrol?.value,
          role:"delivery",
          userName:this.namecontrol?.value
        }
        this.user.add(this.usin).subscribe(
          {
            next:(data)=>{console.log(data);
            },
            error:(e)=>{console.log(e);
            },
            complete:()=>{ this.router.navigate(['/deliverys'])}
          }
        );
         
        }
      
      }
    }
}
