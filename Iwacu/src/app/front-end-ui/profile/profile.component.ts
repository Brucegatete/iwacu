import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Post } from "../../models/post.model";
import { AuthService } from "../../services/auth.service";
import { PostsService } from "../../services/post.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})

export class ProfileComponent implements OnInit{
  constructor(public postsService: PostsService, private authService: AuthService, private route: ActivatedRoute){}
  posts: Post[] = [];

  userEmail: string;
  panelOpenState = false;
  userId: string;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;
  userProfileType: string;
  totalPosts = 0;


  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    this.userId = this.authService.getUserId();
    this.userProfileType= this.authService.getAuthData().userProfileType;
    // limit such that we are not hard coding the limit
    this.postsService.getPosts(100, 1, "");
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        console.log("this is the postData");
        console.log(postData)
        this.route.params.subscribe(params => {
          // need to grab posts from the backend
          if(params.searchTerm){
            this.posts = postData.posts.filter(post => post.title.toLowerCase().includes(params.searchTerm.toLowerCase()));
            this.totalPosts = Object.keys(this.posts).length;
          } else {
            this.totalPosts = postData.postCount;
            this.posts = postData.posts;
          }
          // filter for only all the posts that the user has created
          console.log(this.posts[0].creator);
          this.posts = this.posts.filter(post => post.creator == this.userId)
        });

      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage, "");
  }
}
