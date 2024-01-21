import "./MenuPage.css";
import drinksData from "../../data/drinksData";
export default function Page() {
  return (
    <div className="menuPageWrapper">
      <div className="heading">
        <h2>Maxim</h2>
        <h3>Coffee Bar</h3>
      </div>
      <div className="categoriesWrapper">
        {drinksData.map((oneCategorie) => (
          <div className="oneCategorieCart">
            <div className="categorieTitle">
              <h3>{oneCategorie.name}</h3>
            </div>
            <img src={oneCategorie.img} alt="img" />
          </div>
        ))}
      </div>
    </div>
  );
}
