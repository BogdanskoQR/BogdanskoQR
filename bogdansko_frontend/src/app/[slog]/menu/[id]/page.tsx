"use client";
import "./CategoryDetails.css";
import { useRouter } from "next/navigation";
import { Company, Category, Drink } from "@/Components/Types/types";
import { useState, useEffect } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { categoriesTest } from "@/Components/Types/types";
export default function Page({ params }: any) {
  const { TabPane } = Tabs;
  const router = useRouter();
  const [company, setCompany] = useState<Company>();
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [activeTabKey, setActiveTabKey] = useState<string>(params.id);

  useEffect(() => {
    const storedCompanyData = localStorage.getItem("companyData");
    if (storedCompanyData) {
      setCompany(JSON.parse(storedCompanyData));
    }

    const storedCategoryData = localStorage.getItem("categories");
    if (storedCategoryData) {
      setSelectedCategory(
        company?.categoires.find(
          (category: Category) => category.id === Number(params.id)
        )
      );
    }
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
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
        <Tabs activeKey={activeTabKey} onChange={handleTabChange}>
          {categoriesTest.map((category: any) => (
            <TabPane tab={category.name} key={category.id.toString()}>
              <div
                className={
                  category.view === "images"
                    ? "categoryDrinksList"
                    : "categoryDrinksListNoImage"
                }
              >
                {category.drinks.map((drink: Drink) =>
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
