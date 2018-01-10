import { Component, OnInit } from '@angular/core';
import { ProductService } from './../services/product.service';
import { Item } from '../constructors/item';
import { Basket } from '../constructors/basket';
import { AlertService } from './../services/alert.service';
import { BasketService } from './../services/basket.service';
import { BasketCountService } from './../services/basket-count.service'

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})


export class ShowProductsComponent implements OnInit {
	items: Array<Item>;
	item= new Item();
  basket= new Basket();
 

  constructor( private productService: ProductService, private alertService: AlertService, private basketService: BasketService, private basketCountService: BasketCountService) { }

  ngOnInit() {
  	this.productService.getAllItems().subscribe(
      
  		res => {
  			this.items = res.json().products

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

    item.quantaty = 1;

    if (!currentBasket) {

      this.basket.items.push(item);
      this.basket.total += item.price;
      this.basket.counter += 1;
      localStorage.setItem('currentBasket',JSON.stringify(this.basket));
      this.alertService.success("you added " + item.title + " to your basket");
      this.basketCountService.update(this.basket.counter);
    } else {
      for(let i= 0; i <currentBasket.items.length; i++){
        if (item.id === currentBasket.items[i].id){
          currentBasket.items[i].quantaty +=1;
          currentBasket.total += item.price;
          isExcistingItem = true
          break;
        }
      }
      if (isExcistingItem === false) {
        currentBasket.items.push(item);
        currentBasket.total += item.price;
        currentBasket.counter += 1;
        this.basketCountService.update(currentBasket.counter);
      }
      localStorage.setItem("currentBasket" ,JSON.stringify(currentBasket))
      this.alertService.success("you added " + item.title + " to your basket")
    }

  }



}
