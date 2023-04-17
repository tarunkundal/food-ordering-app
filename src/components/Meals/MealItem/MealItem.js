import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      image: props.image,
    });
  };

  const price = `₹${props.price}`;
  const length = props.descripition.length;
  return (
    <>
      <li className={styles.meal}>
        <div>
          <h3>{props.name}</h3>

          <div className={styles.description}>
            {length < 40
              ? props.descripition
              : props.descripition.slice(0, 20) + "..."}
          </div>

          <div className={styles.price}>{price}</div>
        </div>
        <div>
          <div className={styles.image}>
            {" "}
            {<img src={`${props.image}`} alt="" />}{" "}
          </div>
        </div>

        <div>
          <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
      </li>
    </>
  );
};
export default MealItem;
