"use client";
import { LeftOutlined } from "@ant-design/icons";
import "./CategoryDetails.css";
import { useRouter } from "next/navigation";
import { companyDetails } from "../../../../data/drinksData";
import { Divider } from "antd";

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
          src="https://scontent.fskp4-1.fna.fbcdn.net/v/t39.30808-6/361086482_1003088147611941_5940843451065858315_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=783fdb&_nc_ohc=KzYYHOGVtDEAX8XEQLo&_nc_ht=scontent.fskp4-1.fna&oh=00_AfCaUUh4dB1TDecmQ57ATZ6AZ_UKQUH3zLDtVh3x5aRxdw&oe=65B84318"
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
