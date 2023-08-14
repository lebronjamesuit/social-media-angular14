import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable, map , of, tap} from 'rxjs';
import { LoginRequestPayload } from '../login/login.request.payload';
import { LoginResponsePayload } from '../login/login.response.payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hostPort: String;

  // Refreshed token is mandatory to ask for a new access token
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),  
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient,
    private localStorageService: LocalStorageService) {
    this.hostPort = "http://localhost:8600";
  }

  signupHandleHTTP(signupRequestPayload: SignupRequestPayload): Observable<any> {
    console.log("signupHandleHTTP");
    var url = this.hostPort + "/api/auth/signup";
    return this.httpClient.post(url, signupRequestPayload, { responseType: 'text' });
  }

  loginHandleHTTP(loginRequestPayload: LoginRequestPayload): Observable<any> {
    console.log("loginHandleHTTP");
    var url = this.hostPort + "/api/auth/login";

    return this.httpClient.post<LoginResponsePayload>(url, loginRequestPayload)
      .pipe(map(data => {

        this.localStorageService.store("accessToken", data.accessToken);
        this.localStorageService.store("refreshToken", data.refreshToken);
        this.localStorageService.store("accessTokenExpiresAt", data.accessTokenExpiresAt);
        this.localStorageService.store("refreshTokenExpiresAt", data.refreshTokenExpiresAt);
        this.localStorageService.store("username", data.username);

        return of();
      }))

  }

  getUserName() {
    return this.localStorageService.retrieve('username');
  }

  getAccessToken() : String{
    return this.localStorageService.retrieve("accessToken");
  }

  getRefreshToken(): String {
    return this.localStorageService.retrieve("refreshToken");
  }

  getAccessTokenExpiresAt(): String {
    return this.localStorageService.retrieve("accessTokenExpiresAt");
  }

  performRefreshToken() : Observable<any> {
    var url = this.hostPort + "/api/auth/refresh/newAccessToken";
   
    return  this.httpClient.post<LoginResponsePayload>(url, this.refreshTokenPayload)
    .pipe(tap( data => {
      console.log(" Old access token is expired at"+ this.localStorageService.retrieve("accessTokenExpiresAt") );
      console.log(" requested new access toke : "+ data+ "  succesfully");

      // Clear the expired access token
      this.localStorageService.clear('accessToken');
      this.localStorageService.clear('accessTokenExpiresAt');

      // Store the new access token
      this.localStorageService.store('accessToken', data.accessToken);
      this.localStorageService.store('accessTokenExpiresAt', data.accessTokenExpiresAt);

      return of();
    } ));

  }
    

}
