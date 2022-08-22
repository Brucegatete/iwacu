import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute } from "@angular/router";

import { Post } from "../../../models/post.model";
import { PostsService } from "../../../services/post.service";
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userId: string;
  public searchTerm = "";
  userIsAuthenticated = false;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  isSeller: boolean
  selectedPostId: string;

  constructor(public postsService: PostsService, private authService: AuthService, private route:ActivatedRoute) {
    this.postsService.getSearchTerm$.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
    })
  }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.postsService.getPosts(this.postsPerPage, this.currentPage, this.searchTerm);
    this.isSeller = this.authService.getAuthData().userProfileType == "seller";
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        console.log(postData)
        this.route.params.subscribe(params => {
          // need to grab posts from the backend
          if(params.searchTerm){
            this.posts = postData.posts.filter(post => post.title.toLowerCase().includes(params.searchTerm.toLowerCase()))
            this.totalPosts = Object.keys(this.posts).length;
          } else {
            this.totalPosts = postData.postCount;
            this.posts = postData.posts;
          }
        });

      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthicated => {
        this.userIsAuthenticated = isAuthicated;
        this.userId = this.authService.getUserId();
      })
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage, this.searchTerm);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage, this.searchTerm);
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
