import { Component } from '@angular/core';
import alanBtn from '@alan-ai/alan-sdk-web';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { TodoService } from './services/todo.service';
import wordsToNumbers from 'words-to-numbers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  alanBtnInstance;
  n:any;
  errorMsg:string;
  constructor(private regService:LoginService,private todoserv:TodoService,private router:Router){


    this.alanBtnInstance = alanBtn({
      key: 'b8e09d8799114739595e069b8a2374442e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({command,user,task,num}:any) => {
        if(command==='signup'){

          this.regService.logregSwitch = true;
          this.regService.clearValues();

        }
        else if(command === 'userdetails'){

          this.regService.username = user.username;
          this.regService.password = user.password;

          if(this.regService.logregSwitch)
            this.errorMsg =  this.regService.registerUser();
          else
            this.errorMsg = this.regService.loginUser();


          this.alanBtnInstance.playText(this.errorMsg);

        }
        else if (command === 'login') {

          this.regService.logregSwitch = false;
          this.regService.clearValues();

        }
        else if(command === "addtodo"){
          this.todoserv.addTaskSwitch = false;
          this.todoserv.clearValues();
        }
        else if(command === "taskDetails"){
          this.todoserv.taskTitle = task.tasktitle;
          this.todoserv.taskCategory = task.category;

          this.errorMsg = this.todoserv.addTask();
          this.alanBtnInstance.playText(this.errorMsg);

        }
        else if(command==="readTask"){
          this.todoserv.addTaskSwitch = true;
          var i= 1;
          this.todoserv.todoList.forEach(t => {
            this.alanBtnInstance.playText("todo " + i);
            this.alanBtnInstance.playText(t.title + " of " + t.category + " category ");
            i++;
          });
        }
        else if(command === "logout"){
          console.log("Logging out");
          this.regService.logoutUser();

        }
        else if(command==="deleteTask"){
          console.log(num);

          if(num.length > 2){
            this.n = wordsToNumbers(num, {fuzzy: true});
          }
          else
            this.n = num;

          console.log(this.n);
          this.errorMsg = this.todoserv.deleteTask(this.n-1);
          this.alanBtnInstance.playText(this.errorMsg);

        }
        else if(command==="doneTask"){

          console.log(num);

          if(num.length > 2){
            this.n = wordsToNumbers(num, {fuzzy: true});
          }
          else
            this.n = num;

          console.log(this.n);
          this.errorMsg = this.todoserv.doneTask(this.n-1);
          this.alanBtnInstance.playText(this.errorMsg);

        }
        else if(command==="taskUpdate"){
          console.log(num);

          if(num.length > 2){
            this.n = wordsToNumbers(num, {fuzzy: true});
          }
          else
            this.n = num;

          this.todoserv.updateNum = this.n-1;
          if(this.n < this.todoserv.todoList.length){
            this.todoserv.taskTitle = this.todoserv.todoList[this.n-1].title;
            this.todoserv.taskCategory = this.todoserv.todoList[this.n-1].category;
            this.todoserv.addTaskSwitch = false;
          }

        }
        else if(command==="updatedDetails"){

          this.todoserv.taskTitle = task.tasktitle;
          this.todoserv.taskCategory = task.category;

          this.errorMsg = this.todoserv.taskUpdate(this.todoserv.updateNum);
          this.alanBtnInstance.playText(this.errorMsg);
        }
        else if(command === "about"){
          this.router.navigate(["commands"]);
        }
        else if(command === "back"){
          this.router.navigate(["home"]);
        }
      },
    });
  }

}
