import { Component, OnInit } from '@angular/core';
import { User } from '../constructors/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { AlertService } from './../services/alert.service';

@Component({ 
  moduleId: module.id,
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
	user = new User();
	errors: String;
	index = 0;
  constructor(private _userService: UserService, private _router: Router, private alertService: AlertService) { }

  ngOnInit() {
  }

  signInUser() {
  	console.log(this.user)
    this._userService.register(this.user)
    .then( (data) => {this._router.navigate(['show_user']) })
    .catch( (err) => {
      if (err.status  == '422') { 
        let error = JSON.parse(err._body)
        console.log(error[0].message, "it is somthing")
        this.errors = "this email is already taken!"
        this.alertService.error(error[0].message);

      } else {
      this.alertService.error('Somme thing is not correct err staus 400')
    }
    });
    this.user = new User();
  }
}
