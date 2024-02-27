"use client";
import { useState } from "react";
import "./MenuPage.css";
import { useRouter } from "next/navigation";
import { companyDetails } from "@/data/drinksData";
export default function Page({ params }: any) {
  const router = useRouter();
  const [company, setCompany] = useState<any>(companyDetails);

  const redirectToCategory = (categoryId: string) => {
    router.push(`/${company?.name}/menu/${categoryId}`);
  };

  return (
    <div className="menuLandingPageWrapper">
      <div
        className="landingPageMiddleSection"
        style={{ backgroundImage: `url(${company?.headerImage})` }}
      >
        <h1 style={{ color: company?.categoryTextTitleColor }}>Welcome to Maxim </h1>
        <h1 style={{ color: company?.categoryTextTitleColor }}>Caffe</h1>
        <p style={{ marginTop: "10px", color: company?.categoryTextTitleColor }}>
          Explore out wide range of premium coffee and tea
        </p>
        <p style={{ color: company?.categoryTextTitleColor }}>products</p>
        <button
          onClick={() =>
            router.push(`/${company?.name}/${company?.categories?.[0].id}`)
          }
          style={{ backgroundColor: company?.headerTextColor, color: company?.categoryTextTitleColor }}        >
          View All Products
        </button>
      </div>
      <div className="categoriesList" style={{ backgroundColor: company?.menuThemeColor }}>
        <h2 style={{ color: company?.categoryTextTitleColor }}>Categories</h2>
        <div className="categoires">
          <div
            className="oneCategory"
            onClick={() => redirectToCategory('foods')}
          >
            <img src="https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg" alt="" />
            <h4 className="categoryName">Foods Menu</h4>
          </div>
          <div
            className="oneCategory"
            onClick={() => redirectToCategory("drinks")}
          >
            <img src="https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg" alt="" />

            <h4 className="categoryName">Drinks Menu</h4>
          </div>

        </div>
      </div>
      <div className="ladningPageFooter">
        <p>© 2023 Maxim Coffee. All rights reserved.</p>
      </div>
    </div>
  );
}
