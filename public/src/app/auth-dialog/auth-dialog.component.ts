import { Component, OnInit, Input, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {
	  @Input('auth-mode') authMode: 'login' | 'register' = 'login';
  
  constructor() { }

  ngOnInit() {
  }

}
