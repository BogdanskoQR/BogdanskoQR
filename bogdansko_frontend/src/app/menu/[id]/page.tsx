"use client"
import { LeftOutlined } from "@ant-design/icons";
import drinksData from "../../../data/drinksData";
import "./CategoryDetails.css";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const selectedCategory = drinksData.find(
    (category) => category.id === Number(params.id)
  );

  const router = useRouter()
  if (!selectedCategory) {
    return null;
  }
  const isCocktailsCategory =
    selectedCategory.name.toLowerCase() === "cocktails";

    const onBackClick = () => {
      router.push('/menu')
    }
  return (
    <div className="categoryDetailsPageWrapper">
      <p className="backButton" onClick={onBackClick}><LeftOutlined /></p>
      <div className="heading">
        <h2>Maxim</h2>
        <h3>Coffee Bar</h3>
        <br />
        <div key={selectedCategory.name}>
          <h3>{selectedCategory.name}</h3>
        </div>
      </div>
      <div className="categoryDetails">
        <div
          key={selectedCategory.name}
          className={`oneMenuTableCategory ${
            isCocktailsCategory ? "cocktailsCategory" : ""
          }`}
        >
          {selectedCategory.drinks.map((oneDrink) => (
            <div key={oneDrink.name} className="categoryTableDrinks">
              {isCocktailsCategory ? (
                <div className="coctailCategory">
                  <p>{oneDrink.description}</p>
                  <div className="coctelCategoryPrices">
                  <h3>{oneDrink.name}</h3>
                  <p>{oneDrink.price.toFixed(0)} ден.</p>
                  </div>
               
                </div>
              ) : (
                <>
                  <h3>{oneDrink.name}</h3>
                  <p>{oneDrink.price.toFixed(0)} ден.</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
