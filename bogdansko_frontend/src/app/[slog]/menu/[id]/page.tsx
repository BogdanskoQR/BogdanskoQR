"use client";
import "./CategoryDetails.css";
import { useRouter } from "next/navigation";
import { Company, Category, Drink, BASE_URL } from "@/Components/Types/types";
import { useState, useEffect } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import axios from "axios";
export default function Page({ params }: any) {
  const { TabPane } = Tabs;
  const router = useRouter();
  const [company, setCompany] = useState<Company>();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();
  const [activeTabKey, setActiveTabKey] = useState<string | null>(params.id);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/Company/${params.slog}`);
        const fetchedCompanyData: Company = response.data;
        setCompany(fetchedCompanyData);
        const initialSelectedCategory = fetchedCompanyData.categories.find(
          (category: Category) => category.id === Number(params.id)
        );
        setSelectedCategory(initialSelectedCategory || null);
        console.log(fetchedCompanyData);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
  
    fetchCompanyData(); // Call the fetchCompanyData function here
  
  }, [params.id, params.slog]);



  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
    const newSelectedCategory = company?.categories.find(
      (category: Category) => category.id === Number(key)
    );
    setSelectedCategory(newSelectedCategory || null);
  };
  const onBackClick = () => {
    router.push(`/${company?.name}/menu`);
  };

  // if (!selectedCategory) {
  //   return null;
  // }

  return (
    <div className="categoryDetailsPageWrapper">
      <div className="menuPageHeader">
        <div className="headingName">
          <LeftOutlined onClick={onBackClick} />
          <h3>Coffee Store</h3>
        </div>
      </div>

      <div className="categoryDetailsMain">
        <h2 className="categoryText">Menu</h2>
        <Tabs activeKey={activeTabKey ? activeTabKey : "2"} onChange={handleTabChange}>
          {company?.categories.map((category: any) => (
            <TabPane tab={category.name} key={category.id.toString()}>
              <div
                className={
                  category.view === "images"
                    ? "categoryDrinksList"
                    : "categoryDrinksListNoImage"
                }
              >
                {selectedCategory?.drinks.map((drink: Drink) =>
                  category.view === "images" ? (
                    <div className="categoryDrink" key={drink.id}>
                      <img src={drink.image} alt="drink Image" />
                      <div className="categoryDrinkInfo">
                        <h3>{drink.name}</h3>
                        <p>{drink.price} дeн</p>
                      </div>
                    </div>
                  ) : (
                    <div className="categoryDrinkNoImage" key={drink.id}>
                      <h3>{drink.name}</h3>
                      <p>{drink.price} дeн</p>
                    </div>
                  )
                )}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
      <div className="ladningPageFooter">
        <p>© 2023 Maxim Coffee. All rights reserved.</p>
      </div>
    </div>
  );
}
