import { useEffect, createContext } from "react";
import { useDispatch } from "react-redux";
import { base_url } from "../data/api";
import { setCategories } from "../redux/shoppingListSlice";

export const ShoppingListContext = createContext();

const ShoppingListContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  // get all categoreis 
  const getCategories = async () => {
    try {
      let res = await fetch(`${base_url}/GetCategories`);
      let data = await res.json();
      dispatch(setCategories(data));
    } catch (err) {
      console.log(err);
    }
  };

  // insert order to SQL table
  const insertOrder = async (name, address, mail, items) => {
    try {
      const apiUrl = `${base_url}/InsertOrder`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: name,
          Address: address,
          Mail: mail,
          Items: items,
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, [dispatch]);

  const value = {
    insertOrder,
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
};
export default ShoppingListContextProvider;
