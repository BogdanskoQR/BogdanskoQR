"use client";
import { LeftOutlined } from "@ant-design/icons";
import "./CategoryDetails.css";
import { useRouter } from "next/navigation";
import { companyDetails } from "../../../../data/drinksData";
import { Divider } from "antd";
import { useEffect } from "react";
export default function Page({ params }: any) {

  const company = companyDetails.find(
    (company) => company.name === params.slog
  );
  const router = useRouter();
  const selectedCategory = company?.menu.find(
    (category) => category.id === Number(params.id)
  );
  if (!selectedCategory) {
    return null;
  }

  const isCocktailsCategory =
    selectedCategory.name.toLowerCase() === "cocktails";

  const onBackClick = () => {
    router.push(`/${company?.name}/menu`);
  };
  
  return (
    <div className="categoryDetailsPageWrapper">
      <p className="backButton" onClick={onBackClick}>
        <LeftOutlined />
      </p>
      <div className="coffeeImage">
        <img
          src={company?.headerImage}
          alt=""
        />
      </div>

      <div className="menuItemHeader">
        <div className="menuItemHeadingName">
          <h2 style={{ color: company?.headerTextColor }}>Maxim</h2>
          <h3 style={{ color: company?.headerTextColor }}>Coffee Bar</h3>
        </div>
      </div>
      <div
        className="categoryDetails"
        style={{ background: company?.menuThemeColor }}
      >
        <div
          key={selectedCategory.name}
          className={`oneMenuTableCategory ${
            isCocktailsCategory ? "cocktailsCategory" : ""
          }`}
        >
          <h3
            style={{
              color: "black",
              textAlign: "center",
              marginBottom: "0px",
              fontWeight: "600",
            }}
          >
            {selectedCategory.name}
          </h3>
          {selectedCategory.drinks.map((oneDrink) => (
            <div
              key={oneDrink.name}
              className={`categoryDetailsTableDrinks ${
                oneDrink.img ? "coctails" : ""
              }`}
            >
              {oneDrink.img ? (
                <div className="coctailCategory">
                  <p>{oneDrink.name}</p>
                  <div className="coctelCategoryPrices">
                    <h3>{oneDrink.name}</h3>
                    <img className="coctailImage" src={oneDrink.img} alt="" />
                    <p>{oneDrink.price.toFixed(0)} ден.</p>
                  </div>
                  <Divider />
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
