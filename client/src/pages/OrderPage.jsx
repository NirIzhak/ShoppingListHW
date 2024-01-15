import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import { useContext } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
  const items = useSelector((state) => state.shoppingList.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [mail, setMail] = useState("");
  const { insertOrder } = useContext(ShoppingListContext);
  const navigate = useNavigate();

  return (
    <>
      <header className="title-container">
        <p>סיכום הזמנה</p>
      </header>
      <div className="items-list-order">
        פריטים שהזמנת:
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.quantity > 1 && <span>{item.quantity}x </span>}
              {item.name} - {item.category}
            </li>
          ))}
        </ul>
      </div>
      <div className="total-items">סה"כ: {totalItems} פריטים</div>
      <div className="user-form">
        <TextField
          id="outlined-basic"
          size="small"
          label="שם פרטי ומשפחה"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          size="small"
          label="כתובת מלאה"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          size="small"
          label="מייל"
          variant="outlined"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <Button
          size="small"
          variant="outlined"
          className="finish-order-button"
          onClick={() => {
            if (userName == "" || address == "" || mail == "") {
              alert("חובה למלא את הפרטים האישיים");
            } else {
              insertOrder(userName, address, mail, items);
              navigate("/thanks");
            }
          }}
        >
          אשר הזמנה
        </Button>
      </div>
    </>
  );
}
