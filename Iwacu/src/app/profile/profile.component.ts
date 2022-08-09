import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})

export class ProfileComponent implements OnInit{
  constructor(private authService: AuthService){}

  userEmail: string;


  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    console.log(this.userEmail);
  }
}
