import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  hostPort: String;

  constructor(private http: HttpClient) {
    this.hostPort = "http://localhost:8600";
   }

  getAllPosts(): Observable<Array<PostModel>> {
    var url = this.hostPort + "/api/v1/posts";
    return this.http.get<Array<PostModel>>(url);
  }
}
