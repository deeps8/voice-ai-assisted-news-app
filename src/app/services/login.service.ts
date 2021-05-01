import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, shareReplay } from "rxjs/operators";
import { throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  username: string;
  password: string;
  logregSwitch: Boolean = false;
  errorMessage: string;
  user: Object;
  constructor(private httpClient: HttpClient,private router:Router) {}

  public registerUser() {
    this.username = this.username.split(" ").join("");
    this.password = this.password.split(" ").join("").toLowerCase();

    this.user = Object({
      username: this.username,
      password: this.password
    });


    var headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    this.httpClient
      .post<any>(
        "https://ai-todo-app.herokuapp.com/alan-user/signup",
        this.user,
        { headers: headers }
      )
      .pipe(
        catchError((err) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message;
          return throwError(err);
        }),
        shareReplay()
      )
      .subscribe((res) => {
        console.log("Sign up done !!");
        this.errorMessage = "Sign up done";
        this.loginUser();
      });

      return this.errorMessage;
  }

  public loginUser() {
    this.username = this.username.split(" ").join("");
    this.password = this.password.split(" ").join("").toLowerCase();

    this.user = Object({
      username: this.username,
      password: this.password
    });


    var headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    this.httpClient
      .post<any>(
        "https://ai-todo-app.herokuapp.com/alan-user/login",
        this.user,
        { headers: headers }
      )
      .pipe(
        catchError((err) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message;
          return throwError(err);
        }),
        shareReplay()
      )
      .subscribe((res) => {
        console.log("Login done!!");
        this.errorMessage = "Login Done";
        localStorage.setItem("token",res.token);
        localStorage.setItem("username",res.user.username);
        this.router.navigate(['home']);
      });

      return this.errorMessage;
  }

  public clearValues() {
    this.username = "";
    this.password = "";
  }

  public logoutUser(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.router.navigate(['register']);
  }
}
