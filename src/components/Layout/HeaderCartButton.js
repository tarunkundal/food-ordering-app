import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const headerCartButtonHandler = () => {
    props.onClickCartButton();
  };

  const btnClasses = `${styles.button}  ${btnIsHighLighted ? styles.bump : ""}`;

  const { items } = cartCtx;

  useEffect(() => {
    if (items === 0) {
      return;
    }
    setBtnIsHighLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={headerCartButtonHandler}>
      <span className={styles.icon}>
        <CartIcon />
      </span>

      <span>Your Cart</span>

      <span className={styles.badge}> {numberOfCartItems} </span>
    </button>
  );
};

export default HeaderCartButton;
