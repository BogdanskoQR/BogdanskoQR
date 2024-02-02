"use client";
import { companyDetails } from "../../../data/drinksData";
import { useEffect, useState } from "react";
import "./DashboardPage.css";
import {
  Button,
  notification
} from "antd";
import { FormikHelpers } from "formik";
import { useEdgeStore } from "../../lib/edgestore";
import Header from "@/Components/Header/Header";
import { useRouter } from "next/navigation";
import Categories from "@/Components/Categories/Categories";
import CreateCategoryModal from "@/Components/CreateCategoryModal/CreateCategoryModal";
import CreateProductModal from "@/Components/CreateProductModal/CreateProductModal";
import EditMenuModal from "@/Components/EditMenuModal/EditMenuModal";
import EditProductModal from "@/Components/EditProductModal/EditProductModal";
import EditCategoryModal from "@/Components/EditCategoryModal/EditCategoryModal";

export type NotificationType = "success" | "info" | "warning" | "error";

interface Drink {
  id: number;
  name: string;
  price: number;
  img?: string
}

interface Category {
  id: number;
  name: string;
  img: string;
  drinks: Drink[];
}

interface FormCategoryValues {
  categoryName: string;
  drinks: Drink[];
}

export default function Page({ params }: any) {
  const company = companyDetails.find((company) => company.id === Number(params.id));
  const [api, contextHolder] = notification.useNotification();
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState<boolean>(false);
  const [isCreateDrinkModalOpen, setIsCreateDrinkModalOpen] = useState<boolean>(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState<boolean>(false);
  const [isEditProductModalShown, setIsEditProductModalShown] = useState(false);
  const [isEditMenuModalOpen, setIsEditMenuModalOpen] = useState(false);

  const [menuBackgroundColor, setMenuBackgroundColor] = useState(company?.menuThemeColor);
  const [categoryTitleBackgroundColor, setCategoryTitleBackgroundColor] = useState(company?.categoryTitleColor);
  const [categoryTextColor, setCategoryTextColor] = useState(company?.categoryTextTitleColor);
  const [headerTextColor, setHeaderTextColor] = useState(company?.headerTextColor);
  
  const categories = company?.menu;
  const [editedDrink, setEditedDrink] = useState<Drink | null>(null);
  const [editDrinkName, setEditDrinkName] = useState<string>("");
  const [editDrinkPrice, setEditDrinkPrice] = useState<string>("");
  const [editProductImage, setEditProductImage] = useState<string | undefined>();
  
  const [headerImgFile, setHeaderImgFile] = useState<File>();
  const [productImgFile, setProductImgFile] = useState<File>();
  const [editProductImgFile, setEditProductImgFile] = useState<File>();
  const [categoryImgFIle, setCategoryImgFile] = useState<File>();
  
  const [selectedNewDrink, setSelectedNewDrink] = useState<Drink>();
  const [headerImgUrl, setHeaderImgUrl] = useState<{ url: string; thumbmailUrl: string | null }>();
  const [productImgUrl, setProductImgUrl] = useState<{ url: string; thumbmailUrl: string | null }>();
  const [editProductImgUrl, setEditProductImgUrl] = useState<{ url: string; thumbmailUrl: string | null }>();
  const [categoryImgUrl, setCategoryUrlImg] = useState<{ url: string; thumbmailUrl: string | null }>();
  
  const [editCategoryName, setEditCategoryName] = useState<string>();
  const [editCategoryImageUrl, setEditCategoryImageUrl] = useState<{ url: string; thumbmailUrl: string | null }>();
  const [editCategoryImg, setEditCategoryImg] = useState<string>();
  const [editCategoryImgFile, setEditCategoryImgFile] = useState<File>();

  const { edgestore } = useEdgeStore();
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("hasReloaded")) {
      window.location.reload();
      sessionStorage.setItem("hasReloaded", "true");
    }
  }, []);
  
  const openNotificationWithIcon = (
    type: NotificationType,
    point: string,
    drinkName?: string
  ): void => {
    const successMessages: any = {
      create: `Successfully created ${drinkName ? drinkName : point}`,
      update: `Successfully updated drink ${drinkName}`,
      delete: `Successfully deleted drink ${drinkName}`,
      editMenu: `Successfully edited the menu`,
      text: `${drinkName}`,
    };

    notification[type]({
      message: successMessages[point],
      description: successMessages[point],
    });
  };

  const openModal = (modalType: "category" | "drink" | "editMenu"): void => {
    if (modalType === "category") {
      setIsCreateCategoryModalOpen(true);
    } else if (modalType === "drink") {
      setIsCreateDrinkModalOpen(true);
    } else if (modalType === "editMenu") {
      setIsEditMenuModalOpen(true);
    }
  };

  const closeModal = (modalType: "category" | "drink" | "editMenu"): void => {
    if (modalType === "category") {
      setIsCreateCategoryModalOpen(false);
    } else if (modalType === "drink") {
      setIsCreateDrinkModalOpen(false);
    } else if (modalType === "editMenu") {
      setIsEditMenuModalOpen(false);
    }
  };

  const handleEditDrink = (drink: any): void => {
    setEditedDrink(drink);
    setEditDrinkName(drink.name);
    setEditDrinkPrice(drink.price.toFixed(2));
    setEditProductImage(drink?.img);
  };

  const handleEditCategory = (category: Category): void => {
    setEditCategoryName(category.name);
    setEditCategoryImg(category.img);
  };

  const handleUpdateDrink = (): void => {
    if (editedDrink) {
      openNotificationWithIcon("success", "update", editDrinkName);
      console.log(
        "Update Drink:",
        editedDrink.id,
        "with Name:",
        editDrinkName,
        "and Price:",
        editDrinkPrice
      );
    }

    setEditedDrink(null);
    setEditDrinkName("");
    setEditDrinkPrice("");
  };

  const handleRemoveDrink = (drink: Drink, category: Category): void => {
    openNotificationWithIcon("success", "delete", drink.name);
    console.log("Remove Drink:", drink, "category", category);
  };

  const handleAddMoreDrinks = (
    formikArrayHelpers: FormikHelpers<FormCategoryValues["drinks"]>
  ): void => {
    // formikArrayHelpers.push({ name: "", price: 0 });
  };

  const handleDeleteCateogry = (category: Category) => {
    console.log(category);
    openNotificationWithIcon(
      "success",
      "text",
      `Successfully deleted ${category.name} category`
    );
  };

  const onLogoutButton = () => {
    sessionStorage.clear();
    router.push("/login");
  };
  return (
    <div className="menuPageWrapper">
      <Header companyName={company?.name} onLogout={onLogoutButton} />
      <div className="addButtons">
        <Button type="primary" onClick={() => openModal("category")}>
          Add new Category
        </Button>
        <Button type="primary" onClick={() => openModal("drink")}>
          Add new product
        </Button>
        <Button type="primary" onClick={() => openModal("editMenu")}>
          Edit Menu
        </Button>
      </div>

      <div className="drinksCategoryWrapper">
        {contextHolder}
        <Categories
          handleDeleteCategory={handleDeleteCateogry}
          handleEditCategory={handleEditCategory}
          handleEditDrink={handleEditDrink}
          handleRemoveDrink={handleRemoveDrink}
          setIsEditCategoryModalOpen={setIsEditCategoryModalOpen}
          setIsEditProductModalShown={setIsEditProductModalShown}
          categories={categories}
        />
      </div>
      <CreateCategoryModal
        categoryImgFIle={categoryImgFIle}
        edgestore={edgestore}
        handleAddMoreDrinks={handleAddMoreDrinks}
        isOpen={isCreateCategoryModalOpen}
        onAddMoreDrinks={handleAddMoreDrinks}
        onCategorySubmit={() => {}}
        onClose={() => setIsCreateCategoryModalOpen(false)}
        setCategoryImgFile={setCategoryImgFile}
        setCategoryUrlImg={setCategoryUrlImg}
        categoryImgUrl={categoryImgUrl}
      />

      <CreateProductModal
        isCreateDrinkModalOpen={isCreateDrinkModalOpen}
        setIsCreateDrinkModalOpen={setIsCreateCategoryModalOpen}
        closeModal={closeModal}
        openNotificationWithIcon={openNotificationWithIcon}
        productImgUrl={productImgUrl}
        categories={categories}
        setSelectedNewDrink={setSelectedNewDrink}
        setProductImgFile={setProductImgFile}
        productImgFile={productImgFile}
        edgestore={edgestore}
        setProductImgUrl={setProductImgUrl}
      />

      <EditMenuModal
        isEditMenuModalOpen={isEditMenuModalOpen}
        menuBackgroundColor={menuBackgroundColor}
        categoryTitleBackgroundColor={categoryTitleBackgroundColor}
        categoryTextColor={categoryTextColor}
        closeModal={closeModal}
        openNotificationWithIcon={openNotificationWithIcon}
        headerImgUrl={headerImgUrl}
        company={company}
        headerTextColor={headerTextColor}
        categories={categories}
        setHeaderImgFile={setHeaderImgFile}
        headerImgFile={headerImgFile}
        setHeaderImgUrl={setHeaderImgUrl}
        edgestore={edgestore}
        setMenuBackgroundColor={setMenuBackgroundColor}
        setCategoryTitleBackgroundColor={setCategoryTitleBackgroundColor}
        setCategoryTextColor={setCategoryTextColor}
        setHeaderTextColor={setHeaderTextColor}
      />

      <EditProductModal
        isEditProductModalShown={isEditProductModalShown}
        setIsEditProductModalShown={setIsEditProductModalShown}
        editDrinkName={editDrinkName}
        setEditDrinkName={setEditDrinkName}
        editDrinkPrice={editDrinkPrice}
        setEditDrinkPrice={setEditDrinkPrice}
        editProductImage={editProductImage}
        setEditProductImage={setEditProductImage}
        editProductImgUrl={editProductImgUrl}
        setEditProductImgUrl={setEditProductImgUrl}
        edgestore={edgestore}
        editProductImgFile={editProductImgFile}
        setEditProductImgFile={setEditProductImgFile}
        openNotificationWithIcon={openNotificationWithIcon}
      />

      <EditCategoryModal
        isEditCategoryModalOpen={isEditCategoryModalOpen}
        setIsEditCategoryModalOpen={setIsEditCategoryModalOpen}
        editCategoryName={editCategoryName}
        setEditCategoryName={setEditCategoryName}
        editCategoryImageUrl={editCategoryImageUrl}
        setEditCategoryImageUrl={setEditCategoryImageUrl}
        editCategoryImgFile={editCategoryImgFile}
        setEditCategoryImgFile={setEditCategoryImgFile}
        edgestore={edgestore}
        openNotificationWithIcon={openNotificationWithIcon}
        editCategoryImg={editCategoryImg}
      />
    </div>
  );
}
