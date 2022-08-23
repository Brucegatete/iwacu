import { Component, OnInit } from "@angular/core";
import { Post } from "../../models/post.model";
import { PostsService } from "../../services/post.service";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-my-cart",
  templateUrl: "./my-cart.component.html",
  styleUrls: ["./my-cart.component.css"]
})

export class MyCartComponent implements OnInit{

  userItems: Post[] = [];
  creatorId: string;
  private itemSub: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService, private route:ActivatedRoute) {}


  ngOnInit(): void {
    this.creatorId = this.authService.getUserId();
    console.log(this.creatorId);
    // TODO -- OPTIMIZE THIS, THIS IS HIGHLY INEFFICIENT AND UNSCALLABLE IN CASE YOU HAVE TO PARSE MORE THAN 100 POSTS
    this.postsService.getPosts(100, 1, "");
    this.itemSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        console.log("this is the postData");
        this.route.params.subscribe(params => {
          // need to grab posts from the backend
          this.userItems = postData.posts;
          console.log(postData)


          // filter for only all the posts that the user has created
          this.userItems = this.userItems.filter(userItem => userItem.creator == this.creatorId)
        });

      });
  }
}
