export interface Drink {
    Id: number;
    Name: string;
    Price: number;
    Image?: string;
    Description?: string;
  }
  
export interface Category {
    categoryId: number;
    Name: string;
    BackgroundImage: string;
    Drinks: Drink[];
  }
  
export interface Company {
    Name: string
    Email: string;
    Password: string;
    MenuThemeColor: string;
    CategoryTitleColor: string;
    CategoryTextTitleColor: string;
    HeaderTextColor: string;
    HeaderImage: string;
    CompanyLogo: string;
    Categories: Category[];
  }

export const BASE_URL = 'http://localhost:5119/api'