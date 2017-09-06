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
// services
import { UserService } from './services/user.service';
//guards
import { UserAuthGuard } from './guards/user-auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';

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
    DashboardAdminComponent
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
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
