import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "src/app/models/post.model";
import { PostsService } from "src/app/services/post.service";
@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.css"]
})

export class PostDetailsComponent implements OnInit{

  constructor( private postsService: PostsService, public route: ActivatedRoute){

  }

  public post: Post;
  postId: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.postId = paramMap.get("postId");
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            category: postData.category,
            creator: postData.creator

          };
        });
      }
    });

  }
}
