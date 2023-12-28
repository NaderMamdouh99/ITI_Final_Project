export interface Icart {

    Mealord:{ MealId: number; Quantity: number }[],
    Offerord:{ OfferId: number; Quantity: number }[],
    Extraord:{ id: number; Quantity: number }[],
    CustumerEmail:string|undefined

}