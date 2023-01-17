import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     descripition: "Finest fish and veggies",
//     price: 22.98,
//   },
//   {
//     id: "m2",
//     name: "Gulab-gamun",
//     descripition: "Sweet Dish Of all the times!",
//     price: 15.68,
//   },
//   {
//     id: "m3",
//     name: "Maharaja Burger",
//     descripition: "Indian, raw ,meaty",
//     price: 12.98,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     descripition: "Healthy... and Green...",
//     price: 18.55,
//   },
// ];

const url =
  "https://react-http-bee73-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isloading, setIsLoading] = useState(null);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const data = await response.json();

      let loadedMeals = [];
      for (let key in data) {
        loadedMeals.push({
          name: data[key].name,
          descripition: data[key].descripition,
          price: data[key].price,
          image: data[key].imgUrl,
          id: key,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    // fetchMeals()-->returns a promise so insteed of try & catch we will use .then(for-sucess) and .catch(for-rejectionn) ,so we do here

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setIsError(error.message);
    });
  }, []);

  if (isloading) {
    return (
      <section className={styles.loading}>
        <h1>Loading...</h1>
      </section>
    );
  }
  if (isError && !isloading) {
    return (
      <section className={styles["meals-error"]}>
        <h1>{isError}</h1>
      </section>
    );
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        name={meal.name}
        descripition={meal.descripition}
        price={meal.price}
        id={meal.id}
        image = {meal.image}
      />
    );
  });

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {mealsList}
          {/* <MealItem mealsData={DUMMY_MEALS} /> */}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
