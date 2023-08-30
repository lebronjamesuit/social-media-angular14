import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VotePayload } from './vote-button/vote-payload';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../globlal-variable';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  hostPort: string

  constructor(private http: HttpClient) {
    this.hostPort = GlobalVariable.API_ENDPOINTS;
  }

  vote(votePayload: VotePayload): Observable<any> {
   // CHUA IMPLEMENT VOTE IN SPRING BOOT
    return this.http.post(this.hostPort + '/api/v1/votes', votePayload);
  }

}



