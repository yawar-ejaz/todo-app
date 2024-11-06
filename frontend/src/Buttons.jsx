import React from "react";
import { useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./features/counterSlice";

const Buttons = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increase</button>
      <button onClick={() => dispatch(decrement())}>Decrease</button>
    </div>
  );
};

export default Buttons;
