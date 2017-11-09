import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Basket } from '../constructors/basket';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class BasketService {

  isBasket$:Subject<boolean> = new Subject();
  constructor(private _http: Http) { }

  createBasket(basket) {
  	console.log(basket, 'in service')
  	return this._http.post('/baskets/create', basket)
      .map( (response: Response) => {
        console.log(response.json(), " basket service create response")
        return response
      });
  }

  updateBasket(basket) {
  	console.log(basket, "in productServices")
    return this._http.post('/baskets/update', basket)
      .map( (response: Response) => {
        console.log(response.json(), "updated basket in services")
        return response
      })
  }
}
