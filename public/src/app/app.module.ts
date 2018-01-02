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
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { UpdateProductFormComponent } from './update-product-form/update-product-form.component';
import { AlertsComponent } from './alerts/alerts.component';
import { BasketComponent } from './basket/basket.component';

// services
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { AlertService } from './services/alert.service';
import { BasketService } from './services/basket.service';
import { OrderService } from './services/order.service';

//guards
import { UserAuthGuard } from './guards/user-auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { StripeComponent } from './stripe/stripe.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ShowUserComponent,
    WelcomeComponent,
    NavbarComponent,
    RegisterFormComponent,
    FooterComponent,
    LoginFormComponent,
    DashboardAdminComponent,
    ShowProductsComponent,
    ProductFormComponent,
    UpdateProductFormComponent,
    AlertsComponent,
    BasketComponent,
    StripeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    CollapseModule
  ],
  providers: [
    UserService,
    UserAuthGuard,
    ProductService,
    OrderService,
    AlertService,
    BasketService,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
