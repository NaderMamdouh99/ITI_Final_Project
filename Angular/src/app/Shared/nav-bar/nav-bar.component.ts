import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private serv:UsersService,private rout:Router,private cookie:CookieService){}

  username():string{

    return this.serv.usernamed
    }

logout(){

  var LogOut = confirm('Are You Want Sign out ?')
  if(LogOut){
    this.serv.che=false;
    this.serv.usernamed="profile"
    this.cookie.delete("account");
    this.rout.navigate(['/']);
  }else{
    this.serv.che=true;
  }
}

checklog():boolean{
return this.serv.ispath
}


cashierrole():boolean{
  return this.serv.cashier
}
adminrole():boolean{
  return this.serv.admin
}



}
