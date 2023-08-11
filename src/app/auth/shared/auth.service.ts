import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }


  signupHandleHTTP(signupRequestPayload: SignupRequestPayload) : Observable<any> {
    console.log("signupHandleHTTP");
    var url = "http://localhost:8600/api/auth/signup";
    return this.httpClient.post(url, signupRequestPayload,{responseType: 'text'});
  }

}
