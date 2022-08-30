import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";


const BACKEND_URL = environment.apiUrl + '/cart';

@Injectable({ providedIn: "root" })
export class CartService{

  constructor(private http: HttpClient, private router: Router){

  }
  cartItems: Post[] = [];
  private cartItemsUpdated = new Subject<{ cartItems: Post[]}>();

  addToCart(item: Post){
    this.cartItems.push(item);
  }

  addToCart2(item: Post) {
    const postData = new FormData();
    postData.append("title", item.title);
    postData.append("content", item.content);
    postData.append("image", item.imagePath, item.title);
    postData.append("category", item.category);
    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL,
        postData
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
