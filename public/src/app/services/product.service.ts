import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private _http: Http) { }

  create(item) {
  	console.log(item, 'in service')
  	return this._http.post('/items/create', item)
      .map( (response: Response) => {
        console.log(response.json(), " product service response")
        return response
      });
  }

  getAllItems() {
  	console.log("in getallitems")
  	return this._http.get('/items')
  		.map( (response: Response) => {
  			console.log(response.json(), "in porductServices")
  			return response
  		})
  }

  update(item) {
    console.log(item, "in productServices")
    return this._http.post('/items/update', item)
      .map( (response: Response) => {
        console.log(response.json(), "updated Item in services")
        return response
      })
  }

  deleteItem(item) {
    item = {'id': item}
  	console.log("in service " , item)
  	return this._http.post('/items/delete', item)
  		.map( (response: Response) => {
  			console.log(response.json(), 'delete item')
        return response
  		})
  }

}
