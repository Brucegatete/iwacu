import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post.model";

@Component({
  selector: "app-my-cart",
  templateUrl: "./my-cart.component.html",
  styleUrls: ["./my-cart.component.css"]
})
export class MyCartComponent implements OnInit{

  my_items: Post[] = [];

  ngOnInit(): void {
    this.my_items = [];
  }
}
