import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {
  //     title: 'First Post',
  //     content: 'This is the content of the first post',
  //   },
  //   {
  //     title: 'Second Post',
  //     content: 'This is the content of the second post',
  //   },
  //   {
  //     title: 'Third Post',
  //     content: 'This is the content of the third post',
  //   },
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {
  }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
