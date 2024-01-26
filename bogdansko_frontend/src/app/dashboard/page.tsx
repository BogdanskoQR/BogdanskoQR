"use client";
import drinksData from "../../data/drinksData";
import { useState } from "react";
import "./DashboardPage.css";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, notification, Modal, Input, Select } from "antd";
import {  FieldArray, Form, Formik, FormikHelpers } from "formik";

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

    const openNotificationWithIcon = (
      type: NotificationType,
      point: string,
      drinkName?: string
    ): void => {
      const successMessages:any = {
        create: `Successfully created ${drinkName ? drinkName : point}`,
        update: `Successfully updated drink ${drinkName}`,
        delete: `Successfully deleted drink ${drinkName}`,
      };
    
      notification[type]({
        message: successMessages[point],
        description: successMessages[point],
      });
    };
    

  const openModal = (modalType: "category" | "drink"): void => {
    if (modalType === "category") {
      setIsCreateCategoryModalOpen(true);
    } else if (modalType === "drink") {
      setIsCreateDrinkModalOpen(true);
    }
  };

  const closeModal = (modalType: "category" | "drink"): void => {
    if (modalType === "category") {
      setIsCreateCategoryModalOpen(false);
    } else if (modalType === "drink") {
      setIsCreateDrinkModalOpen(false);
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
            openNotificationWithIcon("success", "create", `category with name ${values.categoryName}`);
            resetForm();
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
                value='categoryName'
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
            openNotificationWithIcon("success", 'create', `product with name ${values.drinkName}`);
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
              <Button htmlType="submit">Add Drink</Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
