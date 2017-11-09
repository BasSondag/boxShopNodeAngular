import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Item } from '../constructors/item';
import { AlertService } from './../services/alert.service';
import { OrderService } from './../services/order.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})

export class DashboardAdminComponent implements OnInit {
  items: Array<Item>;
  item = new Item();
  orders=[];
  constructor(private _productService: ProductService, private alertService: AlertService, private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(
      res => {
        console.log(res.json().orders, "this is all the orders")
        this.orders= res.json().orders;
      },
      err => {
        console.log(err._body);
      }
    )

    this._productService.getAllItems().subscribe(
      res => {
        console.log(res)
        this.items = res.json().products
      },
      err => {
        console.log(err._body)

      }
    )
  }


  deleteItem(item) {
    console.log(item, this)
    this._productService.deleteItem(item.id).subscribe(
      res => {
        console.log(res.json(), "succes" , this.item);
        this.items = res.json().products;
        this.alertService.success( "You delleted " + item.title + " " + item.description  )

      },
      err => {
        console.log(err._body, "errors")
        this.alertService.error(err._body)
      }
     )
  }

  openCreateModal() {
    console.log("opening modal")
  	let modal = document.getElementById('add_item_modal');
	  modal.style.display = "block";
  }

  openUpdateModal(item) {
    this.item = item
    console.log("opening modal", console.log(this.item))
    let modal = document.getElementById('update_item_modal');
    modal.style.display = "block";
  }

  closeUpdateModal() {
    let modal = document.getElementById('update_item_modal');
    modal.style.display = "none";
  }

  closeCreateModal() {
    let modal = document.getElementById('add_item_modal');
    modal.style.display = "none";
  }
}
