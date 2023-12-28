import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Core/login/login.component';
import { SginupComponent } from './Core/sginup/sginup.component';
import { AboutComponent } from './Core/about/about.component';
import { HomeComponent } from './Core/home/home.component';
import { MenuComponent } from './Core/menu/menu.component';
import { ContactComponent } from './Core/contact/contact.component';
import { OrdersComponent } from './Core/orders/orders.component';
import { OfferComponent } from './Core/offers/offer/offer.component';
import { OfferDetailsComponent } from './Core/offers/offer-details/offer-details.component';
import { OfferAdminComponent } from './Core/offers/offer-admin/offer-admin.component';
import { OfferFormComponent } from './Core/offers/offer-form/offer-form.component';
import { CustomerComponent } from './Core/customer/customer.component';
import { CartComponent } from './Core/cart/cart.component';
import { MealAdminComponent } from './Core/Meals/meal-admin/meal-admin.component';
import { MealFormComponent } from './Core/Meals/meal-form/meal-form.component';
import { ExtraAdminComponent } from './Core/Extra/extra-admin/extra-admin.component';
import { ExtraDetailsComponent } from './Core/Extra/extra-details/extra-details.component';
import { ExtraFormComponent } from './Core/Extra/extra-form/extra-form.component';
import { ExtraComponent } from './Core/Extra/extra/extra.component';
import { AdminComponent } from './Core/admin/admin.component';
import { CashierComponent } from './Core/cashier/cashier.component';
import { adminauthenticationGuard } from 'src/guard/adminauthentication.guard';
import { cashierauthenticationGuard } from 'src/guard/cashierauthentication.guard';
import { MealComponent } from './Core/Meals/meal/meal.component';
import { MealupdateComponent } from './Core/Menu update/mealupdate/mealupdate.component';
import { OfferupdateComponent } from './Core/Menu update/offerupdate/offerupdate.component';
import { MealdetailsComponent } from './Core/Meals/mealdetails/mealdetails.component';
import { CashierFormComponent } from './Core/cashier-form/cashier-form.component';
import { CashiersComponent } from './Core/cashiers/cashiers.component';
import { DeliveryBoyComponent } from './Core/delivery-boy/delivery-boy.component';
import { DeliveryFormComponent } from './Core/delivery-form/delivery-form.component';
import { GetAllOrdersComponent } from './Core/get-all-orders/get-all-orders.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Home',component:HomeComponent},
  {path:'Menu',component:MenuComponent},
  {path:'contact',component:ContactComponent},
  {path:'orders',component:OrdersComponent},
  {path:'login',component:LoginComponent},
  {path:'Signup',component:SginupComponent},
  {path:'about',component:AboutComponent},
  {path:'offer',component:OfferComponent},
  {path:'offer/details/:id',component:OfferDetailsComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'offer/admin',component:OfferAdminComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'offer/new',component:OfferFormComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'offer/edit/:id',component:OfferFormComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'customer',component:CustomerComponent,canActivate:[adminauthenticationGuard]},
  {path:'cart',component:CartComponent},
  {path:'meal',component:MealComponent},
  {path:'meals',component:MealAdminComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'meals/edit/:id',component:MealFormComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'meals/new',component:MealFormComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'meals/details/:id',component:MealdetailsComponent},
  {path:'extra',component:ExtraComponent},
  {path:'extras',component:ExtraAdminComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'extra/details/:id',component:ExtraDetailsComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'extra/create',component:ExtraFormComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'extra/edit/:id',component:ExtraFormComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'admin',component:AdminComponent,canActivate:[adminauthenticationGuard]},
  {path:'cashier',component:CashierComponent,canActivateChild:[adminauthenticationGuard,cashierauthenticationGuard]},
  {path:'cashier/new',component:CashierFormComponent},
  {path:'cashier/edit/:email',component:CashierFormComponent},
  {path:'cashiers',component:CashiersComponent},
  {path:'deliverys',component:DeliveryBoyComponent},
  {path:'delivery/new',component:DeliveryFormComponent},
  {path:'ordersdata',component:GetAllOrdersComponent},





  {path:'mealupdate',component:MealupdateComponent},
  {path:'offerupdate',component:OfferupdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
