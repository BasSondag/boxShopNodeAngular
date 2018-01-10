import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Item } from '../constructors/item';
import { ProductService } from './../services/product.service';
import { AlertService } from './../services/alert.service';
@Component({ 
  moduleId: module.id,
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
  constructor( private _productService: ProductService, private alertService: AlertService ,private router: Router) { }

  ngOnInit() {
  }

  addProduct() {
  	this._productService.create(this.item).subscribe( 
      res => {
        this.items.push(res.json().item)
        this.itemsChange.emit(this.items)
        let modal = document.getElementById('add_item_modal');
        modal.style.display = "none";
        this.item = new Item();
        this.alertService.success( "You success full added a product  ")
      },

      err =>  {
        this.item = new Item();
        this.alertService.error(err._body);
      }
    );
  	
  }

}
