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



  constructor(public userService: UserService, private _router: Router) {}

  ngOnInit() {
  }

  logOut() {
  	this.userService.logout().subscribe(() => this._router.navigate(['/']));

  }

}
