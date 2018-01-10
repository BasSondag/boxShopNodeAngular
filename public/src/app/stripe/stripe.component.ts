import {
	Component,
	AfterViewInit,
	OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Output,
  Input,
  EventEmitter 
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from './../services/order.service';
@Component({
  moduleId: module.id,
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})

export class StripeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  @Input() basket: any;
  @Output() finishOrder = new EventEmitter()

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(private cd: ChangeDetectorRef, private orderService: OrderService) {}

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log( error);

    } else {
      // ...send the token to the your backend to process the charge
      this.orderService.createOrder(this.basket, token).subscribe(
      res => {
        this.finishOrder.emit(this.basket)

      },
      err => {
        console.log('something is wrong with payment')
      }
    );

    }
  }


}