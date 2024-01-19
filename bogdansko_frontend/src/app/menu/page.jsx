"use client"
import drinksData from '../../data/drinksData';
import { useState } from 'react';
import styles from './styles.module.css';

export default function Page() {
  const [drinksDataArray, setDrinksData] = useState(drinksData);

  return (
    <div className={styles.menuPageWrapper}>
      <div className={styles.drinksCategoryWrapper}>
      {drinksDataArray.map((category) => (
        <div key={category.id} className={styles.category}>
          <h2>{category.name}</h2>
          <ul className={styles.drinksWrapper}>
            {category.drinks.map((drink) => (
              <li key={drink.id} className={styles.drink} >
                {drink.name} - ${drink.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>

  );
}
