import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username:string;
  password:string;
  showPass:boolean = true;
  constructor(public todo:TodoService,public userserv:LoginService) { }

  ngOnInit() {
    this.todo.getAllTasks();
    this.username = localStorage.getItem("username");
    this.password = localStorage.getItem("password");
  }

}
