import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentPayload } from './comment-payload';
import { Observable } from 'rxjs';

import { GlobalVariable } from '../globlal-variable';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  hostPort: String;

  constructor(private httpClient: HttpClient) { 
    this.hostPort =  GlobalVariable.API_ENDPOINTS
  }

  getAllCommentsForPost(postId: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(this.hostPort+'/api/v1/comments/postId/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>(this.hostPort+'/api/v1/comments', commentPayload);
  }

  getAllCommentsByUser(userName: string) {
    return this.httpClient.get<CommentPayload[]>(this.hostPort+'/api/v1/comments/username/' + userName);
  }
}
