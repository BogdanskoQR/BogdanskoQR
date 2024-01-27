"use client";
import drinksData, { companyDetails } from "../../data/drinksData";
import { useState } from "react";
import "./DashboardPage.css";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, notification, Modal, Input, Select } from "antd";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import type { ColorPickerProps } from "antd";

import { ColorPicker } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

interface Drink {
  id: number;
  name: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
  drinks: Drink[];
}

interface FormValues {
  categoryName: string;
  drinks: Drink[];
}

interface DrinkFormValues {
  drinkName: string;
  drinkPrice: number;
}

interface FormCategoryValues {
  categoryName: string;
  drinks: Drink[];
}

interface FormProductValues {
  categoryName: number;
  drinkName: string;
  drinkPrice: number;
}

interface Props {}

export default function Page({}: Props) {
  const [categories, setCategories] = useState<Category[]>(drinksData);
  const [editedDrink, setEditedDrink] = useState<Drink | null>(null);
  const [editDrinkPrice, setEditDrinkPrice] = useState<string>("");
  const [editDrinkName, setEditDrinkName] = useState<string>("");
  const [selectedNewDrink, setSelectedNewDrink] = useState<Drink>();
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const [api, contextHolder] = notification.useNotification();
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState<boolean>(false);
  const [isCreateDrinkModalOpen, setIsCreateDrinkModalOpen] =
    useState<boolean>(false);
  const [isEditMenuModalOpen, setIsEditMenuModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [menuBackgroundColor, setMenuBackgroundColor] = useState(companyDetails.menuThemeColor);
  const [categoryTitleBackgroundColor, setCategoryTitleBackgroundColor] =
    useState(companyDetails.categoryTitleColor);
  const [categoryTextColor, setCategoryTextColor] = useState(companyDetails.categoryTextTitleColor);
  const [headerTextColor, setHeaderTextColor] = useState(companyDetails.headerTextColor);
  const [headerImage, setHeaderImage] = useState<File | null | undefined >(null);

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
    };

    notification[type]({
      message: successMessages[point],
      description: successMessages[point],
    });
  };

  const categoryUploadProps: UploadProps = {
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    listType: "picture",
    beforeUpload(file) {
      setHeaderImage(file);
      return false;
    },
  };

  const menuUploadProps: UploadProps = {
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    listType: "picture",
    beforeUpload(file) {
      setHeaderImage(file);
      return false;
    },
  };

  const productUploadProps: UploadProps = {
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    listType: "picture",
    beforeUpload(file) {
      setSelectedImage(file);
      return false;
    },
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


  const handleAddDrink = (): void => {
    console.log(
      "Add Drink:",
      selectedNewDrink,
      "to Category:",
      currentCategory
    );
    // openNotificationWithIcon("success", `drink with name ${selectedNewDrink?.name} into ${currentCategory}`);
    closeModal("drink");
  };

  const handleEditDrink = (drink: Drink): void => {
    setEditedDrink(drink);
    setEditDrinkName(drink.name);
    setEditDrinkPrice(drink.price.toFixed(2));
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

  const handleStartAddingNewDrink = (categoryId: number): void => {
    setCurrentCategory(categoryId);
    openModal("drink");
  };

  const handleAddMoreDrinks = (
    formikArrayHelpers: FormikHelpers<FormCategoryValues["drinks"]>
  ): void => {
    // formikArrayHelpers.push({ name: "", price: 0 });
  };

  return (
    <div className="menuPageWrapper">
      <div className="drinksCategoryWrapper">
        {contextHolder}
        {categories.map((category) => (
          <div key={category.id} className="category">
            <h2>{category.name}</h2>
            <ul className="drinksWrapper">
              {category.drinks.map((drink) => (
                <li key={drink.id} className="drink">
                  {editedDrink && editedDrink.id === drink.id ? (
                    <div className="editDrinkWrapper">
                      <Input
                        type="text"
                        className="editDrinkNameInput"
                        placeholder="Edit Drink Name"
                        value={editDrinkName}
                        onChange={(e) => setEditDrinkName(e.target.value)}
                      />
                      <Input
                        type="number"
                        className="newPriceInput"
                        placeholder="Edit Drink Price"
                        value={editDrinkPrice}
                        onChange={(e) => setEditDrinkPrice(e.target.value)}
                      />
                      <Button onClick={handleUpdateDrink}>Save</Button>
                    </div>
                  ) : (
                    <>
                      {drink.name} - ${drink.price.toFixed(2)}
                      <div className="drinkButtons">
                        <Button onClick={() => handleEditDrink(drink)}>
                          <EditOutlined />
                        </Button>
                        <Button
                          onClick={() => handleRemoveDrink(drink, category)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Button type="primary" onClick={() => openModal("category")}>
        Add new Category
      </Button>

      <Button type="primary" onClick={() => openModal("drink")}>
        Add new product
      </Button>
      <Button type="primary" onClick={() => openModal("editMenu")}>
        Edit Menu
      </Button>
      <Modal
        width={600}
        title="Create Category"
        open={isCreateCategoryModalOpen}
        onOk={() => closeModal("category")}
        onCancel={() => closeModal("category")}
      >
        <Formik
          initialValues={{ categoryName: "", drinks: [{ name: "", price: 0 }] }}
          onSubmit={(values, { resetForm }) => {
            console.log("Form values:", values);
            console.log("Selected Image:", selectedImage);
            openNotificationWithIcon(
              "success",
              "create",
              `category with name ${values.categoryName}`
            );
            resetForm();
            setSelectedImage(null);
          }}
        >
          {({ values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label htmlFor="categoryName" aria-hidden="true">
                Category Name
              </label>
              <Input
                type="text"
                name="categoryName"
                value="categoryName"
                placeholder="Enter Category Name"
                required
              />
              <p>Drinks:</p>
              <FieldArray
                name="drinks"
                render={(arrayHelpers: any) => (
                  <div>
                    {values.drinks.map((drink, index) => (
                      <div key={index} className="addNewDrink">
                        <Input
                          type="text"
                          placeholder={`New Drink Name ${index + 1}`}
                          name={`drinks.${index}.name`}
                        />
                        <Input
                          className="newPriceInput"
                          type="number"
                          placeholder={`New Drink Price ${index + 1}`}
                          name={`drinks.${index}.price`}
                        />
                        {index === values.drinks.length - 1 && (
                          <button
                            onClick={() => handleAddMoreDrinks(arrayHelpers)}
                          >
                            <PlusOutlined />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              />
              <Upload {...categoryUploadProps}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              <Button htmlType="submit">Add more drinks</Button>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        title="Create Product"
        open={isCreateDrinkModalOpen}
        onOk={handleAddDrink}
        onCancel={() => closeModal("drink")}
      >
        <Formik
          initialValues={{ categoryName: 0, drinkName: "", drinkPrice: 0 }}
          onSubmit={(values) => {
            console.log("Add Drink Form values:", values);
            console.log("Selected Image:", selectedImage);
            openNotificationWithIcon(
              "success",
              "create",
              `product with name ${values.drinkName}`
            );
            setSelectedImage(null);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label>Drink Category:</label>
              <br />
              <Select
                style={{ width: "470px" }}
                options={categories.map((oneCategory) => ({
                  value: oneCategory.id,
                  label: oneCategory.name,
                }))}
                onSelect={(value: Drink) => setSelectedNewDrink(value)}
              />
              <br />
              <label htmlFor="drinkName">Drink Name:</label>
              <Input
                type="text"
                id="drinkName"
                name="drinkName"
                value={values.drinkName}
                onChange={handleChange}
              />
              <label htmlFor="drinkPrice">Drink Price:</label>
              <Input
                type="number"
                id="drinkPrice"
                name="drinkPrice"
                value={values.drinkPrice}
                onChange={handleChange}
              />
              <Upload {...productUploadProps}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              <Button htmlType="submit">Add Drink</Button>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modal
        width={1000}
        title="Edit"
        open={isEditMenuModalOpen}
        onOk={() => {
          closeModal("editMenu");
          console.log(
            menuBackgroundColor,
            categoryTitleBackgroundColor,
            categoryTextColor
          );
          openNotificationWithIcon("success", "editMenu");
        }}
        onCancel={() => closeModal("editMenu")}
      >
        <div className="editMenuModalWrapper">
          <div className="leftSideEditMenu">
            <div className="menuPageWrapper">
              <div className="coffeeImage">
                <img
                  src={
                    headerImage
                      ? URL.createObjectURL(headerImage)
                      : companyDetails.headerImage
                  }
                  alt="companyImage"
                />
              </div>
              <div className="heading">
                <div className="headingName">
                  <h2 style={{ color: headerTextColor }}>Maxim</h2>
                  <h3 style={{ color: headerTextColor }}>Coffee Bar</h3>
                </div>
              </div>
              <div
                className="categoriesWrapper"
                style={{ background: menuBackgroundColor }}
              >
                {drinksData.slice(0, 3).map((oneCategory) => (
                  <div key={oneCategory.name} className="oneCategorieCart">
                    <div
                      className="categorieTitle"
                      style={{ background: categoryTitleBackgroundColor }}
                    >
                      <h3 style={{ color: categoryTextColor }}>
                        {oneCategory.name}
                      </h3>
                    </div>
                    <img src={oneCategory.img} alt="img" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rightSideEditMenu">
            <div className="editSettingWrapper">
            <div className="menuBackgorundColor">
                <p>Change Picture</p>
                <Upload
                  {...menuUploadProps}
                  onChange={(info) => {
                    if (info.file.status === "done") {
                      setHeaderImage(info.file.originFileObj);
                    }
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </div>
              <div className="menuBackgorundColor">
                <p>Menu Background Color</p>
                <ColorPicker
                  value={menuBackgroundColor}
                  defaultValue="linear-gradient(to right, #ffffff, #dfe6e9)"
                  onChange={(color) =>
                    setMenuBackgroundColor(color.toHexString())
                  }
                />
              </div>
              <div className="categoryTitleColor">
                <p>Category Title Color</p>
                <ColorPicker
                  defaultValue="linear-gradient(to top, #dfe6e9, #d6e2eb)"
                  value={categoryTitleBackgroundColor}
                  onChange={(color) =>
                    setCategoryTitleBackgroundColor(color.toHexString())
                  }
                />
              </div>
              <div className="menuBackgorundColor">
                <p>Category Title Text Color</p>
                <ColorPicker
                  defaultValue="#c8d0db"
                  value={categoryTextColor}
                  onChange={(color) =>
                    setCategoryTextColor(color.toHexString())
                  }
                />
              </div>
              <div className="menuBackgorundColor">
                <p>Header Title Text Color</p>
                <ColorPicker
                  defaultValue="#c8d0db"
                  value={headerTextColor}
                  onChange={(color) => setHeaderTextColor(color.toHexString())}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
