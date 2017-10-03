import { Item } from './item';

export class Basket {
	constructor (
		public user_id: number = 0,
		public items	: Array<Item> =[],
		public counter: number = 0,
		) {}
}