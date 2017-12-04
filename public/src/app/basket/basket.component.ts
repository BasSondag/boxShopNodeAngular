import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from './../services/alert.service';
import { BasketService } from './../services/basket.service';
import { Basket } from './../constructors/basket';



@Component({ 
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
	basket = new Basket();
	totalPrice = 0;


  constructor(private baskeService: BasketService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
  	let currentBasket = JSON.parse(localStorage.getItem('currentBasket'));
  	console.log(currentBasket)
  	if(currentBasket) {
  		this.basket = currentBasket
  	}
  	console.log('this is the basket', this.basket, this.totalPrice)
  }


  orderBasket() {
  	console.log(this.basket);
    let modal = document.getElementById('pay_modal');
    modal.style.display = "block";
   
  }

  closePayModal(){
    let modal = document.getElementById('pay_modal');
    modal.style.display = "none";
    localStorage.removeItem("currentBasket")
    this.basket= new Basket();
    this.alertService.success( "Thank you for your order. We let you know when it is Shipped")

  }

}
