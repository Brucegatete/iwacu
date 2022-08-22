import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy{
  isLoading = false;
  private authStatusSub: Subscription;
  private userProfileType: string;


  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    )
  }

  onSelectionChange(value){
    this.userProfileType = value;
  }



  onLogin(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.authService.login(form.value.email, form.value.password, this.userProfileType);
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
}
}
