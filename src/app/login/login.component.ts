import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { ServicesService } from '../services/shared-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, private sharedService: ServicesService, private titleService: Title) {
    this.titleService.setTitle("login");
  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm(){
    this.loginForm = new FormGroup({
      userName: new FormControl(),
      userPassword: new FormControl()
    });
  }


  onSubmit() {
    console.log("on submit");
    let body: any =
    {
      UserName: this.loginForm.value.userName,
      Password: this.loginForm.value.userPassword
    };

    this.sharedService.login(body).subscribe((res: any) => {
      Object.keys(res).map(r => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('isLoggedin', 'true');
      });
      this.router.navigate(['/home']);
    },
      error => {
        console.log("error ",error);
      });
     
  }
}
