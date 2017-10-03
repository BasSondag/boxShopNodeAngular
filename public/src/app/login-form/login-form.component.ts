import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../constructors/user';
import { UserService } from './../services/user.service';
import { AlertService } from './../services/alert.service';

@Component({
  moduleId: module.id,
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
	user = new User();
	errors = String;
	index = 0;


  constructor(private _userService: UserService, private _router: Router, private alertService: AlertService) { }

  ngOnInit() {
  }


  logInUser() {
  	console.log(this.user ,"in login controller");
  	this._userService.login(this.user).subscribe( 
      res => {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(user)
        if (user.admin) {
          console.log(user.admin, "basbas result in login component")
          this._router.navigate(['dashboard']);
        } else {
          this._router.navigate(['show_user']);
        }
      },

      err =>  {

        this.errors = JSON.parse(err._body)
        this.alertService.error(err._body);
      }
    );
  	this.user = new User
  }
}
