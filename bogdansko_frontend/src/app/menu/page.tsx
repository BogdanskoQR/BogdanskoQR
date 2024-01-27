"use client";
import "./MenuPage.css";
import drinksData from "../../data/drinksData";
import { companyDetails } from "../../data/drinksData";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const redirectToCategory = (categoryId: number) => {
    router.push(`/menu/${categoryId}`);
  };

  return (
    <div className="menuPageWrapper">
      <div className="coffeeImage">
        <img src={companyDetails.headerImage} alt="companyImage" />
      </div>
      <div className="heading">
        <div className="headingName">
          <h2 style={{ 'color': companyDetails.headerTextColor }}>Maxim</h2>
          <h3 style={{ 'color': companyDetails.headerTextColor }}>Coffee Bar</h3>
        </div>
      </div>
      <div className="categoriesWrapper" style={{ 'background': companyDetails.menuThemeColor }}>
        {drinksData.map((oneCategory) => (
          <div
            key={oneCategory.name}
            className="oneCategorieCart"
            onClick={() => redirectToCategory(oneCategory.id)}
          >
            <div className="categorieTitle" style={{ 'background': companyDetails.categoryTitleColor }}>
              <h3 style={{ 'color': companyDetails.categoryTextTitleColor }}>{oneCategory.name}</h3>
            </div>
            <img src={oneCategory.img} alt="img" />
          </div>
        ))}
      </div>
    </div>
  );
}
