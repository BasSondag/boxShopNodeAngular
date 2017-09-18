import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Item } from '../constructors/item';
import { ProductService } from './../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
	item = new Item();
	errors = String;
	index = 0;
  @Input() items: Array<Item>;
  @Output() itemsChange = new EventEmitter();
  constructor( private _productService: ProductService, private router: Router) { }

  ngOnInit() {
  }

  addProduct() {

  	console.log(this.item ,"in login controller");
  	this._productService.create(this.item).subscribe( 
      res => {
        console.log(res.json().item)
        this.items.push(res.json().item)
        console.log(this.items)
        this.itemsChange.emit(this.items)
        let modal = document.getElementById('add_item_modal');
        modal.style.display = "none";
        this.item = new Item();
      },

      err =>  {
      	console.log("something went wrong ", err)
        this.item = new Item();
      }
    );
  	
  }

}
