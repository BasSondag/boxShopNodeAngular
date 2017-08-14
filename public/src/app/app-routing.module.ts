import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ShowUserComponent } from './show-user/show-user.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', component: WelcomeComponent}, 
	{ path: 'welcome', component: WelcomeComponent},
	{ path: 'register', component: RegisterFormComponent},
	{ path: 'login', component: LoginFormComponent},
	{ path: 'show_user', component: ShowUserComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}