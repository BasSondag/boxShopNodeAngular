import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { BasketComponent } from './basket/basket.component';

import { UserAuthGuard } from './guards/user-auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';

const routes: Routes = [
	{ path: '', pathMatch: 'full', component: WelcomeComponent}, 
	{ path: 'welcome', component: WelcomeComponent},
	{ path: 'register', component: RegisterFormComponent},
	{ path: 'login', component: LoginFormComponent},
	{ path: 'show_user', component: ShowUserComponent, canActivate: [UserAuthGuard]},
	{ path: 'dashboard', component: DashboardAdminComponent, canActivate: [AdminAuthGuard]},
	{ path: 'web_shop', component: ShowProductsComponent },
	{ path: 'basket', component: BasketComponent },

	// otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}