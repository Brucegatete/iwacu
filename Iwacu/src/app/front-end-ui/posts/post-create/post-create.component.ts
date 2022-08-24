import { ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../../models/post.model';
import { mimeType } from './mime-type.validator';
import { PostsService } from '../../../services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  newPost = [];
  private mode = 'create';
  private postId: string;
  post: Post;
  form : FormGroup;
  imagePreview: string;
  isLoading = false;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title:  new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      category: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            category: postData.category,
            creator: postData.creator

          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            category: this.post.category,
            image: this.post.imagePath
          });
          this.isLoading = false;
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }
  onSavePost(){
    console.log(this.form.value);
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create'){
      console.log(typeof(this.form.value.image))
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.category, this.form.value.image);
    } else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.category, this.form.value.image);
    }
    this.form.reset();
  }

  onImagePicked(event: Event ){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
