// File: dashboards/parent/health/services.ts
"use server";
  
import { FoodItem, AddFoodItemData } from './types';

// Dummy data for demonstration
const dummyFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Apple',
    quantity: '1 medium',
    mealType: 'breakfast',
    calories: 95,
    type: 'good',
    createdAt: new Date('2024-06-25'),
  },
  {
    id: '2',
    name: 'Banana',
    quantity: '1 large',
    mealType: 'breakfast',
    calories: 121,
    type: 'good',
    createdAt: new Date('2024-06-24'),
  },
  {
    id: '3',
    name: 'Chocolate Bar',
    quantity: '1 bar',
    mealType: 'lunch',
    calories: 235,
    type: 'bad',
    createdAt: new Date('2024-06-23'),
  },
  {
    id: '4',
    name: 'Grilled Chicken',
    quantity: '100g',
    mealType: 'dinner',
    calories: 165,
    type: 'good',
    createdAt: new Date('2024-06-22'),
  },
];

export async function getFoodItems(): Promise<FoodItem[]> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/parent/food-items');
    // return await response.json();
    
    // Return dummy data for now
    return dummyFoodItems;
  } catch (error) {
    console.error('Error fetching food items:', error);
    return [];
  }
}

export async function addFoodItem(data: AddFoodItemData): Promise<FoodItem | null> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/parent/food-items', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // return await response.json();
    
    // Simulate adding to dummy data
    const newItem: FoodItem = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
    };
    dummyFoodItems.push(newItem);
    return newItem;
  } catch (error) {
    console.error('Error adding food item:', error);
    return null;
  }
}

export async function updateFoodItem(id: string, data: AddFoodItemData): Promise<FoodItem | null> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/parent/food-items/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // return await response.json();
    
    // Simulate updating dummy data
    const index = dummyFoodItems.findIndex(item => item.id === id);
    if (index !== -1) {
      dummyFoodItems[index] = { ...dummyFoodItems[index], ...data };
      return dummyFoodItems[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating food item:', error);
    return null;
  }
}

export async function deleteFoodItem(id: string): Promise<boolean> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/parent/food-items/${id}`, {
    //   method: 'DELETE',
    // });
    // return response.ok;
    
    // Simulate deleting from dummy data
    const index = dummyFoodItems.findIndex(item => item.id === id);
    if (index !== -1) {
      dummyFoodItems.splice(index, 1);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting food item:', error);
    return false;
  }
}