import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload!: SignupRequestPayload;
  signupForm!: FormGroup;

  constructor(private authShareService :AuthService) {

    this.signupRequestPayload = {
      username:  '',
      password: '',
      email: ''
    }

   }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signupHandle() {

    console.log("signupHandle");
    this.signupRequestPayload.username  = this.signupForm.get('username')?.value ;
    this.signupRequestPayload.password  = this.signupForm.get('password')?.value ;
    this.signupRequestPayload.email  = this.signupForm.get('email')?.value;

    this.authShareService.signupHandleHTTP(this.signupRequestPayload)
    .subscribe(data => {console.log(data)});
  }

}
