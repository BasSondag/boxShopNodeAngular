import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  userSignedIn$:Subject<boolean> = new Subject();

  constructor(private _http: Http) { }
  register(user) {
  	return this._http.post('/users', user).map( data => data.json() ).toPromise();
  }

	login(user) {
  	return this._http.post('/login', user)
      .map( (response: Response) => {
        if (response.json().email === user.email){
           localStorage.setItem('currentUser', JSON.stringify(response.json()));
            this.userSignedIn$.next(true);
            return true
        } else {
          return false
        }
      });

  }

  check_session() {
  	return this._http.get('/api/session').map( data => data.json() ).toPromise();
  }

  logout() {
    var user = JSON.parse(localStorage.getItem('currentUser'))
    return this._http.get('/logout',user)
      .map( (response:Response) => {
        localStorage.clear();
        this.userSignedIn$.next(false);
        return true
      }
    );
  }

  getUser() {
  	return this._http.get('/api/get_user').map( data => data.json() ).toPromise();
  }
  
}
