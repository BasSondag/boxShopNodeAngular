// imprts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap';
// components
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterFormComponent } from './register-form/register-form.component';
// services
import { UserService } from './services/user.service';
import { FooterComponent } from './footer/footer.component'

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ShowUserComponent,
    WelcomeComponent,
    NavbarComponent,
    RegisterFormComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    CollapseModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
