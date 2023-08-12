import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable, map } from 'rxjs';
import { LoginRequestPayload } from '../login/login.request.payload';
import { LoginResponsePayload } from '../login/login.response.payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hostPort : String
  
  constructor(private httpClient : HttpClient, 
    private localStorageService:LocalStorageService) {
    
     
    this.hostPort = "http://localhost:8600";
   }
 

  signupHandleHTTP(signupRequestPayload: SignupRequestPayload) : Observable<any> {
    console.log("signupHandleHTTP");
    var url = this.hostPort+ "/api/auth/signup";
    return this.httpClient.post(url, signupRequestPayload,{responseType: 'text'});
  }

  loginHandleHTTP(loginRequestPayload :LoginRequestPayload): Observable<true>{
    console.log("loginHandleHTTP");
    var url = this.hostPort+ "/api/auth/login";
    
    return this.httpClient.post<LoginResponsePayload>(url, loginRequestPayload)
    .pipe( map(data => {
  
        this.localStorageService.store("accessToken",data.accessToken);
        this.localStorageService.store("refreshToken",data.refreshToken);
        this.localStorageService.store("accessTokenExpiresAt",data.accessTokenExpiresAt);
        this.localStorageService.store("refreshTokenExpiresAt",data.refreshTokenExpiresAt);
        this.localStorageService.store("username",data.username);
       
        return true;
    }))  
  
     }

}
