import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AuthData } from "../models/auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private userId: string;
  private userEmail: string;
  private userProfileType: string;

  constructor(private http: HttpClient, private router: Router) {}

  getUserEmail(){
    return this.userEmail;
  }

  getToken() {
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  private setAuthTimer(duration: number){
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000)
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userEmail: string){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("userEmail", this.userEmail);
    localStorage.setItem("userProfileType", this.userProfileType);
  }

  //automatic signin
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userEmail = authInformation.userEmail;
      this.userProfileType = authInformation.userProfileType;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");
    const userProfileType = localStorage.getItem("userProfileType");
    if(!token || !expirationDate){
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userEmail: userEmail,
      userProfileType: userProfileType
    }
  }

  getUserId(){
    return this.userId;
  }


  //sign up
  createUser(email: string, password: string, userProfileType: string) {
    const authData: AuthData = { email: email, password: password, userProfileType: userProfileType };
    this.http
      .post(BACKEND_URL + "signup", authData)
      .subscribe(() => {
        this.router.navigate(["/login"]);
      }, error => {
        console.log(error);
        this.authStatusListener.next(false);
      });
  }


  //login
  login(email: string, password: string, userProfileType: string) {
    const authData: AuthData = {email: email, password: password, userProfileType: userProfileType};
    this.http.post<{token: string; expiresIn: number; userId: string} >("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.userEmail = authData.email;
        this.userProfileType = authData.userProfileType;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId, this.userEmail);
          this.router.navigate(["/"]);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(["/login"]);
  }

}
