import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
	constructor(private router: Router, private _userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
        console.log("user autguard is true", JSON.parse(localStorage.getItem('currentUser')))
        return true;
    }
    console.log("user autguard is false")
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

    return false;
  }
}
