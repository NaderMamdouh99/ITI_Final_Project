import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { LoginComponent } from './Core/login/login.component';
import { SginupComponent } from './Core/sginup/sginup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './Core/about/about.component';
import { HomeComponent } from './Core/home/home.component';
import { MenuComponent } from './Core/menu/menu.component';
import { ContactComponent } from './Core/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { OrdersComponent } from './Core/orders/orders.component';
import { MealComponent } from './Core/Meals/meal/meal.component';
import { OfferComponent } from './Core/offers/offer/offer.component';
import { OfferAdminComponent } from './Core/offers/offer-admin/offer-admin.component';
import { OfferDetailsComponent } from './Core/offers/offer-details/offer-details.component';
import { OfferFormComponent } from './Core/offers/offer-form/offer-form.component';
import { CookieService } from 'ngx-cookie-service';
import { CustomerComponent } from './Core/customer/customer.component';
import { CartComponent } from './Core/cart/cart.component';
import { MealAdminComponent } from './Core/Meals/meal-admin/meal-admin.component';
import { MealFormComponent } from './Core/Meals/meal-form/meal-form.component';
import { ExtraComponent } from './Core/Extra/extra/extra.component';
import { ExtraAdminComponent } from './Core/Extra/extra-admin/extra-admin.component';
import { ExtraDetailsComponent } from './Core/Extra/extra-details/extra-details.component';
import { ExtraFormComponent } from './Core/Extra/extra-form/extra-form.component';
import { CashierFormComponent } from './Core/cashier-form/cashier-form.component';
import { DeliveryBoyComponent } from './Core/delivery-boy/delivery-boy.component';
import { DeliveryFormComponent } from './Core/delivery-form/delivery-form.component';
import { AdminComponent } from './Core/admin/admin.component';
import { AsideComponent } from './Shared/aside/aside.component';
import { CashierComponent } from './Core/cashier/cashier.component';
import { MealupdateComponent } from './Core/Menu update/mealupdate/mealupdate.component';
import { OfferupdateComponent } from './Core/Menu update/offerupdate/offerupdate.component';
import { MealdetailsComponent } from './Core/Meals/mealdetails/mealdetails.component';
import { CashiersComponent } from './Core/cashiers/cashiers.component';
import { GetAllOrdersComponent } from './Core/get-all-orders/get-all-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    SginupComponent,
    AboutComponent,
    HomeComponent,
    MenuComponent,
    ContactComponent,
    OrdersComponent,
    MealComponent,
    OfferComponent,
    OfferAdminComponent,
    OfferDetailsComponent,
    OfferFormComponent,
    CustomerComponent,
    CartComponent,
    MealAdminComponent,
    MealFormComponent,
    ExtraComponent,
    ExtraAdminComponent,
    ExtraDetailsComponent,
    ExtraFormComponent,
    CashierComponent,
    CashierFormComponent,
    DeliveryBoyComponent,
    DeliveryFormComponent,
    AdminComponent,
    AsideComponent,
    MealupdateComponent,
    OfferupdateComponent,
    MealdetailsComponent,
    CashiersComponent,
    GetAllOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
 
    
   
  
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
