import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/shoppingListSlice";
import { Link } from "react-router-dom";

export default function MainPage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.shoppingList.categories);
  const items = useSelector((state) => state.shoppingList.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const [itemName, setItemName] = useState("");
  const [itemCat, setItemCat] = useState("");

  const handleChange = (event) => {
    setItemCat(event.target.value);
  };

  const handleAddItem = () => {
    if (itemName === "" || itemCat === "") {
      alert("אנא בחר שם מוצר וקטגוריה");
    } else {
      dispatch(addItem({ name: itemName, category: itemCat }));
      setItemName("");
      setItemCat("");
    }
  };

  const groupedItems = {};
  items.forEach((item) => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = [];
    }
    groupedItems[item.category].push(item);
  });

  return (
    <div className="main-page">
      <header className="title-container">
        <p>רשימת קניות</p>
      </header>
      <div className="sum-products">סה"כ: {totalItems} מוצרים</div>
      <div className="add-product-form">
        <TextField
          id="outlined-basic"
          size="small"
          label="מוצר"
          variant="outlined"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-cat-lable">קטגוריה</InputLabel>
          <Select
            labelId="select-cat-lable"
            id="select-cat"
            value={itemCat}
            label="קטגוריה"
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.title}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button size="small" variant="outlined" onClick={handleAddItem}>
          הוסף
        </Button>
      </div>

      <div className="items-list">
        {items.length >= 1 ? (
          Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="item">
              <h3>{category}</h3>
              <ul>
                {categoryItems.map((item, index) => (
                  <li key={index}>
                    {item.quantity > 1 && <span>{item.quantity}x </span>}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="no-items">פה תראה את כל המוצרים שתוסיף</p>
        )}
      </div>

      <Link to={`/order`} className="finish-order-button">
        <Button size="small" variant="outlined">
          סיים הזמנה
        </Button>
      </Link>
    </div>
  );
}
