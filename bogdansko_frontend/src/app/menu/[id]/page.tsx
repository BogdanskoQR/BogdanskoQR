"use client"
import { LeftOutlined } from "@ant-design/icons";
import drinksData from "../../../data/drinksData";
import "./CategoryDetails.css";
import { useRouter } from "next/navigation";

export default function Page({ params }:any) {
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
      <div className="coffeeImage">
      <img src='https://scontent.fskp4-1.fna.fbcdn.net/v/t39.30808-6/361086482_1003088147611941_5940843451065858315_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=783fdb&_nc_ohc=KzYYHOGVtDEAX8XEQLo&_nc_ht=scontent.fskp4-1.fna&oh=00_AfCaUUh4dB1TDecmQ57ATZ6AZ_UKQUH3zLDtVh3x5aRxdw&oe=65B84318' alt="" />
      </div>

      <div className="menuItemHeader">
        <div className="menuItemHeadingName">
        <h2>Maxim</h2>
        <h3>Coffee Bar</h3>
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
                  <img className="coctailImage" src='https://i.pinimg.com/736x/83/5d/56/835d563804b0b6c712f31da53bd18812.jpg' alt="" />
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
