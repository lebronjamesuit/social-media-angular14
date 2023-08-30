import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { Observable, of, throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/comment/comment-payload';
import { CommentService } from 'src/app/comment/comment.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: string;
  post!: PostModel; // get this post from db by id
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments!: CommentPayload[];

  isDataloaded: boolean;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    };

    this.isDataloaded = false;
    this.initData ();
 

  }

  ngOnInit():void {
 
  }

   private async initData() {    
     await this.getPostById();
     await this.getCommentsForPost();
     if(this.post){
      this.isDataloaded = true;
     }
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')!.value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text')!.setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  private async getPostById() {
     const obser =  this.postService.getPost(this.postId)
     this.post = await firstValueFrom(obser);
  }

  private async getCommentsForPost() {
    const obser =  this.commentService.getAllCommentsForPost(this.postId)
    this.comments =  await firstValueFrom(obser);
  }

}