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


  ngOnInit(): void {
    // this.creatorId = this.authService.getUserId();
    // this.postsService.getUserCartItems();
    // this.itemSub = this.postsService
    //   .getCartItemsUpdatedListener()
    //   .subscribe((cartItemsData: {cartItems: Post[]}) => {
    //     this.cartItems = cartItemsData.cartItems;
    //   });

    this.cartItems = this.cartService.getCartItems();
  }
}
