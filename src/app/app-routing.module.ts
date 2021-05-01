import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CommandsComponent } from './commands/commands.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UnauthGuard } from './unauth.guard';


const routes: Routes = [
  {
    "path":"home",
    "component":HomeComponent,
    "canActivate":[UnauthGuard]
  },
  {
    "path":"register",
    "component":RegisterComponent,
    "canActivate":[AuthGuard]
  },
  {
    "path":"commands",
    "component":CommandsComponent
  },
  {
    "path":"",
    "pathMatch":"full",
    "redirectTo":"/home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
