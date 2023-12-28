import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Iextra } from 'src/Interfaces/iextra';
import { ExtraService } from 'src/Services/extra.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css']
})
export class ExtraComponent implements OnInit{

  Extra:Iextra[]|undefined;
 
  @Output() totalpr:EventEmitter<number> = new EventEmitter<number>();
  
  total:number=0;
  extra:{data:Iextra,amount:number}[]=[];
 
 constructor(private extraService:ExtraService,private cookie:CookieService){}
  ngOnInit(): void {
   let getdata:{id:number,amount:number}[];
   
     if(this.cookie.get('extra'))
       getdata=JSON.parse(this.cookie.get('extra'))||[]
      
    this.extraService.getall().subscribe({
      next:(extradata) => {extradata.forEach(extradata1=>{
  
  if(getdata){
  
    getdata.find(d=>{
      if(d.id==extradata1.id){
        
        this.extra.push({data:extradata1,amount:d.amount})
                   }
              } 
              );
  }
        if(this.extra.length==0||this.extra[this.extra.length-1].data.id!=extradata1.id)
          {
             this.extra.push({data:extradata1,amount:0})
          }
          
          
          }

        )},
      error:(err) => {console.log(err)},
      complete:() => {}
    }
      )
    
 
  
    }


    minus(Id:number){
      if (this.cookie.get('extra')) {
        let cartItems: { id: number; amount: number }[] = JSON.parse(this.cookie.get('extra')) || [];
        const existingItem = cartItems.find((item) => item.id === Id);
         
      
        if (existingItem) {
          this.extra.filter((item) =>{
            if(item.data.id === Id){
              if(item.amount>=1)
             { item.amount--;   
              existingItem.amount--;
              this.totalpr.emit(item.data.price*-1);
            }
            else {
             cartItems=cartItems.filter((data)=>data.id!=existingItem.id)
            } 
            }
          } )
      
          if(cartItems.length>0)
          this.cookie.set('extra', JSON.stringify(cartItems));
      else
      this.cookie.delete('extra')
        }
        
        
      }
      
                
    }

plus(Id:number){

if (this.cookie.get('extra')) {
  let cartItems: { id: number; amount: number }[] = JSON.parse(this.cookie.get('extra')) || [];
  const existingItem = cartItems.find((item) => item.id === Id);
   

  if (existingItem) {
    this.extra.filter((item) =>{
      if(item.data.id === Id){
        item.amount++;    
        this.totalpr.emit(item.data.price);   
      }
    } )

    existingItem.amount++;
 

  }else{
 
  this.extra.filter((item) =>{
  if(item.data.id === Id){
    item.amount++;      
  }

} )
cartItems.push({id:Id,amount:1})


  }
  this.cookie.set('extra', JSON.stringify(cartItems));  
  
}
else{

let x:{id:number,amount:number}[]=[];
x.push({id:Id,amount:1})
this.extra.filter((item) =>{
  if(item.data.id === Id){
    item.amount++;    
    
this.totalpr.emit(item.data.price);  
  }
} 
)
this.cookie.set('extra', JSON.stringify(x));

}

}


}


