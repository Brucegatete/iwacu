import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/models/post.model";
import { PostsService } from "src/app/services/post.service";
@Component({
  selector: "app-post-list",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.scss"]
})

export class PostDetailsComponent implements OnInit{

  constructor( private postsService: PostsService){

  }

  public post: Post;

  ngOnInit(): void {
      this.post = this.postsService.getPosts(3, 3, "")[0];

  }
}
