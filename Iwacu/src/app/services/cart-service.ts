import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";

@Injectable({ providedIn: "root" })
export class CartService{
  cartItems: Post[] = [];

  addToCart(item: Post){
    this.cartItems.push(item);
  }

  getCartItems(){
    return this.cartItems;
  }

  clearCart(){
    this.cartItems = [];
    return this.cartItems;
  }
}
