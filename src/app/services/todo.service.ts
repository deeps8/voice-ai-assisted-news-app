import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";

export interface todo {
  title: string;
  tid: string;
  _id: string;
  done: boolean;
  user: any;
  dateOfCreation: string;
  category: string;
}

@Injectable({
  providedIn: "root",
})
export class TodoService {
  addTaskSwitch: boolean = true;
  taskCategory: string = "";
  taskTitle: string = "";
  errorMessage: string;
  todoList = [];
  updateNum:number;

  constructor(private router: Router, private http: HttpClient) {}

  public addTask() {
    console.log(this.taskCategory, this.taskTitle);

    const task = Object({
      title: this.taskTitle,
      category: this.taskCategory,
    });

    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    this.http
      .post<any>("https://ai-todo-app.herokuapp.com/alan-todo/add", task, {
        headers: headers,
      })
      .pipe(
        catchError((err) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message;
          return throwError(err);
        }),
        shareReplay()
      )
      .subscribe((res) => {
        console.log("Task Added!!");
        this.errorMessage = "Task Added";
        this.todoList.push(res.task);
        this.addTaskSwitch = true;
      });

      return this.errorMessage;
  }

  public getAllTasks() {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    this.http
      .get<any>("https://ai-todo-app.herokuapp.com/alan-todo/all", {
        headers: headers,
      })
      .pipe(
        catchError((err) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message;
          return throwError(err);
        }),
        shareReplay()
      )
      .subscribe((res) => {
        console.log("Fetching done!!");
        this.errorMessage = "Task retrieved";
        if (res.tasks.length != 0) this.todoList = res.tasks;
      });

      return this.errorMessage;
  }

  public clearValues() {
    this.taskTitle = "";
    this.taskCategory = "";
  }

  public doneTask(num) {
    const b = Object({
      tid: this.todoList[num].tid,
      done: true,
    });

    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    this.http
      .post<any>("https://ai-todo-app.herokuapp.com/alan-todo/update/done", b, {
        headers: headers,
      })
      .pipe(
        catchError((err) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message;
          return throwError(err);
        }),
        shareReplay()
      )
      .subscribe((res) => {
        console.log("Update done!!");
        this.errorMessage = "Task completed";
        this.todoList[num].done = true;
      });

      return this.errorMessage;
  }

  public deleteTask(num) {
    if (num < this.todoList.length) {
      const b = Object({
        tid: this.todoList[num].tid,
      });

      var headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      this.http
        .post<any>("https://ai-todo-app.herokuapp.com/alan-todo/delete", b, {
          headers: headers,
        })
        .pipe(
          catchError((err) => {
            console.log(err.error.message);
            this.errorMessage = err.error.message;
            return throwError(err);
          }),
          shareReplay()
        )
        .subscribe((res) => {
          console.log("Task Deleted!!");
          this.errorMessage = "Task Deleted";
          this.todoList.splice(num, 1);
        });

    }
    else{
      console.error("Out of index bound");
      this.errorMessage = "Task not found , choose another task";
    }

    return this.errorMessage;
  }


  public taskUpdate(num){

    const task = Object({
      tid: this.todoList[num].tid,
      title: this.taskTitle,
      category: this.taskCategory,
    });

    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    this.http
      .post<any>("https://ai-todo-app.herokuapp.com/alan-todo/update", task, {
        headers: headers,
      })
      .pipe(
        catchError((err) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message;
          return throwError(err);
        }),
        shareReplay()
      )
      .subscribe((res) => {
        console.log("Task Added!!");
        this.errorMessage = "Task Added";
        this.todoList.push(res.task);
        this.addTaskSwitch = true;
      });

      return this.errorMessage;

  }

}
