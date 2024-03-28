import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin !: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService,private router :Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    })
  }
  handeleLogin() {
    let username = this.formLogin.value.username; //usernaame du formulaire
    let password = this.formLogin.value.password; // pass word de formulaire
    this.auth.Login(username, password).subscribe({
      next: data => {
    this.auth.loadProfile(data);
     this.router.navigateByUrl("/admin");
      }, error: err => {
        console.log(err)
      }
    });
  }

}
