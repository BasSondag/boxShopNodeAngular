import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from './../services/alert.service';
import { BasketService } from './../services/basket.service';
import { Basket } from './../constructors/basket';
import { BasketCountService } from './../services/basket-count.service';



@Component({ 
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
	basket = new Basket();
	totalPrice = 0;


  constructor(private baskeService: BasketService, private alertService: AlertService, private basketCountService: BasketCountService, private router: Router) { }

  ngOnInit() {
  	let currentBasket = JSON.parse(localStorage.getItem('currentBasket'));
  	if(currentBasket) {
  		this.basket = currentBasket
  	}

  }


  orderBasket() {
    let modal = document.getElementById('pay_modal');
    modal.style.display = "block";
   
  }

  closePayModal(){
    let modal = document.getElementById('pay_modal');
    modal.style.display = "none";
    localStorage.removeItem("currentBasket")
    this.basket= new Basket();
    this.basketCountService.update(0);
    this.alertService.success( "Thank you for your order. We let you know when it is Shipped")

  }

}
