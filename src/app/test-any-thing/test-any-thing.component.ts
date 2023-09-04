import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import { PostModel } from '../shared/post-model'
import { Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../shared/post.service';
import { lastValueFrom } from "rxjs";


@Component({
  selector: 'app-test-any-thing',
  templateUrl: './test-any-thing.component.html',
  styleUrls: ['./test-any-thing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestAnyThingComponent implements OnInit {

  // CHUA TIM RA CACH RENDER TOI UU CHO COMPOENT NAY
  
  @Input() posts$!: PostModel[];
  @Input() total$!: number;
  @Input() size$!: number;
  postByPage!: PostModel[];
  p: number;
  isDataLoad : boolean;
  faComments = faComments;

  constructor(private router: Router, private postService: PostService){ 
    this.p = 1;
    if(this.size$ === undefined){
      this.size$ = 4;
    }
    this.isDataLoad = false;
   
  }

  ngOnInit() {
      this.getPage(1);
      this.p = 1;
  }


  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }


   getPage(page: number) {
      this.getThisPage(page);
   }   


  async getThisPage(page: number) {
      this.postByPage = [];
      this.p = page;
    await this.loadDataByPage(page);
      if(this.postByPage){
        this.isDataLoad = true;
      }
  }

  async loadDataByPage(page: number){
    const data =  this.postService.getPostsByPageSize(page, this.size$, "postId");
    this.postByPage = await lastValueFrom(data);
  }

}


