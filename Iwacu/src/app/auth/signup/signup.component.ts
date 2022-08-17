import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  private userProfileType: string;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onSelectionChange(value){
    this.userProfileType = value;
  }

  onSignup(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    console.log("this is user profile type " + form.value.userProfileType);
    this.authService.createUser(form.value.email, form.value.password, this.userProfileType);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
