import { LeftOutlined } from "@ant-design/icons";
import "./CategoryDetails.css";
import { useRouter } from "next/navigation";
import { Divider } from "antd";
import { Company, Category, Drink } from "@/Components/Types/types";
import { useState, useEffect } from "react";

export default function Page({ params }: any) {
  const router = useRouter();
  const [company, setCompany] = useState<Company>();
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  useEffect(() => {
    const storedCompanyData = localStorage.getItem("companyData");
    if (storedCompanyData) {
      setCompany(JSON.parse(storedCompanyData));
    }

    const storedCategoryData = localStorage.getItem("categories");
    if (storedCategoryData) {
      setSelectedCategory(
        JSON.parse(storedCategoryData).find(
          (category: Category) => category.id === Number(params.id)
        )
      );
    }
  }, []);

  const onBackClick = () => {
    router.push(`/${company?.name}/menu`);
  };

  if (!selectedCategory) {
    return null;
  }

  const isCocktailsCategory =
    selectedCategory?.name?.toLowerCase() === "cocktails";

  return (
    <div className="categoryDetailsPageWrapper">
      <p className="backButton" onClick={onBackClick}>
        <LeftOutlined />
      </p>
      <div className="coffeeImage">
        <img src={company?.headerImage} alt="" />
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
          {selectedCategory.drinks.map((oneDrink: Drink) => (
            <div
              key={oneDrink.name}
              className={`categoryDetailsTableDrinks ${
                oneDrink.image ? "coctails" : ""
              }`}
            >
              {oneDrink.image ? (
                <div className="coctailCategory">
                  <p>{oneDrink.name}</p>
                  <div className="coctelCategoryPrices">
                    <h3>{oneDrink.name}</h3>
                    <img className="coctailImage" src={oneDrink.image} alt="" />
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
