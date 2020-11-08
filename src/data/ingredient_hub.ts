export enum IngredientType {
    breadTop = "breadTop",
    breadBottom = "breadBottom",
    meat = "meat",
    cheese = "cheese",
    salad = "salad",
    bacon = "bacon",
}
interface IIngredientHub{
    [index:string]:{label:string,price:number,type:IngredientType}
}
const ingredientHub:IIngredientHub = {
    [IngredientType.meat]:{label: "Meat",price: 34,type:IngredientType.meat},
    [IngredientType.cheese]:{label: "Cheese",price: 10,type:IngredientType.cheese},
    [IngredientType.salad]:{label: "Salad",price: 2,type:IngredientType.salad},
    [IngredientType.bacon]:{label: "Bacon",price: 89,type:IngredientType.bacon}
}

export default ingredientHub;