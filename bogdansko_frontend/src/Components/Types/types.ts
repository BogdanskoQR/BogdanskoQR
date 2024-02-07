export interface Drink {
    drinkId: number;
    drinkName: string;
    drinkPrice: number;
    drinkImg?: string;
    drinkDescription?: string;
  }
  
export interface Category {
    categoryId: number;
    categoryName: string;
    categoryBackgroundImg: string;
    categoryDrinks: Drink[];
  }
  
export interface Company {
    companyEmail: string;
    companyPassword: string;
    menuThemeColor: string;
    categoryTitleBackgroundColor: string;
    categoryTextTitleColor: string;
    headerTextColor: string;
    headerImage: string;
    menu: Category[];
  }

export const BASE_URL = 'http://localhost:5119/api'