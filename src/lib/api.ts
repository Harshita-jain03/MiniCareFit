// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;


const API_URLS = {
  STUDENT_REGISTER:{
    CREATE:`${BASE_URL}/users/users/`,
    GET_ALL:`${BASE_URL}/users/users/`,
    // UPDATE:`${BASE_URL}/users/users/{id}`,
    UPDATE : (id: string | number) => `${BASE_URL}/users/users/${id}/`, 
  
  
  },// backend endpoint
  PARENT_REGISTER:{
    CREATE:`${BASE_URL}/users/users/`,
    GET_ALL:`${BASE_URL}/users/users/`,
    

    UPDATE : (id: string | number) => `${BASE_URL}/users/users/${id}/`, 
    // UPDATE:`${BASE_URL}/users/users/{id}`

  },
  TODO : {
    TASKS:`${BASE_URL}/todo/todo-tasks/`,
    CREATE:`${BASE_URL}/todo/todo-tasks/`,
    GET_ALL:`${BASE_URL}/todo/todo-tasks/`,
  },

  USER: {
    GET_ME:`${BASE_URL}/users/me/`
  },

  HEALTH: {
    GET_ALL:`${BASE_URL}/health/food-items/`,
    FOOD_LOGS:`${BASE_URL}/health/food-logs/`,
    FOOD_SUMMARY:`${BASE_URL}/health/food-summary/`
  },

  REWARDS: {
    GET_ALL: `${BASE_URL}/reward/rewards/ `,
    REDEEM: `${BASE_URL}/reward/redemptions/ `
  }

};

export default API_URLS;
