import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Item } from '../constructors/item';
import { ProductService } from './../services/product.service';
import { AlertService } from './../services/alert.service';


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


  constructor(private productService: ProductService,private alertService: AlertService, private router: Router) {
   }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  			
        // only run when property "parentItem" changed
        if (changes['parentItem']) {
            this.item = this.parentItem;
        }
    }

  updateItem() {
    this.productService.update(this.item).subscribe(
      res => { 
      this.alertService.success( "Your update is success full")
      },
      err => {
        this.alertService.error(err._body);
      }
    );

  }
  closeModal() {
  }

}
