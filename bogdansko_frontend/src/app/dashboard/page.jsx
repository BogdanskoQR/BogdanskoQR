"use client";
import drinksData from "../../data/drinksData";
import { useState } from "react";
import "./DashboardPage.css";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export default function Page() {
  const [drinksDataArray, setDrinksData] = useState(drinksData);
  const [editedDrink, setEditedDrink] = useState(null);
  const [newDrinkName, setNewDrinkName] = useState("");
  const [newDrinkPrice, setNewDrinkPrice] = useState(0);
  const [editDrinkPrice, setEditDrinkPrice] = useState();
  const [editDrinkName, setEditDrinkName] = useState();
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleAddDrink = () => {
    console.log(
      "Add Drink:",
      newDrinkName,
      "to Category:",
      currentCategory,
      "with Price:",
      newDrinkPrice
    );

    setNewDrinkName("");
    setNewDrinkPrice("");
  };

  const handleEditDrink = (drink) => {
    setEditedDrink(drink);
    setEditDrinkName(drink.name);
    setEditDrinkPrice(drink.price.toFixed(2));
  };

  const handleUpdateDrink = () => {
    if (editedDrink) {
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

  const handleRemoveDrink = (drink, category) => {
    console.log("Remove Drink:", drink, "category", category);
  };

  const handleStartAddingNewDrink = (categoryId) => {
    setCurrentCategory(categoryId);
  };

  return (
    <div className="menuPageWrapper">
      <div className="drinksCategoryWrapper">
        {drinksDataArray.map((category) => (
          <div key={category.id} className="category">
            <h2>{category.name}</h2>
            <ul className="drinksWrapper">
              {category.drinks.map((drink) => (
                <li key={drink.id} className="drink">
                  {editedDrink && editedDrink.id === drink.id ? (
                    <div className="editDrinkWrapper">
                      <input
                        type="text"
                        className="editDrinkNameInput"
                        placeholder="Edit Drink Name"
                        value={editDrinkName}
                        onChange={(e) => setEditDrinkName(e.target.value)}
                      />
                      <input
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
              {currentCategory === category.id && (
                <div className="addNewDrink">
                  <input
                    type="text"
                    placeholder="New Drink Name"
                    value={newDrinkName}
                    onChange={(e) => setNewDrinkName(e.target.value)}
                  />
                  <input
                    className="newPriceInput"
                    type="number"
                    value={newDrinkPrice}
                    onChange={(e) => setNewDrinkPrice(e.target.value)}
                  />
                  <button onClick={handleAddDrink}>
                    <PlusOutlined />
                  </button>
                </div>
              )}
            </ul>
            <Button
              className="addNewDrinkButton"
              onClick={() => handleStartAddingNewDrink(category.id)}
            >
              Add New Drink
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
