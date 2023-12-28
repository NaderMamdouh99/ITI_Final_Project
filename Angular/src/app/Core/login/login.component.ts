import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-a',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginform:FormGroup=new FormGroup({
  email:new FormControl('',[Validators.pattern('^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$'),Validators.required]),
  password: new FormControl('',[Validators.required,Validators.minLength(3)]),
  role:new FormControl(''),
  username:new FormControl('')
  });

  constructor(private userserv:UsersService){}


  get emailcontrol(){
    return this.loginform.controls['email'];
  }
  get passwordcontrol(){
    return this.loginform.controls['password'];
  }
  
  
  log(x:Event){
   
  if(this.loginform.valid){
    this.userserv.login(this.loginform.value)
    }

}
}
