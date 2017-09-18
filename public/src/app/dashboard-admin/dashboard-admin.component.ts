import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Item } from '../constructors/item';



@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})

export class DashboardAdminComponent implements OnInit {
  items: Array<Item>;
  item = new Item();
  constructor(private _productService: ProductService) { }

  ngOnInit() {
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
    console.log(item)
    this._productService.deleteItem(item).subscribe(
      res => {
        console.log(res.json(), "succes");
        this.items = res.json().products;
      },
      err => {
        console.log(err._body, "errors")
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
