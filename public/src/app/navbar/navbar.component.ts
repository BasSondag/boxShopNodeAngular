import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../constructors/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  constructor(public _userService: UserService, private _router: Router) {}

  ngOnInit() {
  	this._userService.checkSession().subscribe(
      res => {
        console.log("checkking session")
      },
      err => {
        console.log("Login in again")
        this._router.navigate(['/login'])
      }
    );
  	  
  }

  logOut() {
  	this._userService.logout().subscribe(() => this._router.navigate(['/']));

  }

}
