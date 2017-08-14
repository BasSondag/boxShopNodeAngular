import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../constructors/user';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
	user = new User();
	errors = String;
	index = 0;
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  logInUser() {
  	console.log(this.user ,"in login controller");
  	this._userService.login(this.user).then( data => this._router.navigate(['show_user']) ).catch( err =>  this.errors = JSON.parse(err._body));
  	this.user = new User
  }
}
