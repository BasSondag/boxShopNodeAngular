import { Component, OnInit } from '@angular/core';
import { User } from '../constructors/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';

@Component({ 
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
	user = new User();
	errors: String;
	index = 0;
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  signInUser() {
  	console.log(this.user)
    this._userService.register(this.user)
    .then( (data) => {this._router.navigate(['show_user']) })
    .catch( (err) => {
      if (err.status  == '422') {
      console.log("email is taken")  
      this.errors = "this email is already taken!"
    } else {
      this.errors = "Somme thing is not correct err staus 400"
    }
    })
    console.log("this should te err message", this.errors)
    this.user = new User();
  }
}
