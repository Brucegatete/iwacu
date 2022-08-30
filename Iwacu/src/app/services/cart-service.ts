import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { PostsService } from "./post.service";


const BACKEND_URL = environment.apiUrl + '/cart';

@Injectable({ providedIn: "root" })
export class CartService{

  constructor(private http: HttpClient, private router: Router, private postsService: PostsService){

  }
  cartItems: Post[] = [];
  private cartItemsUpdated = new Subject<{ cartItems: Post[]}>();
  item: Post;

  addToCart(item: Post){
    this.cartItems.push(item);
  }

  addItem2(title: string, content: string, category: string, image: File) {
    const itemData = new FormData();
    itemData.append("title", title);
    itemData.append("content", content);
    itemData.append("image", image, title);
    itemData.append("category", category);
    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL,
        itemData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  getCartItems(){
    return this.cartItems;
  }

  getCartItemsUpdateListener() {
    return this.cartItemsUpdated.asObservable();
  }

  getCartItems2(){
    this.http
      .get<{ message: string; cartPosts: any; maxPosts: number }>(
        BACKEND_URL
      )
      .pipe(
        map(postData => {
          return {
            cartPosts: postData.cartPosts.map(post => {
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
        this.cartItems = transformedPostData.cartPosts;
        this.cartItemsUpdated.next({
          cartItems: [...this.cartItems]
        });
      });
  }

  clearCart(){
    this.cartItems = [];
    return this.cartItems;
  }
}
