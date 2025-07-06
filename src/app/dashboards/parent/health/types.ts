export interface FoodItem {
    id: string;
    name: string;
    quantity: string;
    mealType: 'breakfast' | 'lunch' | 'dinner';
    calories: number;
    type: 'good' | 'bad';
    createdAt: Date;
  }
  
  export interface AddFoodItemData {
    name: string;
    quantity: string;
    mealType: 'breakfast' | 'lunch' | 'dinner';
    calories: number;
    type: 'good' | 'bad';
  }
  
  