import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { User } from '../constructors/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  userSignedIn$:Subject<boolean> = new Subject();
  userIsAdmin$:Subject<boolean> = new  Subject();
  user;

  constructor(private _http: Http) { }
  register(user) {
  	return this._http.post('/users', user).map( data => data.json() ).toPromise();
  }

	login(user) {
  	return this._http.post('/login', user)
      .map( (response: Response) => {
        console.log(response.json().admin, " user service admin check")
        if (response.json().email === user.email && response.json().admin == true) {
          localStorage.setItem('currentUser', JSON.stringify(response.json()));
          this.userSignedIn$.next(true);
          this.userIsAdmin$.next(true);
          console.log(this.userSignedIn$, this.userIsAdmin$, " are the observables set?");
          return true
        }
        if (response.json().email === user.email){
          localStorage.setItem('currentUser', JSON.stringify(response.json()));
          this.userSignedIn$.next(true);
          return true
        } else {
          return false
        }
      });

  }

  update( user) {
    let cleanUser= {}
    let oldUserInfo = JSON.parse(localStorage.getItem('currentUser'))
    if (user.email === oldUserInfo.email){
      cleanUser= {
        id: parseInt(user.id),
        first_name: user.first_name,
        last_name: user.last_name,
      }
    } else {
      cleanUser= {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }
    }
    console.log('updatei s called', cleanUser)
    return this._http.post('/updateUser', cleanUser).map( data => data.json() ).toPromise();
  }

  checkSession() {
    console.log("checking session")
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser)
  	return this._http.get('/checkLogin')
      .map( (data) => {
        console.log(currentUser, data.json().id, 'checket the results')
        if (data.json().id === currentUser.id && data.json().admin == true) {
          this.userSignedIn$.next(true);
          this.userIsAdmin$.next(true);
          console.log(this.userSignedIn$, this.userIsAdmin$, " are the observables set?");
          return 
        }
        if (data.json().id === currentUser.id){
          this.userSignedIn$.next(true);
          return 
        } else {
          console.log("what is wrong")
          localStorage.clear();
          this.userSignedIn$.next(false);
          this.userIsAdmin$.next(false);
          this.user= new User();
          return
        }
      });
  }

  logout() {
    var user = JSON.parse(localStorage.getItem('currentUser'))
    return this._http.get('/logout',user)
      .map( (response:Response) => {
        console.log(response)
        localStorage.clear();
        this.userSignedIn$.next(false);
        this.userIsAdmin$.next(false);
        this.user= new User();
        return true
      }
    );
  }

  getUser() {
  	return this._http.get('/api/get_user').map( data => data.json() ).toPromise();
  }
  
}
