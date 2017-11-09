import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from './../services/alert.service';
import { BasketService } from './../services/basket.service';
import { Basket } from './../constructors/basket';
import { OrderService } from './../services/order.service';


@Component({ 
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
	basket = new Basket();
	totalPrice = 0;

  constructor(private baskeService: BasketService, private alertService: AlertService,private orderService: OrderService, private router: Router) { }

  ngOnInit() {
  	let currentBasket = JSON.parse(localStorage.getItem('currentBasket'));
  	console.log(currentBasket)
  	if(currentBasket) {
  		this.basket = currentBasket
  		for(let i= 0; i < currentBasket.items.length; i++) {
  			this.totalPrice += currentBasket.items[i].price
  		}
  	}
  	console.log('this is the basket', this.basket, this.totalPrice)
  }


  orderBasket() {
  	console.log(this.basket)
  	this.orderService.createOrder(this.basket).subscribe(
  		res => {
  			console.log('order is placed');
  			this.basket= new Basket();
  		},
  		err => {
  			console.log('some thing went wrong wit the oreder')
  		}
		);
  }

}
