import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Post } from "../models/post.model";
import { environment } from "src/environments/environment";

const BACKEND_URL = environment.apiUrl + "/posts/"

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private userPosts: Post[] = [];
  private userPostUpdated = new Subject<{userPosts: Post[]}>();
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();
  getSearchTerm$: Observable<any>;
  private getSearchTermSubject = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {
    this.getSearchTerm$ = this.getSearchTermSubject.asObservable();
  }

  getSearchTerm(searchTerm){
    this.getSearchTermSubject.next(searchTerm);
  }

  getPosts(postsPerPage: number, currentPage: number, searchTerm: string) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&searchTerm=${searchTerm}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                category: post.category,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        console.log(transformedPostData)
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getUserPostUpdatedListener() {
    return this.userPostUpdated.asObservable();
  }


  // TODO - Optimize here, we don't want to load all posts before we narrow down to creator posts
  getUserCartItems(creatorId: string){
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + creatorId
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                category: post.category,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        console.log(transformedPostData)
        this.userPosts = transformedPostData.posts;
        this.userPostUpdated.next({
          userPosts: [...this.userPosts]
        });
      });
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      category: string;
      creator: string
    }>(BACKEND_URL + id);
  }

  addPost(title: string, content: string, category: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    postData.append("category", category);
    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  addPostToCart(title: string, content: string, category: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    postData.append("category", category);
    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL + "/my-cart/",
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string, category: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("category", category);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        category: category,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    return this.http
      .delete(BACKEND_URL + postId);
  }
}
