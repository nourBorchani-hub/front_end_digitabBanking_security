import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken !: any; // stoker le token

  constructor(private http: HttpClient,private router:Router) { }

  public Login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }
    let params = new HttpParams()
      .set("username", username)
      .set("password", password);
    return this.http.post("http://localhost:8085/auth/login", params, options);

  }
 public loadProfile(data: any) {
  this.isAuthenticated = true;
  this.accessToken = data['accessToken'];

  console.log('AccessToken :', this.accessToken);


          let decodedJWT: any = jwtDecode(this.accessToken);
          this.username = decodedJWT.sub;
          this.roles = decodedJWT.scop;
  
  window.localStorage.setItem("jwt-token",this.accessToken);
} 
 public logout() {
  this.isAuthenticated =false;
  this.accessToken=undefined ;
  this.username =undefined ;
  this.roles = undefined;
  window.localStorage.removeItem("accessToken");
  this.router.navigateByUrl("/login");
 }
public loadjwtFormLocalStorage(){
  let token =window.localStorage.getItem("jwt-token ");
  if(token){
    this.loadProfile({"access-Token" :token});
    this.router.navigateByUrl("/admin/customers");
  }
}

}
