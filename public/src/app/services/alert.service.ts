import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AlertService {

	private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
  	// clear alert message on route change
    router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            if (this.keepAfterNavigationChange) {
                // only keep for a single location change
                this.keepAfterNavigationChange = false;
            } else {
                // clear alert
                this.subject.next();
            }
        }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
  	console.log('Found success')
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterNavigationChange = false) {
  	console.log('Found error')
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  getMessage(): Observable<any> {
  	console.log('in getMessage()')
		return this.subject.asObservable();
  }


}
