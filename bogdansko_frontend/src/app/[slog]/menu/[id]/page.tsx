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
          (category: Category) => category.Id === Number(params.id)
        )
      );
    }
  }, []);

  const onBackClick = () => {
    router.push(`/${company?.Name}/menu`);
  };

  if (!selectedCategory) {
    return null;
  }

  const isCocktailsCategory =
    selectedCategory?.Name?.toLowerCase() === "cocktails";

  return (
    <div className="categoryDetailsPageWrapper">
      <p className="backButton" onClick={onBackClick}>
        <LeftOutlined />
      </p>
      <div className="coffeeImage">
        <img src={company?.HeaderImage} alt="" />
      </div>

      <div className="menuItemHeader">
        <div className="menuItemHeadingName">
          <h2 style={{ color: company?.HeaderTextColor }}>Maxim</h2>
          <h3 style={{ color: company?.HeaderTextColor }}>Coffee Bar</h3>
        </div>
      </div>
      <div
        className="categoryDetails"
        style={{ background: company?.MenuThemeColor }}
      >
        <div
          key={selectedCategory.Name}
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
            {selectedCategory.Name}
          </h3>
          {selectedCategory.Drinks.map((oneDrink: Drink) => (
            <div
              key={oneDrink.Name}
              className={`categoryDetailsTableDrinks ${
                oneDrink.Image ? "coctails" : ""
              }`}
            >
              {oneDrink.Image ? (
                <div className="coctailCategory">
                  <p>{oneDrink.Name}</p>
                  <div className="coctelCategoryPrices">
                    <h3>{oneDrink.Name}</h3>
                    <img className="coctailImage" src={oneDrink.Image} alt="" />
                    <p>{oneDrink.Price.toFixed(0)} ден.</p>
                  </div>
                  <Divider />
                </div>
              ) : (
                <>
                  <h3>{oneDrink.Name}</h3>
                  <p>{oneDrink.Price.toFixed(0)} ден.</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
