import { useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [initialAmount, setInitialAmount] = useState("1");

  const updatedInputQuantity = (updatedMealsQuantity) => {
    setInitialAmount(updatedMealsQuantity);
  };

  const submitHandler = (e) => { 
    e.preventDefault();
    // console.log(initialAmount)
    const enteredAmount = initialAmount;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmountNumber.length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return setAmountIsValid(false);
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitHandler}>
        <Input
          mealsQuantity={updatedInputQuantity}
          label="Amount"
          input={{
            id: "amount" + props.id,
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        <button type="submit">+ Add</button>
        {!amountIsValid && <p>Please enter the valid Amount(1-5).</p>}
      </form>
    </>
  );
};

export default MealItemForm;
