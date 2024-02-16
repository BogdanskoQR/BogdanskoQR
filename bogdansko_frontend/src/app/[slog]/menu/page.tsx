"use client";
import { useEffect, useState } from "react";
import "./MenuPage.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Company, Category, BASE_URL } from "@/Components/Types/types";
import { categoriesTest } from "@/Components/Types/types";
import { HomeOutlined } from "@ant-design/icons";
export default function Page({ params }: any) {
  const router = useRouter();
  const [company, setCompany] = useState<Company>();

  const redirectToCategory = (categoryId: number) => {
    router.push(`/maxim/menu/${categoryId}`);
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      const storedCompanyData = localStorage.getItem("companyData");
      if (storedCompanyData) {
        setCompany(JSON.parse(storedCompanyData));
      } else {
        try {
          const response = await axios.get(
            `${BASE_URL}/Company/${params.slog}`
          );
          const fetchedCompanyData: Company = response.data;
          setCompany(fetchedCompanyData);
          localStorage.setItem(
            "companyData",
            JSON.stringify(fetchedCompanyData)
          );
        } catch (error) {
          console.error("Error fetching company data:", error);
        }
      }
    };
    fetchCompanyData();
  }, [params.slog]);

  return (
    <div className="menuLandingPageWrapper">
      <div className="landingPageMiddleSection">
        <h1>Welcome to Maxim </h1>
        <h1>Caffe</h1>
        <p style={{ marginTop: "10px" }}>
          Explore out wide range of premium coffee and tea
        </p>
        <p>products</p>
        <button onClick={() => router.push(`/${company?.name}/${company?.categoires?.[0].id}`)}>View All Products</button>
      </div>
      <div className="categoriesList">
        <h2>Categories</h2>
        <div className="categoires">
          {categoriesTest?.map((category: Category) => (
            <div className="oneCategory" onClick={() => redirectToCategory(category.id)}>
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
