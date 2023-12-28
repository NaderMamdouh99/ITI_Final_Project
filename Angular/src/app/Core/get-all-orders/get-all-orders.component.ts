import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Icashier } from 'src/Interfaces/icashier';
import { IdeliveryBoy } from 'src/Interfaces/idelivery-boy';
import { Iorder, Status } from 'src/Interfaces/iorder';
import { OrderService } from 'src/Services/order.service';
import { UsersService } from 'src/Services/users.service';

@Component({
  selector: 'app-get-all-orders',
  templateUrl: './get-all-orders.component.html',
  styleUrls: ['./get-all-orders.component.css']
})
export class GetAllOrdersComponent {


  orders:Iorder[] =[]
  deliveryBoys:IdeliveryBoy[]=[]
  cashiers:Icashier[]=[]

  options: Status[] = [Status.Pending,Status.Accepting,Status.Rejected, Status.Complete];
  // options: Status[]=[0,1,2,3]
  selectedOption: Status =  Status.Pending ; // To store the selected option

    //1-inject api services
  constructor(private orderservice:OrderService ,private cookie:CookieService,private userservice:UsersService){}
  
     //connect with api using  api service
    ngOnInit(): void {
     //2-subscribe
     this.orderservice.getAll().subscribe({
      // three callback functions   
      next:(data)=>{
        this.orders = data
        console.log(data);
        
      },
      error:(err)=>console.log('Error:' +err),
      complete:()=>{}
     });  

     //get all delivery
     this.orderservice.getAllDeliveryBoy().subscribe({
      // three callback functions   
      
      next:(data)=>{
        this.deliveryBoys = data;
        console.log(data[0]);
        
      },
      error:(err)=>console.log('Error:' +err),
      complete:()=>{}
     });  



     //get all cashiers
     this.orderservice.getAllcashier().subscribe({
      // three callback functions   
      next:(data)=>{
        this.cashiers = data;
          console.log(data);
          
          
          
      },
      error:(err)=>console.log('Error:' +err),
      complete:()=>{}
     });  

    }

  
//enum status
    getStatusLabel(status: Status): string { 
      switch (status) {
        case Status.Pending:
          return 'pending';
        case Status.Accepting:
          return 'accepted';
        case Status.Rejected:
          return 'rejected';
        case Status.Complete:
          return 'complete';
        
      }
  }

  updateOrderStatus(orderId: number, newStatus: Status): void {
    console.log(newStatus);
    
    this.orderservice.updateStatus(orderId, newStatus).subscribe({
      next: (updatedOrder) => {
        // Handle the updated order if needed
        console.log('Order status updated:', updatedOrder);
      },

      error: (err) => console.error('Error updating order status:', err),
      complete: () => console.log('Update complete'),
    });
  }


  updateOrderDeliveryBoy(orderId:number,deliveryId:number){

    this.orderservice.updateDeleiveryBoy(orderId, deliveryId).subscribe({
      next: (updateDelivery) => {
        // Handle the updated order if needed
        console.log('Order status updated:', updateDelivery);
      },

      error: (err) => console.error('Error updating order status:', err),
      complete: () => console.log('Update complete'),
    });
  }

  //cashier
  updateOrderCashier(orderId:number,cashierId:number){

    this.orderservice.updateCashier(orderId, cashierId).subscribe({
      next: (updatedCashier) => {
        // Handle the updated order if needed
        console.log('Order status updated:', updatedCashier);
      },

      error: (err) => console.error('Error updating order status:', err),
      complete: () => console.log('Update complete'),
    });
  }


  GetDetail(orderid:number){

    this.orderservice.getOderDetail(orderid).subscribe((data)=>{
      console.log(data);
      
    })
  }
}
