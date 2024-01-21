const drinksData = [
  {
    id: 1,
    name: "Soft Drinks",
    img: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?cs=srgb&dl=pexels-pixabay-50593.jpg&fm=jpg',
    drinks: [
      { id: 101, name: "Cola", price: 2.5 },
      { id: 102, name: "Lemonade", price: 3.0 },
      { id: 103, name: "Root Beer", price: 2.8 },
      { id: 104, name: "Orange Soda", price: 3.2 },
      { id: 105, name: "Ginger Ale", price: 3.5 },
    ],
  },
  {
    id: 2,
    img: 'data:image/jpeg;base64,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',
    name: "Cocktails",
    drinks: [
      { id: 201, name: "Margarita", price: 8.0 },
      { id: 202, name: "Martini", price: 10.0 },
      { id: 203, name: "Mojito", price: 7.5 },
      { id: 204, name: "Pina Colada", price: 9.0 },
      { id: 205, name: "Cosmopolitan", price: 8.5 },
    ],
  },
  {
    id: 3,
    img: 'https://www.thehungrybites.com/wp-content/uploads/2023/07/freddo-cappuccino-featured-image.jpg',
    name: "Coffees",
    drinks: [
      { id: 301, name: "Espresso", price: 3.5 },
      { id: 302, name: "Latte", price: 4.0 },
      { id: 303, name: "Cappuccino", price: 4.2 },
      { id: 304, name: "Mocha", price: 4.5 },
      { id: 305, name: "Americano", price: 3.8 },
    ],
  },
  {
    id: 4,
    img: 'data:image/jpeg;base64,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',
    name: "Hot Drinks",
    drinks: [
      { id: 401, name: "Hot Chocolate", price: 4.5 },
      { id: 402, name: "Tea", price: 3.0 },
      { id: 403, name: "Coffee", price: 3.8 },
      { id: 404, name: "Chai Latte", price: 4.2 },
      { id: 405, name: "Irish Coffee", price: 7.0 },
    ],
  },
  {
    id: 5,
    name: "Water",
    img: 'https://api.hub.jhu.edu/factory/sites/default/files/styles/landscape/public/ww-hydration-hub.jpg',
    drinks: [
      { id: 501, name: "Still Water", price: 1.5 },
      { id: 502, name: "Sparkling Water", price: 2.0 },
      { id: 503, name: "Flavored Water", price: 2.2 },
      { id: 504, name: "Coconut Water", price: 2.5 },
      { id: 505, name: "Mineral Water", price: 2.3 },
    ],
  },
];

export default drinksData;
