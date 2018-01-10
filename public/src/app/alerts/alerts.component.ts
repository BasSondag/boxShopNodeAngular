  import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '../services/alert.service';



@Component({
  moduleId: module.id,
  selector: 'alerts',
  templateUrl: './alerts.component.html',

})
export class AlertsComponent implements OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { 
    this.subscription = alertService.getMessage().subscribe(message => {
      this.message = message;
      if(message   === 'success') {
        setTimeout(()=>{
          this.message= null
        },4500);
      } 
    });
  }

  closeAlert(message) {
    // this.subscription.unsubscribe()
    this.message= null 
  }

  ngOnDestroy(): void {
      // unsubscribe on destroy to prevent memory leaks
      this.subscription.unsubscribe();
  }

}
