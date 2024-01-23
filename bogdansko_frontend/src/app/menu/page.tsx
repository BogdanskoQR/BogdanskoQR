"use client";
import "./MenuPage.css";
import drinksData from "../../data/drinksData";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()

  const redirectToCategory = (categoryId: number) => {
    router.push(`/menu/${categoryId}`)
  };

  return (
    <div className="menuPageWrapper">
      <div className="heading">
        <h2>Maxim</h2>
        <h3>Coffee Bar</h3>
      </div>
      <div className="categoriesWrapper">
        {drinksData.map((oneCategory) => (
          <div
            key={oneCategory.name}
            className="oneCategorieCart"
            onClick={() => redirectToCategory(oneCategory.id)}
          >
            <div className="categorieTitle">
              <h3>{oneCategory.name}</h3>
            </div>
            <img src={oneCategory.img} alt="img" />
          </div>
        ))}
      </div>
    </div>
  );
}
