import { Component, OnInit } from '@angular/core';
import { ProductService } from './../services/product.service';
import { Item } from '../constructors/item';
import { Basket } from '../constructors/basket';
import { AlertService } from './../services/alert.service';
import { BasketService } from './../services/basket.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})


export class ShowProductsComponent implements OnInit {
	items: Array<Item>;
	item= new Item();
  basket= new Basket();
 

  constructor( private productService: ProductService, private alertService: AlertService, private basketService: BasketService) { }

  ngOnInit() {
    console.log('in init show-products')
  	this.productService.getAllItems().subscribe(
      
  		res => {
  			this.items = res.json().products
  			console.log(this.items)
  		},
  		err => {
  			console.log(err._body);
  		}
  	)
  }

  addToBasket(item) {
    let currentBasket = JSON.parse(localStorage.getItem('currentBasket'))
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let isExcistingItem = false;

    item.quantaty = 1
     console.log(this.basket, currentUser, currentBasket)
    if (!currentBasket) {

      this.basket.items.push(item)
      localStorage.setItem('currentBasket',JSON.stringify(this.basket));
      console.log('first basket is in local storrage', JSON.parse(localStorage.getItem('currentBasket')))
      this.alertService.success("you added " + item.title + " to your basket")
    } else {
      console.log("basket already excist lets ad it")
      for(let i= 0; i <currentBasket.items.length; i++){
        console.log(currentBasket.items[i].id, item.id)
        if (item.id === currentBasket.items[i].id){
          console.log('found dubble')
          currentBasket.items[i].quantaty +=1;
          console.log(currentBasket.items[i].quantaty)
          isExcistingItem = true
          break;
        }
      }
      if (isExcistingItem=== false) {
        currentBasket.items.push(item)
      }
      console.log(currentBasket.items)
      localStorage.setItem("currentBasket" ,JSON.stringify(currentBasket))
      this.alertService.success("you added " + item.title + " to your basket")
    }

  }



}
