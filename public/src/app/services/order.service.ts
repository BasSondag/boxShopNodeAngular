import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private http: Http) { }

  getAllOrders() {
  	return this.http.get('/orders')
  		.map( (response: Response) => {
  			return response
  		})
	}
  
  createOrder(order) {
  	return this.http.post('/orders/create', order)
  		.map( (response: Response) => {
  			return true
  		})
  }

 

}
