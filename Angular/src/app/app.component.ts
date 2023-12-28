import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/Services/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Project';
  constructor(private serv:UsersService){}
  ngOnInit(): void {
    this.serv.reloadfun()
    
  }
 role:string="admin" 

}
