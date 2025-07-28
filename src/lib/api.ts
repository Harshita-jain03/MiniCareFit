// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;


const API_URLS = {
  STUDENT_REGISTER:{
    CREATE:`${BASE_URL}/users/users/`,
  
  
  },// backend endpoint
  PARENT_REGISTER:{
    CREATE:`${BASE_URL}/users/users/`,
  }

};

export default API_URLS;
