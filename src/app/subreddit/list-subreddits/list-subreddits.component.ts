import { Component, OnInit } from '@angular/core';
import { SubredditModel } from '../subreddit-model';
import { SubredditService } from '../subreddit.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css'],
})
export class ListSubredditsComponent implements OnInit {
  subreddits: Array<SubredditModel> = [];
  constructor(private subredditService: SubredditService) { }

  ngOnInit() {
    this.subredditService.getAllSubreddits()
    .subscribe({
      next: (v) => {
        this.subreddits = v;
      },
      error: (e) => {
        console.error('Error ' + e);
        throwError(() => new Error(e))
      },
      complete: () => console.info('complete'),
    });
  }
}
