import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Icashier } from 'src/Interfaces/icashier';
import { Iuser } from 'src/Interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usercookie: Iuser = {
    id: 0,
    userName: 'j',
    email: '',
    password: 'k',
    role: 'l',
    mobile: 'l',
    address: 'l'
  };
  currentuser: Iuser | undefined;
  usernamed: string = "profile";
  baseUrl: string = "https://localhost:44300/api/Authentication";
  users: Iuser[] | undefined;
  che: boolean = false;
  userrole: string = '';
  constructor(private http: HttpClient, private rout: Router, private cookie: CookieService) { }

  login(use: Iuser) {
    var try1: { email: string, password: string } = { email: use.email, password: use.password }

    this.http.post(`${this.baseUrl}/login`, try1).subscribe({
      next: (data) => { this.currentuser = data as Iuser },

      complete: () => {

        if (this.currentuser) {

          this.cookie.set(`account`, JSON.stringify([this.currentuser?.role, this.currentuser?.email]));
          this.usernamed = this.currentuser.userName
          this.userrole = this.currentuser.role
          this.che = true;
          this.rout.navigate(['/'])
        }
        else {
          this.usernamed = "profile";
          this.che = false;
        }

      }
    });

    // this.http.get<Iuser[]>(this.baseUrl).subscribe((data) => { this.users = data; })

    // this.users?.filter((f) => {

    //   if (f.email == use.email && f.password == use.password) {
    //     this.currentuser = f;
    //     this.usernamed = f.username;
    //     this.userrole = f.role

    //   }

    // })



  }

  get user() {
    if (this.userrole == "user") {

      return this.che
    }
    else { return false }
  }
  get admin() {
    if (this.userrole == "admin") {

      return this.che
    }
    else { return false }
  }
  get delivary() {
    if (this.userrole == "delivary") {
      return this.che
    }
    else { return false }
  }
  get cashier() {
    if (this.userrole == "cashier") {

      return this.che
    }
    else { return false }
  }
  get ispath() {
    return this.che
  }

  logout() {
    this.cookie.delete('account')
    this.che = false
    this.rout.navigate(['/'])
  }


  getall(): Observable<Iuser[]> {
    return this.http.get<Iuser[]>(`${this.baseUrl}/GetAllUsers`);
  }

  getbyid(id: number): Observable<Iuser> {
    return this.http.get<Iuser>(`${this.baseUrl}/${id}`);
  }

  add(us: Iuser) {

    return this.http.post(this.baseUrl + "/register", us);
  }

  edit(email:string, use: Iuser) {
    return this.http.put(`${this.baseUrl}/${email}`, use);
  }

  delete(email: string) {
    return this.http.delete(`${this.baseUrl}/${email}`);
  }

  getbyemail(email: string):Observable<Iuser> {

    return this.http.get<Iuser>(`${this.baseUrl}/getuser/${email}`);
  }

  reloadfun() {
    var account;

    if (this.cookie.get('account')) {
      account = JSON.parse(this.cookie.get('account').valueOf());
      this.usercookie.email = account[1]
      this.getbyemail(this.usercookie.email).subscribe({
        next: (data) => {
          this.usercookie = data ; console.log(data);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {

          if (this.usercookie) {

            this.usernamed = this.usercookie.userName
            this.userrole = this.usercookie.role
            this.che = true;
          }
          else {
            this.usernamed = "profile";
            this.che = false;
          }
        }
      }
      );
    }
  }




}
