"use client";
import { companyDetails } from "../../../data/drinksData";
import {  useState } from "react";
import "./DashboardPage.css";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  notification,
  Modal,
  Input,
  Select,
  message,
  Popconfirm,
} from "antd";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import { UploadOutlined } from "@ant-design/icons";
import { ColorPicker } from "antd";
import { useEdgeStore } from "../../lib/edgestore";
import Header from "@/Components/Header/Header";
import { useRouter } from "next/navigation";

type NotificationType = "success" | "info" | "warning" | "error";

interface Drink {
  id: number;
  name: string;
  price: number;
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

interface Props {}

export default function Page({ params }: any) {

  const company = companyDetails.find(
    (company) => company.id === Number(params.id)
  );
  const categories = company?.menu;
  const [editedDrink, setEditedDrink] = useState<Drink | null>(null);
  const [editDrinkPrice, setEditDrinkPrice] = useState<string>("");
  const [headerImgFile, setHeaderImgFile] = useState<File>();
  const [productImgFile, setProductImgFile] = useState<File>();
  const [editProductImgFile, setEditProductImgFile] = useState<File>();
  const [categoryImgFIle, setCategoryImgFile] = useState<File>();
  const [editDrinkName, setEditDrinkName] = useState<string>("");
  const [editProductImage, setEditProductImage] = useState<
    string | undefined
  >();
  const [selectedNewDrink, setSelectedNewDrink] = useState<Drink>();
  const [api, contextHolder] = notification.useNotification();
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState<boolean>(false);
  const [isCreateDrinkModalOpen, setIsCreateDrinkModalOpen] =
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
  const router = useRouter();

  const { edgestore } = useEdgeStore();
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

  const cancel = () => {
    message.error("Click on No");
  };

  const onLogoutButton = () => {
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
        {categories?.map((category) => (
          <div key={category.id} className="category">
            <div className="deleteCategory">
              <Popconfirm
                title="Delete the Category"
                description="Are you sure to delete this category?"
                onConfirm={() => handleDeleteCateogry(category)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>

              <h2>{category.name}</h2>
            </div>

            <ul className="drinksWrapper">
              {category.drinks.map((drink) => (
                <li key={drink.id} className="drink">
                  <>
                    {drink.name} - ${drink.price.toFixed(2)}
                    <div className="drinkButtons">
                      <EditOutlined
                        style={{ padding: "7px" }}
                        onClick={() => {
                          handleEditDrink(drink);
                          setIsEditProductModalShown(true);
                        }}
                      />
                      <Popconfirm
                        title="Delete Product"
                        description="Are you sure to delete product?"
                        onConfirm={() => handleRemoveDrink(drink, category)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined style={{ padding: "7px" }} />
                      </Popconfirm>
                    </div>
                  </>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Modal
        width={600}
        title="Create Category"
        open={isCreateCategoryModalOpen}
        onOk={() => closeModal("category")}
        onCancel={() => closeModal("category")}
      >
        <Formik
          initialValues={{
            categoryName: "",
            drinks: [{ name: "", price: 0 }],
          }}
          onSubmit={(values, { resetForm }) => {
            console.log("Form values:", values, "category img", categoryImgUrl);
            openNotificationWithIcon(
              "success",
              "create",
              `category with name ${values.categoryName}`
            );
            resetForm();
          }}
        >
          {({ values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="createCategoryField">
                <label htmlFor="categoryName" aria-hidden="true">
                  Category Name
                </label>

                <Input
                  type="text"
                  name="categoryName"
                  placeholder="Enter Category Name"
                  required
                />
              </div>

              <div className="createCategoryField">
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
              </div>
              <div className="createCategoryField">
                <input
                  type="file"
                  onChange={(e) => {
                    setCategoryImgFile(e.target.files?.[0]);
                  }}
                />
                <Button
                  icon={<UploadOutlined />}
                  onClick={async () => {
                    if (categoryImgFIle) {
                      const res = await edgestore.myPublicImages.upload({
                        file: categoryImgFIle,
                      });
                      setCategoryUrlImg({
                        url: res.url,
                        thumbmailUrl: res.thumbnailUrl,
                      });
                    }
                  }}
                >
                  Upload
                </Button>
              </div>

              <Button htmlType="submit">Add more drinks</Button>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        title="Create Product"
        open={isCreateDrinkModalOpen}
        onOk={() => setIsCreateDrinkModalOpen(false)}
        onCancel={() => closeModal("drink")}
      >
        <Formik
          initialValues={{
            categoryName: 0,
            drinkName: "",
            drinkPrice: 0,
            productImage: productImgUrl,
          }}
          onSubmit={(values) => {
            console.log("Add Drink Form values:", values);
            openNotificationWithIcon(
              "success",
              "create",
              `product with name ${values.drinkName}`
            );
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="createProductField">
                <label>Drink Category:</label>
                <br />
                <Select
                  className="createProductSelect"
                  options={categories?.map((oneCategory) => ({
                    value: oneCategory.id,
                    label: oneCategory.name,
                  }))}
                  onSelect={(value: Drink) => setSelectedNewDrink(value)}
                />
              </div>

              <br />
              <div className="createProductField">
                <label htmlFor="drinkName">Drink Name:</label>
                <Input
                  type="text"
                  id="drinkName"
                  name="drinkName"
                  value={values.drinkName}
                  onChange={handleChange}
                />
              </div>
              <div className="createProductField">
                <label htmlFor="drinkPrice">Drink Price:</label>
                <Input
                  type="number"
                  id="drinkPrice"
                  name="drinkPrice"
                  value={values.drinkPrice}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="createProductField">
                <label htmlFor="drinkPrice">Product Photo(optional):</label>
                <br />
                <input
                  type="file"
                  onChange={(e) => {
                    setProductImgFile(e.target.files?.[0]);
                  }}
                />
                <Button
                  icon={<UploadOutlined />}
                  onClick={async () => {
                    if (productImgFile) {
                      const res = await edgestore.myPublicImages.upload({
                        file: productImgFile,
                      });
                      setProductImgUrl({
                        url: res.url,
                        thumbmailUrl: res.thumbnailUrl,
                      });
                      // we can save to database here
                    }
                  }}
                >
                  Upload
                </Button>
              </div>

              <Button htmlType="submit">Add Drink</Button>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modal
        width={1000}
        className="editMenuModal"
        title="Edit Menu"
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
                    headerImgUrl?.url ? headerImgUrl.url : company?.headerImage
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
                {categories?.slice(0, 3).map((oneCategory: Category) => (
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
                <p>Change Header Picture</p>
                <input
                  type="file"
                  onChange={(e) => {
                    setHeaderImgFile(e.target.files?.[0]);
                  }}
                />
                <Button
                  icon={<UploadOutlined />}
                  onClick={async () => {
                    if (headerImgFile) {
                      const res = await edgestore.myPublicImages.upload({
                        file: headerImgFile,
                      });
                      setHeaderImgUrl({
                        url: res.url,
                        thumbmailUrl: res.thumbnailUrl,
                      });
                      // we can save to database here
                    }
                  }}
                >
                  Upload
                </Button>
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

      <Modal
        title="Edit Product"
        open={isEditProductModalShown}
        onOk={() => {
          setEditDrinkName("");
          setEditDrinkPrice("");
          setEditProductImage("");
          setEditProductImgUrl(undefined);
          setIsEditProductModalShown(false);
          openNotificationWithIcon("success", "update", editDrinkName);

          
        }}
        onCancel={() => {
          setEditDrinkName("");
          setEditDrinkPrice("");
          setEditProductImage("");
          setEditProductImgUrl(undefined);
          setIsEditProductModalShown(false);
        }}
      >
        <Formik
          initialValues={{
            drinkName: editDrinkName,
            drinkPrice: editDrinkPrice,
            productImage: editProductImage,
          }}
          onSubmit={(values) => {
            console.log("edit Drink Form values:", values);
            openNotificationWithIcon(
              "success",
              "create",
              `product with name ${values.drinkName}`
            );
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="createProductField">
                <label>Drink Name:</label>
                <Input
                  className="createProductSelect"
                  value={editDrinkName}
                  onChange={(e) => {
                    setEditDrinkName(e.target.value);
                  }}
                />
              </div>

              <br />
              <div className="createProductField">
                <label htmlFor="drinkName">Drink Price:</label>
                <Input
                  type="number"
                  value={editDrinkPrice}
                  onChange={(e) => setEditDrinkPrice(e.target.value)}
                />
              </div>
              <div className="createProductField">
                <label htmlFor="drinkPrice">Drink Image:</label>
                <img
                  src={
                    editProductImgUrl ? editProductImgUrl.url : editProductImage
                  }
                  alt=""
                />
                <label htmlFor="drinkPrice">
                  Edit product photo(optional):
                </label>
                <Input
                  type="file"
                  onChange={(e) => setEditProductImgFile(e.target.files?.[0])}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="createProductField">
                <Button
                  icon={<UploadOutlined />}
                  onClick={async () => {
                    if (editProductImgFile) {
                      const res = await edgestore.myPublicImages.upload({
                        file: editProductImgFile,
                      });
                      setEditProductImgUrl({
                        url: res.url,
                        thumbmailUrl: res.thumbnailUrl,
                      });
                      // we can save to database here
                    }
                  }}
                >
                  Upload
                </Button>
              </div>

              {/* <Button htmlType="submit">Add Drink</Button> */}
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
