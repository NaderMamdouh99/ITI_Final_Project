export interface Iorder { 
    id: number;
    orderDate: Date;
    deliveryTime: Date;
    orderPrice: number;
    status: Status; // You need to define the Status enum in Angular as well
    customerId: number;
    cashierId: number;
    deliveryBoyId: number; 
}



export enum Status {
  
    Pending = 0,
    Accepting = 1,
    Rejected = 2,
    Complete = 3,
    
  }
  
  export interface UpdateOrderStatusModel {
    status: Status;
  }
  /*
     pending, accepted, regjected, complete*/