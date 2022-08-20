import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post.model";
import { PostsService } from "../services/post.service";
import { AuthService } from "../services/auth.service";
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
    this.postsService.getUserCartItems(this.creatorId);
    console.log(this.creatorId);
    this.itemSub = this.postsService
      .getUserPostUpdatedListener()
      .subscribe((userPostData: {userPosts: Post[]}) => {
        this.route.params.subscribe(params => {
            this.userItems = userPostData.userPosts;
          // }
        });

      });
  }
}
