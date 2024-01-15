import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetItems } from "../redux/shoppingListSlice";

export default function Thanks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="thanks-wrapper">
        <h1>תודה רבה שקנית אצלנו</h1>
        <Button
          size="small"
          variant="outlined"
          className="finish-order-button"
          onClick={() => {
            dispatch(resetItems());
            navigate("/");
          }}
        >
          התחל קנייה חדשה
        </Button>
      </div>
    </>
  );
}
