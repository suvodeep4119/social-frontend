import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {

    }

    getPosts() {
        this.http.get<{message: string, posts: Post[]}>('http://test-social-backend-env.eba-zsq4rdt4.ap-south-1.elasticbeanstalk.com/').subscribe((data) => {
        console.log('Data', data);
        this.posts = data.posts;
        this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = {
            id: null,
            title: title,
            content: content
        }
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}