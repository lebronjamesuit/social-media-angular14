import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login.request.payload';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequestPayload! : LoginRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(
    private authService : AuthService, 
    private toastr: ToastrService,
    private router :Router,
    private toastrService :ToastrService ,
    private activatedRoute: ActivatedRoute
     ) { 

    this.loginRequestPayload = {
      username: '',
      password: ''
    };

    this.isError = false;
    this.registerSuccessMessage = "";

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
    .subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login!';
      }
    });


  }

  loginHandle(): void {
   
    this.loginRequestPayload.username = this.loginForm.get('username')!.value,
    this.loginRequestPayload.password = this.loginForm.get('password')!.value
   
    this.authService.loginHandleHTTP(this.loginRequestPayload)
    .subscribe({
      next: (v) => {
        console.log(v);
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login Successful');
      },
      error: (e) => {
        this.isError = true;
        this.toastr.error('Login Failed. Please check your credentials and try again.');
      },
      complete: () => console.info('complete') 
  })


  }


}
