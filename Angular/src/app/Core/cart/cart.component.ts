import { Component, Type } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Imeal } from 'src/Interfaces/imeal';
import { CartService } from 'src/Services/cart.service';
import { ExtraService } from 'src/Services/extra.service';
import { MealService } from 'src/Services/meal.service';
import { OffersService } from 'src/Services/offers.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  // counterarray:number[]=[];
  // QuantityById:number[]=[];
  
  meals:Imeal[] =[];
  TotalPrice:number = 0;
     // products:Observable<IProduct[]> =[];
  mealsandq:{meal:{id:number;name:string;details:string;price:number;photo:string;type:string}; quantity:number}[]=[]
   //1-inject api services
  constructor(private mealervice:MealService,private extreserv:ExtraService,private offerserv:OffersService ,private cartService: CartService , private cookie :CookieService ){}
  

     //connect with api using  api service
    ngOnInit(): void {
     
      // this.QuantityById=[];
 
      if(this.cookie.get('cartItems')){
        let cartItems: { mealId: number; quantity: number }[] = JSON.parse(this.cookie.get('cartItems')) || [];
       
        cartItems.forEach((data)=>{
         
          // this.QuantityById.push(data.quantity);
        
               this. mealervice.getById(data.mealId).subscribe((input)=>{
                
                if(input.discount>0){input.price=input.discount}
                this.TotalPrice+= data.quantity * input.price
              const x={id:input.id,name:input.name,details:input.details,price:input.price,photo:input.photo,type:"meal"}
                this.mealsandq.push({meal:x,quantity:data.quantity});}
       
              );      
            })    
           
      }
      if(this.cookie.get('offerItems')){
        let cartItems: { offerId: number; quantity: number }[] = JSON.parse(this.cookie.get('offerItems')) || [];
       
        cartItems.forEach((data)=>{
         
          // this.QuantityById.push(data.quantity);
        
               this. offerserv.getById(data.offerId).subscribe((input)=>{
                

                this.TotalPrice+= data.quantity * input.price
                const x={id:input.id,name:input.name,details:input.details,price:input.price,photo:input.photo,type:"offer"}

                this.mealsandq.push({meal:x,quantity:data.quantity});}
       
              );      
            })    
           
      }

if(this.cookie.get('extra')){
  let cartItems:  { id: number; amount: number }[] = JSON.parse(this.cookie.get('extra')) || [];
       
  cartItems.forEach((data)=>{
    this.extreserv.getbyid(data.id).subscribe((d)=>
    {
     
      
      this.TotalPrice+=d.price*data.amount
    }
    
    )

  })

}





    }




  BlusToArray(Id:number,type:string){
   
     
      // var index=0;
       
      if(this.cookie.get('cartItems')&&type=="meal"){
        let cartItems: { mealId: number; quantity: number }[] = JSON.parse(this.cookie.get('cartItems')) || [];
        const existingItem = cartItems.find((item) => item.mealId === Id);
         

        this.mealsandq.filter((item) =>{
          if(item.meal.id === Id&&item.meal.type=="meal"){
            item.quantity++;
            this.TotalPrice += item.meal.price
          }
        } )
       
         
       
        if ( existingItem ) {
          // If the meal is already in the cart, increase its quantity
         
            existingItem.quantity ++;
            // this.QuantityById[index] --;
       
        }  
        
        // Save the updated cart items back to cookies
        this.cookie.set('cartItems', JSON.stringify(cartItems));

      } 

      if(this.cookie.get('offerItems')&&type=="offer"){
        let cartItems: { offerId: number; quantity: number }[] = JSON.parse(this.cookie.get('offerItems')) || [];
        const existingItem = cartItems.find((item) => item.offerId == Id);
         

        this.mealsandq.filter((item) =>{
          if(item.meal.id == Id&&item.meal.type=="offer"){
            item.quantity++;
            this.TotalPrice += item.meal.price
          }
        } )
       
         
       
        if ( existingItem ) {
          // If the offer is already in the cart, increase its quantity
         
         
            existingItem.quantity ++;
            // this.QuantityById[index] --;
      
      
            
          
       
        }  
        
        // Save the updated cart items back to cookies
        this.cookie.set('offerItems', JSON.stringify(cartItems));


    }
     
    }
    MinusToArray(Id:number,type:string){
      
    
      
      if(this.cookie.get('cartItems')&&type=="meal"){
        let cartItems: { mealId: number; quantity: number }[] = JSON.parse(this.cookie.get('cartItems')) || [];
        const existingItem = cartItems.find((item) => item.mealId === Id);
         

        this.mealsandq.filter((item) =>{
          if(item.meal.id === Id&&item.meal.type=="meal"){
            item.quantity--;
            this.TotalPrice -= item.meal.price
          }
        } )
       
         
       
        if ( existingItem ) {
          // If the meal is already in the cart, increase its quantity
          if(existingItem.quantity> 1){
            existingItem.quantity --;
            // this.QuantityById[index] --;
            
          }
       
        }  
        
        // Save the updated cart items back to cookies
        this.cookie.set('cartItems', JSON.stringify(cartItems));

      } 

      if(this.cookie.get('offerItems')&&type=="offer"){
        let cartItems: { offerId: number; quantity: number }[] = JSON.parse(this.cookie.get('offerItems')) || [];
        const existingItem = cartItems.find((item) => item.offerId == Id);
         

        this.mealsandq.filter((item) =>{
          if(item.meal.id == Id&&item.meal.type=="offer"){
            item.quantity--;
            this.TotalPrice -= item.meal.price
          }
        } )
       
         
       
        if ( existingItem ) {
          // If the offer is already in the cart, increase its quantity
      
          if(existingItem.quantity> 1){
            existingItem.quantity --;
            // this.QuantityById[index] --;
      
      
            
          }
       
        }  
        
        // Save the updated cart items back to cookies
        this.cookie.set('offerItems', JSON.stringify(cartItems));


    }
  }


    deleteMeal(Id:number,type:string){
      if(this.cookie.get('cartItems')&&type=="meal"){
        let cartItems: { mealId: number; quantity: number }[] = JSON.parse(this.cookie.get('cartItems')) || [];
        const existingItem = cartItems.find((item) => item.mealId === Id);

        if(existingItem){
       
          var result = confirm("Are you delete this item ?? ")
              if(result){
                this.mealsandq.filter((item) =>{
                  if(item.meal.id === Id&&item.meal.type){
                    item.quantity--;
                    this.TotalPrice -= item.meal.price*existingItem.quantity
                  }

                } )
                
                cartItems = cartItems.filter(item => item.mealId !== existingItem.mealId);
                 
                this.mealsandq = this.mealsandq.filter((item) => item.meal.id != existingItem.mealId||item.meal.type!="meal");
                if(cartItems.length>0)
                this.cookie.set('cartItems', JSON.stringify(cartItems));
              else this.cookie.delete('cartItems');
            } } 
  }

  if(this.cookie.get('offerItems')&&type=="offer"){
    console.log(type);
    
    let cartItems: { offerId: number; quantity: number }[] = JSON.parse(this.cookie.get('offerItems')) || [];
    const existingItem = cartItems.find((item) => item.offerId == Id);
    if(existingItem){
      var result = confirm("Are you delete this item ?? ")
          if(result){
            this.mealsandq.filter((item) =>{
              if(item.meal.id === Id&&item.meal.type=="offer"){
                item.quantity--;
                this.TotalPrice -= item.meal.price*existingItem.quantity
              }
            } )
            cartItems = cartItems.filter(item => item.offerId != existingItem.offerId);
            this.mealsandq = this.mealsandq.filter(item => item.meal.id !== existingItem.offerId||item.meal.type!="offer");
            if(cartItems.length>0)
            this.cookie.set('offerItems', JSON.stringify(cartItems));
          else this.cookie.delete('offerItems');
        } }
       }
  }

  sendOrder(){
    if(this.cookie.get('account').valueOf()){
    // after sending order => delete cart
    let mealsItems: { MealId: number; Quantity: number }[]=[];
    let offersItems: { OfferId: number; Quantity: number }[] = [];
    let extrasItems: {id: number; Quantity: number }[] =  [];
    let account = JSON.parse(this.cookie.get('account').valueOf())||[] ;
    
if (!this.cookie.get('cartItems')) {
  mealsItems.push({ MealId: -1, Quantity: 0 })
}
else
{mealsItems = JSON.parse(this.cookie.get('cartItems'))}

if (!this.cookie.get('offerItems') ) {
  offersItems.push({ OfferId: -1, Quantity: 0 })
}
else{
 offersItems= JSON.parse(this.cookie.get('offerItems')) 
}

if (!this.cookie.get('extra')) {
  extrasItems.push({ id: -1, Quantity: 0 })
}
else{
  extrasItems=JSON.parse(this.cookie.get('extra'))
}


if (this.cookie.get('offerItems')||this.cookie.get('cartItems')){
              
        this.cartService.createOrder({
          Mealord:mealsItems,
          Offerord:offersItems,
          Extraord:extrasItems,
          CustumerEmail:account[1]}).subscribe(
        {
      next:(data)=>{console.log(data)},
      error:(e)=>{console.log(e);
           }
        }
        )
      }
    }
  }
  
    change(event:number){
    this.TotalPrice+=event;
  }
}