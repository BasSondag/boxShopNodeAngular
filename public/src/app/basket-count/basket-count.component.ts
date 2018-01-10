import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BasketCountService } from '../services/basket-count.service';

@Component({
  selector: 'app-basket-count',
  templateUrl: './basket-count.component.html',
  styleUrls: ['./basket-count.component.css']
})
export class BasketCountComponent implements OnDestroy {
	private subscription: Subscription;
  message: any;
	count = 0;
  constructor(private basketCountService: BasketCountService) { 
    let currentBasket = JSON.parse(localStorage.getItem('currentBasket'))
    this.subscription = basketCountService.getMessage().subscribe(message => {
      if (message=== undefined ) {
      	if (!currentBasket){
      		this.count= 0;
      	}else{
      		this.count= currentBasket.counter
      	}

      }else {
      	this.count = message["text"];
   		}
     
    });
  }

  ngOnDestroy(): void {
  	// unsubscribe on destroy to prevent memory leaks
  	this.subscription.unsubscribe();
  }


}
