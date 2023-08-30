import { Component, OnInit } from '@angular/core';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-model';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {
  
  subreddits: Array<SubredditModel> = [];

  displayViewAll: boolean;

  constructor(private subredditService: SubredditService) {
    this.displayViewAll = false;
    this.subredditService.getAllSubreddits()
    .subscribe(data => {
      if (data.length > 3) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });

   }

  ngOnInit(): void {

  }

}
