import { Component, OnInit } from "@angular/core";
import { Post } from "../../models/post.model";
import { PostsService } from "../../services/post.service";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CartService } from "src/app/services/cart-service";

@Component({
  selector: "app-my-cart",
  templateUrl: "./my-cart.component.html",
  styleUrls: ["./my-cart.component.css"]
})

export class MyCartComponent implements OnInit{

  cartItems: Post[] = [];
  creatorId: string;
  private itemSub: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService, private route:ActivatedRoute, private cartService: CartService) {}


  ngOnInit(){
    this.cartService.getCartItems2();
    this.itemSub = this.cartService
      .getCartItemsUpdateListener()
      .subscribe((postData: {cartItems: Post[]}) => {
        this.route.params.subscribe(params => {
          // need to grab posts from the backend
            this.cartItems = postData.cartItems;
          })
        });
  }
}
