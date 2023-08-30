import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, firstValueFrom } from 'rxjs';
import { PostModel } from './post-model';
import { CreatePostPayload } from '../post/create-post/create-post-payload';
import { GlobalVariable } from '../globlal-variable';


@Injectable({
  providedIn: 'root'
})
export class PostService {


  hostPort: String;

  constructor(private http: HttpClient) {
    this.hostPort =  GlobalVariable.API_ENDPOINTS
   }

  getAllPosts(): Observable<Array<PostModel>> {
    var url = this.hostPort + "/api/v1/posts";
    return this.http.get<Array<PostModel>>(url);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(this.hostPort+ '/api/v1/posts', postPayload);
  }

  getPost(id: string): Observable<PostModel> {
    return this.http.get<PostModel>(this.hostPort+ '/api/v1/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.hostPort+ '/api/v1/posts/by-user/' + name);
  }

}
