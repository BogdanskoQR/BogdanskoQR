"use client";
import "./MenuPage.css";
import { companyDetails } from "../../../data/drinksData";
import { useRouter } from "next/navigation";

export default function Page({params}: any) {
  const router = useRouter();
  const company = companyDetails.find((company)=> company.name === params.slog)
  const redirectToCategory = (categoryId: number) => {
    router.push(`/${company?.name}/menu/${categoryId}`);
  };

  return (
    <div className="menuPageWrapper">
      <div className="coffeeImage">
        <img src={company?.headerImage} alt="companyImage" />
      </div>
      <div className="heading">
        <div className="headingName">
          <h2 style={{ 'color': company?.headerTextColor }}>Maxim</h2>
          <h3 style={{ 'color': company?.headerTextColor }}>Coffee Bar</h3>
        </div>
      </div>
      <div className="categoriesWrapper" style={{ 'background': company?.menuThemeColor }}>
        {company?.menu.map((oneCategory) => (
          <div
            key={oneCategory.name}
            className="oneCategorieCart"
            onClick={() => redirectToCategory(oneCategory.id)}
          >
            <div className="categorieTitle" style={{ 'background': company?.categoryTitleColor }}>
              <h3 style={{ 'color': company?.categoryTextTitleColor }}>{oneCategory.name}</h3>
            </div>
            <img src={oneCategory.img} alt="img" />
          </div>
        ))}
      </div>
    </div>
  );
}
