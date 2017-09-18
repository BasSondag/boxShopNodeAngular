import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Item } from '../constructors/item';
import { ProductService } from './../services/product.service';



@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.css']
})
export class UpdateProductFormComponent implements OnInit {
	errors = String;
	index = 0;
	item= new Item()
	@Input()  parentItem: any;
  @Output() parentItemChange = new EventEmitter();
  // chaneItem = function (parentItem) {
  // 	this.item = parentItem
  // }

  constructor(private productService: ProductService, private router: Router) {
   }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  			
        // only run when property "parentItem" changed
        if (changes['parentItem']) {
        	console.log(this.parentItem, 'parent item changed')
            this.item = this.parentItem;
        }
    }

  updateItem() {
    this.productService.update(this.item).subscribe(
      res => { 

      console.log("update is success full", res, this.item) 
      },
      err => {
        console.log(err._body)
      }
    );

  }
  closeModal() {
  }

}
