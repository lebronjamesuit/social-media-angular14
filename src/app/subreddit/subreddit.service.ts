import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubredditModel } from './subreddit-model';
import * as Global from '../globlal-variable';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

   hostPort: String;

  constructor(private http: HttpClient) { 
    this.hostPort = Global.GlobalVariable.API_ENDPOINTS
  }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
   
    return this.http.get<Array<SubredditModel>>(this.hostPort+'/api/v1/subreddit');
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>(this.hostPort + '/api/v1/subreddit',
      subredditModel);
  }

}