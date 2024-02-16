"use client";
import { useEffect, useState } from "react";
import "./DashboardPage.css";
import { Button, notification } from "antd";
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
import axios from "axios";
import { BASE_URL, Category, Company, Drink } from "@/Components/Types/types";

export type NotificationType = "success" | "info" | "warning" | "error";
interface FormCategoryValues {
  categoryName: string;
  drinks: Drink[];
}
export default function Page({ params }: any) {
  const [company, setCompany] = useState<Company>();
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/Company/${Number(params.id)}`
        );
        console.log("pavic response", response);
        const fetchedCompanyData: Company = response.data;
        setCompany(fetchedCompanyData);
        console.log("pavic company", fetchedCompanyData);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchCompanyData();
    return () => {};
  }, [params.id]);
  const [api, contextHolder] = notification.useNotification();
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState<boolean>(false);
  const [isCreateDrinkModalOpen, setIsCreateDrinkModalOpen] =
    useState<boolean>(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] =
    useState<boolean>(false);
  const [isEditProductModalShown, setIsEditProductModalShown] = useState(false);
  const [isEditMenuModalOpen, setIsEditMenuModalOpen] = useState(false);
  const [menuBackgroundColor, setMenuBackgroundColor] = useState(
    company?.menuThemeColor
  );
  const [categoryTitleBackgroundColor, setCategoryTitleBackgroundColor] =
    useState(company?.categoryTitleColor);
  const [categoryTextColor, setCategoryTextColor] = useState(
    company?.categoryTextTitleColor
  );
  const [headerTextColor, setHeaderTextColor] = useState(
    company?.headerTextColor
  );
  const [editedDrink, setEditedDrink] = useState<Drink | null>(null);
  const [editDrinkName, setEditDrinkName] = useState<string>("");
  const [editDrinkPrice, setEditDrinkPrice] = useState<string>("");
  const [editProductImage, setEditProductImage] = useState<
    string | undefined
  >();
  const [headerImgFile, setHeaderImgFile] = useState<File>();
  const [productImgFile, setProductImgFile] = useState<File>();
  const [editProductImgFile, setEditProductImgFile] = useState<File>();
  const [categoryImgFIle, setCategoryImgFile] = useState<File>();
  const [createProductCategoryId, setCreateProductCategoryId] =
    useState<number>();
  const [headerImgUrl, setHeaderImgUrl] = useState<{
    url: string;
    thumbmailUrl: string | null;
  }>();
  const [productImgUrl, setProductImgUrl] = useState<{
    url: string;
    thumbmailUrl: string | null;
  }>();
  const [editProductImgUrl, setEditProductImgUrl] = useState<{
    url: string;
    thumbmailUrl: string | null;
  }>();
  const [categoryImgUrl, setCategoryUrlImg] = useState<{
    url: string;
    thumbmailUrl: string | null;
  }>();

  const [editCategoryName, setEditCategoryName] = useState<string>();
  const [editCategoryImageUrl, setEditCategoryImageUrl] = useState<{
    url: string;
    thumbmailUrl: string | null;
  }>();
  const [editCategoryImg, setEditCategoryImg] = useState<string>();
  const [editCategoryImgFile, setEditCategoryImgFile] = useState<File>();
  const [editCategoryId, setEditCategoryId] = useState<number>();
  const [editDrinkCategoryId, setEditDrinkCategoryId] = useState<number>();
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
      error: `Error while trying to`,
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

  const handleEditDrink = (drink: Drink, drinkCategoryId: number): void => {
    setEditedDrink(drink);
    setEditDrinkName(drink.name);
    setEditDrinkPrice(drink.price.toFixed(2));
    setEditProductImage(drink?.image);
    setEditDrinkCategoryId(drinkCategoryId);
  };

  const handleEditCategory = async (category: Category) => {
    setEditCategoryName(category.name);
    setEditCategoryImg(category.backgroundImage);
    setEditCategoryId(category.id);
  };

  const handleUpdateCategory = async (categoryUpdateData: Category) => {
    try {
      await axios.patch(`${BASE_URL}/Category`, {
        id: editCategoryId,
        companyId: Number(params.id),
        name: categoryUpdateData.name,
        backgroundImage: categoryUpdateData.backgroundImage,
      });
      openNotificationWithIcon("success", "update", categoryUpdateData.name);
      console.log("pavic category", {
        id: editCategoryId,
        companyId: Number(params.id),
        name: categoryUpdateData.name,
        backgroundImage: categoryUpdateData.backgroundImage,
      });
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "text",
        `Error while updating category`
      );
    }
  };
  const handleDeleteCategory = async (category: Category) => {
    try {
      await axios.delete(`${BASE_URL}/${category.id}`);
      openNotificationWithIcon(
        "success",
        "text",
        `Successfully deleted ${category.name} category`
      );
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "text",
        `Error while deleting category`
      );
    }
  };
  const handleCreateCategory = async (value: any) => {
    console.log("pavic create category values", value);
    try {
      await axios.post(`${BASE_URL}/Category`, {
        companyId: params.id,
        name: value.categoryName,
        backgroundImage: value.img,
      });
      openNotificationWithIcon(
        "success",
        "text",
        `Successfully Created ${value.categoryName} category`
      );

      console.log("pavic data:", {
        companyId: params.id,
        name: value.categoryName,
        backgroundImage: value.img,
      });
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "text",
        `Error while deleting category`
      );
    }
  };

  const handleUpdateProduct = async (drinkUpdateData: any) => {
    if (editedDrink) {
      try {
        await axios.patch(`${BASE_URL}/Drink`, {
          id: editedDrink.id,
          categoryId: editDrinkCategoryId,
          name: drinkUpdateData.editDrinkName,
          price: drinkUpdateData.editDrinkPrice,
          image: drinkUpdateData.editProductImage,
          description: null,
        });
        console.log("pavic data:", {
          id: editedDrink.id,
          categoryId: editDrinkCategoryId,
          name: drinkUpdateData.editDrinkName,
          price: drinkUpdateData.editDrinkPrice,
          image: drinkUpdateData.editProductImage,
          description: null,
        });
        openNotificationWithIcon("success", "update", editDrinkName);
      } catch (error) {
        openNotificationWithIcon(
          "error",
          "text",
          `Error while updating product`
        );
      }
    }
    setEditedDrink(null);
    setEditDrinkName("");
    setEditDrinkPrice("");
    setEditDrinkCategoryId(undefined);
  };

  const handleRemoveDrink = async (drink: Drink) => {
    try {
      const response = await axios.delete(`${BASE_URL}/Drink/${drink.id}`);
      console.log("Post request successful:", response.data);
      openNotificationWithIcon("success", "delete", drink.name);
    } catch (error) {
      console.error("Error making post request:", error);
      openNotificationWithIcon("error", "text", `Error while deleting drink`);
    }
  };
  const handleCreateProduct = async (value: any) => {
    try {
      await axios.post(`${BASE_URL}/Drink`, {
        categoryId: createProductCategoryId,
        name: value.drinkName,
        price: value.drinkPrice,
        image: value.productImage,
        description: null,
      });
      openNotificationWithIcon(
        "success",
        "create",
        `product with name ${value.drinkName}`
      );
      console.log("pavic data:", {
        categoryId: createProductCategoryId,
        name: value.drinkName,
        price: value.drinkPrice,
        image: value.productImage,
        description: null,
      });
    } catch (error) {
      openNotificationWithIcon("error", "text", `Error while creating product`);
    }
  };

  const handleUpdateEditMenu = async (editMenuData: any) => {
    try {
      await axios.patch(`${BASE_URL}/Company`, {
        id: Number(params.id),
        menuThemeColor: editMenuData.menuBackgroundColor,
        categoryTitleColor: editMenuData.categoryTitleBackgroundColor,
        categoryTextTitleColor: editMenuData.categoryTextColor,
        headerTextColor: editMenuData.categoryTextColor,
        headerImage: editMenuData.headerImgUrl
          ? editMenuData.headerImgUrl
          : company?.headerImage,
      });
      openNotificationWithIcon("success", "editMenu");
      console.log("pavic data:", {
        id: Number(params.id),
        menuThemeColor: editMenuData.menuBackgroundColor,
        categoryTitleColor: editMenuData.categoryTitleBackgroundColor,
        categoryTextTitleColor: editMenuData.categoryTextColor,
        headerTextColor: editMenuData.categoryTextColor,
        headerImage: editMenuData.headerImgUrl
          ? editMenuData.headerImgUrl
          : company?.headerImage,
      });
    } catch (error) {
      openNotificationWithIcon("error", "text", `Error while updating menu`);
    }
  };

  const handleAddMoreDrinksInputs = (
    formikArrayHelpers: FormikHelpers<FormCategoryValues["drinks"]>
  ): void => {
    // formikArrayHelpers.push({ name: "", price: 0 });
  };
  const onLogoutButton = () => {
    sessionStorage.clear();
    router.push("/login");
  };
  return (
    <div className="menuPageWrapper">
      <Header
        companyName={company?.name}
        onLogout={onLogoutButton}
        logoUrl={company?.companyLogo}
      />
      <div className="addButtons">
        <Button type="primary" onClick={() => openModal("category")}>
          Add new Category
        </Button>
        <Button type="primary" onClick={() => openModal("drink")}>
          Add new product
        </Button>
        <Button
          className="editButtonDashboard"
          type="primary"
          onClick={() => openModal("editMenu")}
        >
          Edit Menu
        </Button>
      </div>

      <div className="drinksCategoryWrapper">
        {contextHolder}
        <Categories
          handleDeleteCategory={handleDeleteCategory}
          handleEditCategory={handleEditCategory}
          handleEditDrink={handleEditDrink}
          handleRemoveDrink={handleRemoveDrink}
          setIsEditCategoryModalOpen={setIsEditCategoryModalOpen}
          setIsEditProductModalShown={setIsEditProductModalShown}
          categories={company?.categoires}
        />
      </div>
      <CreateCategoryModal
        categoryImgFIle={categoryImgFIle}
        edgestore={edgestore}
        handleAddMoreDrinks={handleAddMoreDrinksInputs}
        isOpen={isCreateCategoryModalOpen}
        onCategorySubmit={handleCreateCategory}
        onClose={() => setIsCreateCategoryModalOpen(false)}
        setCategoryImgFile={setCategoryImgFile}
        setCategoryUrlImg={setCategoryUrlImg}
        categoryImgUrl={categoryImgUrl}
      />

      <CreateProductModal
        isCreateDrinkModalOpen={isCreateDrinkModalOpen}
        setIsCreateDrinkModalOpen={setIsCreateCategoryModalOpen}
        closeModal={closeModal}
        productImgUrl={productImgUrl}
        categories={company?.categoires}
        setProductImgFile={setProductImgFile}
        productImgFile={productImgFile}
        edgestore={edgestore}
        setProductImgUrl={setProductImgUrl}
        handleCreateProduct={handleCreateProduct}
        setCreateProductCategoryId={setCreateProductCategoryId}
      />

      <EditMenuModal
        isEditMenuModalOpen={isEditMenuModalOpen}
        menuBackgroundColor={menuBackgroundColor}
        categoryTitleBackgroundColor={categoryTitleBackgroundColor}
        categoryTextColor={categoryTextColor}
        closeModal={closeModal}
        headerImgUrl={headerImgUrl}
        companyHeaderImg={company?.headerImage}
        headerTextColor={headerTextColor}
        categories={company?.categoires}
        setHeaderImgFile={setHeaderImgFile}
        headerImgFile={headerImgFile}
        setHeaderImgUrl={setHeaderImgUrl}
        edgestore={edgestore}
        setMenuBackgroundColor={setMenuBackgroundColor}
        setCategoryTitleBackgroundColor={setCategoryTitleBackgroundColor}
        setCategoryTextColor={setCategoryTextColor}
        setHeaderTextColor={setHeaderTextColor}
        handleUpdateEditMenu={handleUpdateEditMenu}
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
        handleUpdateProduct={handleUpdateProduct}
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
        editCategoryImg={editCategoryImg}
        handleUpdateCategory={handleUpdateCategory}
      />
    </div>
  );
}
