import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MarketService } from './market.service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SignupNextComponent } from './signup-next/signup-next.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { DialogErrorRegComponent } from './dialog-error-reg/dialog-error-reg.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AdComponent } from './ad/ad.component';
import { AboutComponent } from './about/about.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { OrderComponent } from './order/order.component';
import { DialogAdditemComponent } from './dialog-additem/dialog-additem.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { ProductMarkerPipe } from './product-marker.pipe';
import { DialogSuccesBuyingComponent } from './dialog-succes-buying/dialog-succes-buying.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminEditFormComponent } from './admin-edit-form/admin-edit-form.component';
import { AdminGroceryComponent } from './admin-grocery/admin-grocery.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ToolbarComponent,
    SignupNextComponent,
    NotFoundComponent,
    DialogErrorRegComponent,
    HomePageComponent,
    LoginComponent,
    AdComponent,
    AboutComponent,
    ShoppingPageComponent,
    OrderComponent,
    DialogAdditemComponent,
    OrderSummaryComponent,
    OrderFormComponent,
    ProductMarkerPipe,
    DialogSuccesBuyingComponent,
    AdminPageComponent,
    AdminEditFormComponent,
    AdminGroceryComponent
  ],
  entryComponents: [DialogErrorRegComponent, DialogAdditemComponent, DialogSuccesBuyingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MarketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
