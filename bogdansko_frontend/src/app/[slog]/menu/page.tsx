"use client";
import { useEffect, useState } from "react";
import "./MenuPage.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Company, Category, BASE_URL } from "@/Components/Types/types";

export default function Page({params}: any) {
  const router = useRouter();

  const [company, setCompany] = useState<Company>();
  const [categories, setCategories] = useState<Category[]>();

  const redirectToCategory = (categoryId: number) => {
    router.push(`/${company?.Name}/menu/${categoryId}`);
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      const storedCompanyData = localStorage.getItem('companyData');
      if (storedCompanyData) {
        setCompany(JSON.parse(storedCompanyData));
      } else {
        try {
          const response = await axios.get(`${BASE_URL}/Company/${params.slog}`);
          const fetchedCompanyData: Company = response.data;
          setCompany(fetchedCompanyData);
          localStorage.setItem('companyData', JSON.stringify(fetchedCompanyData)); 
        } catch (error) {
          console.error('Error fetching company data:', error);
        }
      }
    };
    fetchCompanyData();
  }, [params.slog]);

  useEffect(() => {
    const fetchCompanyCategories = async () => {
      const storedCategoriesData = localStorage.getItem('categories');
      if (storedCategoriesData) {
        setCategories(JSON.parse(storedCategoriesData));
      } else {
        try {
          const response = await axios.get(`${BASE_URL}/Category/${params.slog}}`);
          const fetchedCompanyCategories = response.data;
          setCategories(fetchedCompanyCategories);
          localStorage.setItem('categories', JSON.stringify(fetchedCompanyCategories));
        } catch (error) {
          console.error('Error fetching company categories:', error);
        }
      }
    };
    fetchCompanyCategories();
  }, [params.id,params.slog]);
  return (
    <div className="menuPageWrapper">
      <div className="coffeeImage">
        <img src={company?.HeaderImage} alt="companyImage" />
      </div>
      <div className="heading">
        <div className="headingName">
          <h2 style={{ 'color': company?.HeaderTextColor }}>{company?.Name}</h2>
        </div>
      </div>
      <div className="categoriesWrapper" style={{ 'background': company?.MenuThemeColor }}>
        {categories?.map((oneCategory: Category) => (
          <div
            key={oneCategory.BackgroundImage}
            className="oneCategorieCart"
            onClick={() => redirectToCategory(oneCategory.Id)}
          >
            <div className="categorieTitle" style={{ 'background': company?.CategoryTitleColor }}>
              <h3 style={{ 'color': company?.CategoryTextTitleColor }}>{oneCategory.Name}</h3>
            </div>
            <img src={oneCategory.BackgroundImage} alt="img" />
          </div>
        ))}
      </div>
    </div>
  );
}
