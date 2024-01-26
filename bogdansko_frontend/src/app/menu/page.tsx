"use client";
import "./MenuPage.css";
import drinksData from "../../data/drinksData";
import { useRouter } from "next/navigation";
import maxim from '../../../public/maxim.jpg'
export default function Page() {
  const router = useRouter()

  const redirectToCategory = (categoryId: number) => {
    router.push(`/menu/${categoryId}`)
  };

  return (
    <div className="menuPageWrapper">
      <div className="coffeeImage">
      <img src='https://scontent.fskp4-1.fna.fbcdn.net/v/t39.30808-6/361086482_1003088147611941_5940843451065858315_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=783fdb&_nc_ohc=KzYYHOGVtDEAX8XEQLo&_nc_ht=scontent.fskp4-1.fna&oh=00_AfCaUUh4dB1TDecmQ57ATZ6AZ_UKQUH3zLDtVh3x5aRxdw&oe=65B84318' alt="" />
      </div>
      <div className="heading">
        <div className="headingName">
        <h2>Maxim</h2>
        <h3>Coffee Bar</h3>
        </div>
      </div>
      <div className="categoriesWrapper">
        {drinksData.map((oneCategory) => (
          <div
            key={oneCategory.name}
            className="oneCategorieCart"
            onClick={() => redirectToCategory(oneCategory.id)}
          >
            <div className="categorieTitle">
              <h3>{oneCategory.name}</h3>
            </div>
            <img src={oneCategory.img} alt="img" />
          </div>
        ))}
      </div>
    </div>
  );
}
