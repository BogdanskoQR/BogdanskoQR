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
    view?: string;
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
    categories: Category[]
  }

export const BASE_URL = 'http://localhost:5119/api'

const drinks1: Drink[] = [
  {
    id: 1,
    name: "Coffee",
    price: 100,
    image: "https://www.acouplecooks.com/wp-content/uploads/2021/05/Latte-Art-066.jpg",
    description: "A classic hot beverage made from roasted coffee beans.",
  },
  {
    id: 2,
    name: "Latte",
    price: 120,
    image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s-368x368.jpg",
    description: "A creamy espresso-based coffee drink.",
  },
  {
    id: 1,
    name: "Coffee",
    price: 90,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXt7G3tow_itqDdTp2UPh5Oms4yUJFTyUGmQ&usqp=CAU",
    description: "A classic hot beverage made from roasted coffee beans.",
  },
  {
    id: 2,
    name: "Latte",
    price: 70,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr6hrOGcH6VCuO8oEG0EfOGIzo1YBMueQwx7Cr0297LsBQ49R1gfj6eR-84c9Nz2M2aX4&usqp=CAU",
    description: "A creamy espresso-based coffee drink.",
  },
  {
    id: 1,
    name: "Coffee",
    price: 80,
    image: "https://hips.hearstapps.com/hmg-prod/images/coffee-quotes-index-1625108399.jpg?crop=0.752xw:1.00xh;0.149xw,0&resize=640:*",
    description: "A classic hot beverage made from roasted coffee beans.",
  },
  {
    id: 2,
    name: "Latte",
    price: 140,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdyidvvIn-QJUYGmjxDdZW1KW93rZ-0Rxfrx4T4fXEz8ixw1yphKBkSR_dqg4aClq2O5o&usqp=CAU",
    description: "A creamy espresso-based coffee drink.",
  },
];

const drinks2: Drink[] = [
  {
    id: 3,
    name: "Tea",
    price: 100,
    image: "data:image/jpeg;base64,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",
    description: "A refreshing beverage made from steeping tea leaves in hot water.",
  },
  {
    id: 4,
    name: "Iced Tea",
    price: 120,
    image: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/01/hot-tea-steaming-steeping-1296-728-header.jpg?w=1155&h=1528",
    description: "Chilled tea served with ice cubes.",
  },
];

const drinks3: Drink[] = [
  {
    id: 1,
    name: "Berry Blast",
    price: 100,
    image: "https://www.acouplecooks.com/wp-content/uploads/2020/05/Berry-Smoothie-011.jpg",
    description: "A thick, creamy beverage made from blended fruits and other ingredients."
  },
  {
    id: 2,
    name: "Mango Tango",
    price: 100,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPduLx4czoMAOMGuWonupOFQFw5byRGzptA&usqp=CAU",
    description: "A thick, creamy beverage made from blended fruits and other ingredients."
  },
  {
    id: 3,
    name: "Tropical Paradise",
    price: 100,
    image: "https://www.acouplecooks.com/wp-content/uploads/2020/05/Berry-Smoothie-011.jpg",
    description: "A thick, creamy beverage made from blended fruits and other ingredients."
  },
  {
    id: 4,
    name: "Blueberry Delight",
    price: 100,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPduLx4czoMAOMGuWonupOFQFw5byRGzptA&usqp=CAU",
    description: "A thick, creamy beverage made from blended fruits and other ingredients."
  },
  {
    id: 5,
    name: "Strawberry Sunrise",
    price: 100,
    image: "https://www.acouplecooks.com/wp-content/uploads/2020/05/Berry-Smoothie-011.jpg",
    description: "A thick, creamy beverage made from blended fruits and other ingredients."
  },
  {
    id: 6,
    name: "Pineapple Punch",
    price: 100,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPduLx4czoMAOMGuWonupOFQFw5byRGzptA&usqp=CAU",
    description: "A thick, creamy beverage made from blended fruits and other ingredients."
  },
  {
    id: 7,
    name: "Kiwi Kiss",
    price: 100,
    image: "https://www.acouplecooks.com/wp-content/uploads/2020/05/Berry-Smoothie-011.jpg",
    description: "A thick, creamy beverage made from blended fruits and other ingredients."
  },
  {
    id: 8,
    name: "Citrus Splash",
    price: 100,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPduLx4czoMAOMGuWonupOFQFw5byRGzptA&usqp=CAU",
    description: "A thick, creamy beverage made from blended fruits and other ingredients."
  },
  {
    id: 9,
    name: "Raspberry Refresher",
    price: 100,
    image: "https://www.acouplecooks.com/wp-content/uploads/2020/05/Berry-Smoothie-011.jpg",
    description: "A thick, creamy beverage made from blended fruits and other ingredients."
  }
];


const drinks4: Drink[] = [
  {
    id: 6,
    name: "Water",
    price: 140,
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTBhUREhIQFRITFhcTFRMTFxcVFxASFRkWFxURFRMZHSggGBoqHRYYITEhJSkrLi4uGR8zODMtNygtLisBCgoKDg0OGxAQGSslHx44LS03LSs3LTcrLS0vLTUrLSsvNi0uLS0vKy0tLS0tLS0tLS0tLTUtLS01LjU4Ny0tNP/AABEIAOAA4AMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAgMGB//EADwQAAIBAgIGBggDCAMAAAAAAAABAgMRBCESMUFRYXEFIiOBkaETJDSxwcLR8BQy8RUlQlJicoKyMzWS/8QAGAEBAAMBAAAAAAAAAAAAAAAAAAECAwT/xAAhEQEAAgICAQUBAAAAAAAAAAAAAQIDESExEjJBgbHBkf/aAAwDAQACEQMRAD8A+0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3kQ62NaeSJVRP0bSte2V9V+Njxcq2JlWlpaFk2k4K+p7bzudGDFF979mObJ4aeqoYxylZxJh47B1MT+MjZU1FyUW5LflsmexWojPjikxow5PONgAMGwAAAAAAAAAAAAAAAAAAAAAAAAAABhvIyRqlV/iLbEl57SYjaJnTq6iayaK99D0HJuMYXbu2rPPa2TfTdUiurC15Rinuy6zNKeUdM7a921DoykndJXWd1lbwJemkta72QliYvKSXD6HaioRjeMUtLXZWv4C0TPqKzHslp5A4UZ9pbhf78TuZzGmkAAISAAAAAAAAAAAAAAAAAAAAAAAAEKftkv8fcTSFV9qfd7i1FbMTfV7imrJuOVr6s76i3nqKqo7R55LmzpxMMjjh6dndqN9WV37y5wj9XX3tKqnNSbs9Tt4FphPZ13+8nL0jH2lYf/AJe4kkTDvt+76Es5bdumvQACqQAAAAAAAAAAAAAAAAAAAAAAAAg1/anyROIWI9qfJfEtRW3TnI8ziMdF4lOVpRi2qcIvOc9Tk9yte3Pfkenkebc6Ok7UoXTecnopxUXJSTtqdmlye468Gudw580WnWkpx7JuFlNtptWvKW3hfg+RaYBy/CrSSUs721ayqXSCVFyVPrddaF+teMtGMWrXV1d8LPWW2DmnhlKNnGWaa2p53Iyb1ymkalKw/tHd8USyFhn61/i/eiactu29egAFVgAAAAAAAAAAAAAAAAAAAAAAAAg4j2l8kTiurt/tBq2Wim3uexe/wL07VsyzzsJ13QtON8lk4xak+plLh+Z7LcbJv0bWRUV6UnLZwzmvczowzHLG6JCpiNVs2rXaVlLNKo+qm1qyyat/Fe5d4KTeFi5Kzazjue1FZGhNSveN+LqPycrFvhl2ZOXWuEUnlvhX67b+l+9E8h0LfiFbc14/oTDlv23qAAqsAAAAAAAAAAAAAAAAAAAAAAAAFfVk/wBptbNCL77yX0LArcbVUMW27u8Y6ubL0jcq26dp6iszv5EmnjVKVrNc+OSM0ql07q1reZpE+PbOY8kXSJlB9miOsS7S1Zasv7tfcjvSqNzay2+TaFrbK103pS9egt+k+5Kz82ixIVCPrKfB+f6E0ys0qAAqsAAAAAAAAAAAAAAAAAAAAAAAAFP0xH1jXlorLvZcEPExXp3dXyVvF3L451Kt44VGDjaTzWzbxJiS9C0/6b31WSXhmbR0bfl0W0ndarGakeOWaafJNGlp3KkRqEfR0r3Vm21v2yS8l5nfDxfpHfXn56LsYnHN5am3/v8AQkUYvTTe1WfvT8iqW9BdsiWcYJekOxnZeoACEgAAAAAAAAAAAAAAAAAAAAAAABGxC7R77L5iScZvtu5fMTCLdI0Keav/ACx+J0q0+u+fym6Wd8uC5XNn9+BaZVR6lPJ9/wA52ortJcGvoNj5v5jamu1kEq7ouT/bOITbycLcMnqLcqOjH+/MTzh/qW5bN6viPpGPr+gAMlwAAAAAAAAAAAAAAAAAAAAAAAA4zfb2ulknbertfE7EavKKrdbbG23e9xMIltTv6PN/HbvM2y7vgYg16NW1bPPebL8vd8GShol1Xzfm5HSmuu/vaYbyf3vNoLN8/iBVdFr99Yji0/BJFwVHRv8A3Nb72oty+b1fEfSMfQADJcAAAAAAAAAAAAAAAAAAAAAAAAI9fFQhWSlJR0llfVlx7yQRsdh4zpWlG9tW9cmWrrfKLb1w2li6ahpacLLO91sIEun6WlaMas+MabaNKGEUIzs5PSzSl/DbYmlqKPG9G4lzunC7avotLVwsu46cWLFaeZcuXLkr1D0WG6apzq6OjVjxnTlGP/q1ixnJJbNZ4in0RiXF6UoK+TWSbX9yV/0LiPRsm46VWpO2b6sY587DLhxVni/6tiyZLRzU6ExDl0tNu/W0nb+WLs458rHoSJ0fg4009GNm9b2vgSzDLeLW3DakTEcgAM1wAAAAAAAAAAAAAAAAAAAAAAAAAAYsNFbjIAxooWMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==",
    description: "Pure, refreshing, and essential for hydration.",
  },
  {
    id: 7,
    name: "Soda",
    price: 120,
    image: "https://assets.bonappetit.com/photos/60799c2d21104ce1cef4825e/16:9/w_2560%2Cc_limit/Basically-Punjabi-Dood-Soda-04.jpg",
    description: "A carbonated soft drink available in various flavors.",
  },
];

export const categoriesTest: Category[] = [
  {
    id: 1,
    name: "Coffee",
    backgroundImage: "https://i.pinimg.com/originals/a1/ee/46/a1ee465ef0548378d9be857b3a911b8c.png",
    drinks: drinks1,
    view: "images",
  },
  {
    id: 2,
    name: "Tea",
    backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdM_e1EexyTET7IF3t8BOBt8U_jE5wSUj5sw&usqp=CAU",
    drinks: drinks2,
    view: "images",
  },
  {
    id: 3,
    name: "Smoothies",
    backgroundImage: "https://img.freepik.com/premium-photo/fruit-smoothies-with-colored-straws-glass-bottles-selective-focus_630207-6499.jpg",
    drinks: drinks3,
    view: "images",
  },
  {
    id: 4,
    name: "Beverages",
    backgroundImage: "https://thumbs.dreamstime.com/b/cola-lemonade-beverages-cans-ice-cold-cubes-44505568.jpg",
    drinks: drinks4,
    view: "images",
  },
  {
    id: 5,
    name: "Alchocol",
    backgroundImage: "https://c8.alamy.com/comp/A8EKDR/bottle-of-smirnoff-vodka-isolated-on-black-background-A8EKDR.jpg",
    drinks: drinks3,
    
  },
  {
    id: 6,
    name: "Cocktails",
    backgroundImage: "https://i.pinimg.com/originals/35/06/79/350679f43f23fc9597ca422bda26b386.jpg",
    drinks: drinks4,
  },
];