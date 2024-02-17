"use client";
import { useEffect, useState } from "react";
import "./MenuPage.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Company, Category, BASE_URL } from "@/Components/Types/types";
export default function Page({ params }: any) {
  const router = useRouter();
  const [company, setCompany] = useState<Company>();

  const redirectToCategory = (categoryId: number) => {
    router.push(`/${company?.name}/menu/${categoryId}`);
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/Company/${params.slog}`);
        const fetchedCompanyData: Company = response.data;
        setCompany(fetchedCompanyData);
        console.log(fetchedCompanyData);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchCompanyData();
  }, [params.slog]);

  console.log("pavic company", company)
  return (
    <div className="menuLandingPageWrapper">
      <div
        className="landingPageMiddleSection"
        style={{ backgroundImage: `url(${company?.headerImage})` }}
      >
        <h1 style={{color: company?.categoryTextTitleColor}}>Welcome to Maxim </h1>
        <h1  style={{color: company?.categoryTextTitleColor}}>Caffe</h1>
        <p style={{ marginTop: "10px",color: company?.categoryTextTitleColor }}>
          Explore out wide range of premium coffee and tea
        </p>
        <p  style={{color: company?.categoryTextTitleColor}}>products</p>
        <button
          onClick={() =>
            router.push(`/${company?.name}/${company?.categories?.[0].id}`)
          }
          style={{backgroundColor: company?.headerTextColor, color: company?.categoryTextTitleColor}}        >
          View All Products
        </button>
      </div>
      <div className="categoriesList" style={{backgroundColor: company?.menuThemeColor}}>
        <h2 style={{color: company?.categoryTextTitleColor}}>Categories</h2>
        <div className="categoires">
          {company?.categories?.map((category: Category) => (
            <div
              className="oneCategory"
              onClick={() => redirectToCategory(category.id)}
            >
              <img src={category.backgroundImage} alt="categoryImage" />
              <h4 className="categoryName">{category.name}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="ladningPageFooter">
        <p>© 2023 Maxim Coffee. All rights reserved.</p>
      </div>
    </div>
  );
}
