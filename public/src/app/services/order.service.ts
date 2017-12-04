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
  
  createOrder(order, token) {
    let payedOrder= { order, token}
  	return this.http.post('/orders/create', payedOrder)
  		.map( (response: Response) => {
  			return true
  		})
  }

 

}
