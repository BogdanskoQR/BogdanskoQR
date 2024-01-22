const drinksData = [
  {
    id: 1,
    name: "Soft Drinks",
    img: 'https://scontent.fskp3-1.fna.fbcdn.net/v/t1.15752-9/414109446_363952673046373_9100556337143579254_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=U8v8BbtCrugAX80JqFx&_nc_ht=scontent.fskp3-1.fna&oh=03_AdRwTNJg2COL2kXSAz1A_H2-RCsUzuIOeCrDdXBEbrNoGw&oe=65D59D06',
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
    img: 'https://scontent.fskp3-1.fna.fbcdn.net/v/t1.15752-9/414162965_2025273677847564_9103021549812902095_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=IbX5Moq0tssAX-dX11B&_nc_ht=scontent.fskp3-1.fna&oh=03_AdQD22gJuceeyNIx7op9QnIwveFAh9Anodx6T5s3Ax_N6w&oe=65D56B89',
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
    img: 'https://scontent.fskp3-1.fna.fbcdn.net/v/t1.15752-9/414290567_1497163470846226_6765045948819366753_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=uiKPZmLKuPoAX_e7oBq&_nc_ht=scontent.fskp3-1.fna&oh=03_AdTtudSltCG-n8xYF764ytqZhE-E_s_EbzT3BZ4icd9Etg&oe=65D5932E',
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
    img: 'https://scontent.fskp3-1.fna.fbcdn.net/v/t1.15752-9/418392816_1169692214012371_3377569790133421022_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=wU67rFCdi2wAX_5bAMa&_nc_ht=scontent.fskp3-1.fna&oh=03_AdS0hG4dYYbXvGVTGsde6ED4Z2nwgJUP-au_fAsHiKFtgw&oe=65D598A8',
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
    img: 'https://scontent.fskp3-1.fna.fbcdn.net/v/t1.15752-9/414109446_363952673046373_9100556337143579254_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=U8v8BbtCrugAX80JqFx&_nc_ht=scontent.fskp3-1.fna&oh=03_AdRwTNJg2COL2kXSAz1A_H2-RCsUzuIOeCrDdXBEbrNoGw&oe=65D59D06 ',
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
