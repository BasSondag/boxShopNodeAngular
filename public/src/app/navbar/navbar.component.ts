import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../constructors/user';
import { Basket } from '../constructors/basket';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
cartCounter= 0;
basket = new Basket();
isCollapsed = false;


  constructor(public _userService: UserService, private _router: Router) {}

  ngOnInit() {

  	this._userService.checkSession().subscribe(
      res => {

      },
      err => {

      }
    );
  	  
  }

  logOut() {
  	this._userService.logout().subscribe(() => this._router.navigate(['/']));

  }

}
