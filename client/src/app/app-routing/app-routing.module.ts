import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent} from '../signup/signup.component';
import { SignupNextComponent} from '../signup-next/signup-next.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { ShoppingPageComponent } from '../shopping-page/shopping-page.component';
import { OrderComponent } from '../order/order.component';
import { AdminPageComponent } from '../admin-page/admin-page.component';
const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'signup-step1', component: SignupComponent},
  {path: 'signup-step2', component: SignupNextComponent},
  {path: 'admin-page', component: AdminPageComponent},
  {path: 'shopping', component: ShoppingPageComponent},
  {path: 'order-page', component: OrderComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
