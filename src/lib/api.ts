// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
console.log(">>>",BASE_URL)


const API_URLS = {

 
  LOGIN: "http://localhost:8000/users/api/token/",
  REFRESH: "http://localhost:8000/users/api/token/refresh/",
  USER_LIST: "http://localhost:8000/users/users/",

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

  FOOD_LOGS: {
    GET_ALL:`${BASE_URL}/health/food-logs/`,
    CREATE: `${BASE_URL}/health/food-logs/`
    // FOOD_LOGS:`${BASE_URL}/health/food-logs/`,
    // FOOD_SUMMARY:`${BASE_URL}/health/food-summary/`
  },

  REWARDS: {
    GET_ALL: `${BASE_URL}/reward/rewards/`,
    REDEEM: `${BASE_URL}/reward/redemptions/`,
    REDEMPTIONS: `${BASE_URL}/reward/redemptions/`,
    BALANCE: `${BASE_URL}/reward/balance/`,
  },

  PARENT_CHILD_MAPPING: {
    CREATE: `${BASE_URL}/users/parent-child-mappings/`,
    GET_ALL: `${BASE_URL}/users/parent-child-mappings/`,
  },
  
  USERS : {
    GET_ALL : `${BASE_URL}/users/users/`
  },

  FOOD_ITEMS : {
    CREATE : `${BASE_URL}/health/food-items/`,
    GET_ALL : `${BASE_URL}/health/food-items/`
  }

};

export default API_URLS;
