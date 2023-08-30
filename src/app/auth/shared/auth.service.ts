import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable, map , of, tap} from 'rxjs';
import { LoginRequestPayload } from '../login/login.request.payload';
import { LoginResponsePayload } from '../login/login.response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { GlobalVariable } from '../../globlal-variable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  hostPort: String;

  // Refreshed token is mandatory to ask for a new access token
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),  
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient,
    private localStorageService: LocalStorageService) {
    this.hostPort =  GlobalVariable.API_ENDPOINTS

  }

  signupHandleHTTP(signupRequestPayload: SignupRequestPayload): Observable<any> {
    var url = this.hostPort + "/api/auth/signup";
    return this.httpClient.post(url, signupRequestPayload, { responseType: 'text' });
  }

  loginHandleHTTP(loginRequestPayload: LoginRequestPayload): Observable<any> {
   
    var url = this.hostPort + "/api/auth/login";

    return this.httpClient.post<LoginResponsePayload>(url, loginRequestPayload)
      .pipe(map(data => {

        this.localStorageService.store("accessToken", data.accessToken);
        this.localStorageService.store("refreshToken", data.refreshToken);
        this.localStorageService.store("accessTokenExpiresAt", data.accessTokenExpiresAt);
        this.localStorageService.store("refreshTokenExpiresAt", data.refreshTokenExpiresAt);
        this.localStorageService.store("username", data.username);

        this.loggedIn.emit(true);
        this.username.emit(data.username);

        return of();
      }))

  }

  logoutHandleHTTP(): void {
    this.httpClient.post<LoginResponsePayload>(this.hostPort + '/api/auth/logout', this.refreshTokenPayload)
    .subscribe({
      next: (v) => {
        console.log(v);
      
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => console.info('log out complete') 
    });

    this.localStorageService.clear('accessToken');
    this.localStorageService.clear('refreshToken');
    this.localStorageService.clear('accessTokenExpiresAt');
    this.localStorageService.clear('refreshTokenExpiresAt');
    this.localStorageService.clear("username");
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
    
  isLoggedIn(): boolean {
    return this.getAccessToken() != null;
  }

}
