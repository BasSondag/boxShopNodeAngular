import { Component, OnInit } from '@angular/core';
import { User } from '../constructors/user';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
	errors = String;
	user;
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  updateUser() {
  	this._userService.update(this.user)
    .then((data) => { 
      localStorage.setItem('currentUser', JSON.stringify(this.user))
    })
    .catch( (err) => { console.log("err in update") })

  }
  

}
