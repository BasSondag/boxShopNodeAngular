import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private _http: Http) { }

  create(item) {
  	return this._http.post('/items/create', item)
      .map( (response: Response) => {
        return response
      });
  }

  getAllItems() {
  	return this._http.get('/items')
  		.map( (response: Response) => {
  			return response
  		})
  }

  update(item) {

    return this._http.post('/items/update', item)
      .map( (response: Response) => {
        return response
      })
  }

  deleteItem(item) {
    item = {'id': item}
  	return this._http.post('/items/delete', item)
  		.map( (response: Response) => {
        return response
  		})
  }

}
