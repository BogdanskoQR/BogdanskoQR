import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Button } from "antd";
import { Category, Drink } from "../Types/types";

// interface CategoriesProps {
//   categories?: Category[];
//   handleDeleteCategory: (category: Category) => void;
//   setIsEditCategoryModalOpen: (isOpen: boolean) => void;
//   handleEditCategory: (category: Category) => void;
//   handleEditDrink: (drink: Drink) => void
//   handleRemoveDrink: (drink:Drink)=> void
//   setIsEditProductModalShown: (value: Boolean)=> void
// }

const Categories = ({
  categories,
  handleDeleteCategory,
  setIsEditCategoryModalOpen,
  handleEditCategory,
  handleEditDrink,
  setIsEditProductModalShown,
  handleRemoveDrink,
}: any) => {
  return (
    <>
      {categories?.map((category: Category) => (
        <div key={category.id} className="category">
          <div className="categoryHeader">
            <Popconfirm
              title="Delete the Category"
              description="Are you sure u want to delete this category?"
              onConfirm={() => handleDeleteCategory(category)}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
            <div className="deleteCategoryButtons">
              <Button
                onClick={() => {
                  setIsEditCategoryModalOpen(true);
                  handleEditCategory(category);
                }}
              >
                <EditOutlined />
              </Button>
            </div>
            <h2>{category.name}</h2>
          </div>

          <div className="categoryBody">
            <ul className="drinksWrapper">
              {category.drinks.map((drink: Drink) => (
                <li key={drink.id} className="drink">
                  <>
                    {drink.name} - ${drink.price.toFixed(2)}
                    <div className="drinkButtons">
                      <EditOutlined
                        style={{ padding: "7px" }}
                        onClick={() => {
                          handleEditDrink(drink,category.id);
                          setIsEditProductModalShown(true);
                        }}
                      />
                      <Popconfirm
                        title="Delete Product"
                        description="Are you sure u want to delete this product?"
                        onConfirm={() => handleRemoveDrink(drink)}
                        onCancel={() => {}}
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
        </div>
      ))}
    </>
  );
};

export default Categories;
