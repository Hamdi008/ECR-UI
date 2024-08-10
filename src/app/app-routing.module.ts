import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './AuthGuard/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/signIn', pathMatch: 'full' },  // Default path
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path:"signUp", component:SignUpComponent},
  {path: "signIn", component:SignInComponent},
  { path: '**', component: NotFoundComponent }  // Wildcard route for a 404 page
  
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
