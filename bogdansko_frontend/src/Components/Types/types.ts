export interface Drink {
    id: number;
    name: string;
    price: number;
    image?: string;
    description?: string;
  }
  
export interface Category {
    id: number;
    name: string;
    backgroundImage: string;
    drinks: Drink[];
  }
  
export interface Company {
    id: number
    name: string
    email: string;
    password: string;
    menuThemeColor: string;
    categoryTitleColor: string;
    categoryTextTitleColor: string;
    headerTextColor: string;
    headerImage: string;
    companyLogo: string;
  }

export const BASE_URL = 'http://localhost:5119/api'